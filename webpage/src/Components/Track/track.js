import React, { useRef, useContext, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsHeart, BsArrowRepeat, BsPlay, BsChatSquare, BsPlayFill, BsPauseFill } from 'react-icons/bs';
import "./track.css";
import WaveSurfer from 'wavesurfer.js';
import { UserContext } from '../../Providers/UserProvider.js';
import { db } from '../../firebase';
import firebase from "firebase/app";
import { getElapsedTime } from '../../Helpers/helpers';

function Track(props) {

    const [played, setPlayed] = useState(false);
    const [likes, setLikes] = useState(props.likes);
    const [trackLiked, setTrackLiked] = useState(false);
    const waveform = useRef();
    const user = useContext(UserContext);

    useEffect(() => {
        const track = props.track;
        let wave = document.querySelector(".waveform");
        wave.id = props.id;
        wave.classList.remove("waveform");
        wave.classList.add("wave");
        waveform.current = WaveSurfer.create({
            barWidth: 2,
            cursorWidth: 1,
            container: document.getElementById(props.id),
            backend: 'WebAudio',
            height: 70,
            progressColor: '#2D5BFF',
            responsive: true,
            waveColor: '#b5b5b5',
            cursorColor: '#2D5BFF',
            normalize: true
        })
        waveform.current.load(track);
        waveform.current.on("seek", () => {
            if (props.isPlaying)
                waveform.current.play();
        })
        // setTrackLiked(() => {
        //     db.collection('tracks').doc(props.id).get().then(doc => {
        //         const data = doc.data();
        //         if (data !== undefined && user !== null) {
        //             if (data.likedBy.includes(user.uid)) return true;
        //         }
        //         return false
        //     })
        // });
    }, [])

    const handlePlay = () => {
        // props.togglePlay(); // TODO: implement playing state change in parent
        waveform.current.playPause();
        if (!played) {
            db.collection('tracks').doc(props.id).update({ playCount: props.playCount + 1 });
            db.collection('users').doc(user.uid).get().then(doc => {
                const data = doc.data();
                if (!data.playedTracks.includes(props.id)) {
                    db.collection('users').doc(user.uid).update({
                        playedTracks: firebase.firestore.FieldValue.arrayUnion(props.id)
                    })
                }
            })
        }
        setPlayed(true);
    };

    const handleLike = () => {
        db.collection('tracks').doc(props.id).get().then(doc => {
            let data = doc.data();
            if (data.likedBy.includes(user.uid)) return true;
            else return false;
        }).then(likedByCurrentUser => {
            db.collection('tracks').doc(props.id).update({
                likeCount: likedByCurrentUser === false ? firebase.firestore.FieldValue.increment(1) : props.likes,
                likedBy: firebase.firestore.FieldValue.arrayUnion(user.uid)
            });
            db.collection('users').doc(user.uid).update({
                likedTracks: firebase.firestore.FieldValue.arrayUnion(props.id)
            });
            if (!likedByCurrentUser) {
                setLikes(likes => likes + 1);
            }
        })
        setTrackLiked(() => !trackLiked);
    }

    const handleRepost = () => {
        db.collection('tracks').doc(props.id).get().then(doc => {
            let data = doc.data();
            if (data.repostedBy.includes(user.uid)) return true;
            else return false;
        }).then(repostedByUser => {
            if (!repostedByUser) {
                db.collection('users').doc(user.uid).update({
                    posts: firebase.firestore.FieldValue.arrayUnion({
                        trackId: props.id,
                        postDate: Date.now()
                    })
                })
                db.collection('tracks').doc(props.id).update({
                    repostCount: firebase.firestore.FieldValue.increment(1),
                    repostedBy: firebase.firestore.FieldValue.arrayUnion(user.uid)
                })
            }
        })
    }

    const playBtn = !props.isPlaying ? <BsPlayFill /> : <BsPauseFill className="pause-btn" />;
    const post = props.userName === props.artistName ? "posted" : <>&nbsp;<BsArrowRepeat />reposted</>;
    const likeClass = trackLiked ? "social-icon liked" : "social-icon like";

    return (
        <Container className="track">
            <Row className="poster">
                <Col className="">
                    <img className="user-avatar" src="https://i.imgur.com/p3vccAp.jpeg" alt="poster-avatar" />
                    &nbsp;<a className="link" href={`#${props.userName}`}>{props.userName}</a>
                    &nbsp;{post} a track {props.timeFrame} ago
                </Col>

            </Row>
            <Row className="main-track">
                <Col md="auto" lg="auto" sm="auto" xs="auto" className="art-clm">
                    <img className="track-art" src={props.albumArt} alt="track-art" />
                    <button className="play-btn" onClick={handlePlay}>
                        {playBtn}
                    </button>
                </Col>
                <Col className="">
                    <Row><div>
                        <a className="link artist" href={`#${props.artistName}`}>{props.artistName}</a>
                    </div></Row>
                    <Row><div>
                        <a className="link song" href={`#${props.songName}`}>{props.songName}</a>
                    </div></Row>
                    <Row className="">
                        <Col className="waveform wave-container" md={9}>
                        </Col>
                    </Row>
                    <Row className="social">
                        <div ><button className={likeClass} onClick={handleLike}>
                            <BsHeart /> {likes}
                        </button></div>
                        <div ><button className="social-icon repost" onClick={handleRepost}>
                            <BsArrowRepeat /> {props.reposts}
                        </button></div>
                        <Col md={6}>
                        </Col>
                        <div className="social-tag"><BsPlay /> {props.playCount}</div>
                        <div className="social-tag">
                            <BsChatSquare /> {props.commentCount}
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container >
    )

}

export default Track;