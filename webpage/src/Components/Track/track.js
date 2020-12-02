import React, { useRef, useContext, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsHeart, BsArrowRepeat, BsPlay, BsChatSquare, BsPlayFill, BsPauseFill } from 'react-icons/bs';
import "./track.css";
import WaveSurfer from 'wavesurfer.js';
import { UserContext } from '../../Providers/UserProvider.js';
import { db } from '../../firebase';
import firebase from "firebase/app";

function Track({ ...props }) {
    const [played, setPlayed] = useState(false);
    const [likes, setLikes] = useState(props.likes);
    const [trackLiked, setTrackLiked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const waveform = useRef();
    const user = useContext(UserContext);
    const trackId = props.id.split('_inst')[0];

    useEffect(() => {
        const track = props.track;
        let wave = document.querySelector(".waveform");
        wave.id = props.id;
        wave.classList.remove("waveform");
        wave.classList.add("wave");
        waveform.current = WaveSurfer.create({
            barWidth: 2,
            cursorWidth: 2,
            container: document.getElementById(props.id),
            backend: 'WebAudio',
            height: 70,
            progressColor: '#398cd4',
            backgroundColor: '#f7f7f7',
            responsive: true,
            waveColor: '#b5b5b5',
            cursorColor: '#398cd4',
            normalize: true,
            pixelRatio: 2,
            responsive: true
        })
        waveform.current.load(track);
        waveform.current.on("seek", () => {
            if (waveform.current.isPlaying())
                waveform.current.play();
        })
    }, [])

    const handlePlay = () => {
        if (props.currentlyPlaying !== waveform) {
            props.setInfo({
                img: props.albumArt,
                songName: props.songName,
                artistName: props.artistName
            })
        }
        props.togglePlaying({
            current: waveform.current,
            id: trackId
        });
        props.setCurrent({
            current: waveform.current,
            id: trackId
        });
        if (!played && user != null) {
            db.collection('users').doc(user.uid).get().then(doc => {
                const data = doc.data();
                if (!data.playedTracks.includes(trackId)) {
                    db.collection('users').doc(user.uid).update({
                        playedTracks: firebase.firestore.FieldValue.arrayUnion(trackId)
                    })
                }
            })
        }
        if (!played) {
            db.collection('tracks').doc(trackId).update({ playCount: props.playCount + 1 });
            db.collection('tracks-data').doc('popular-uploads').get().then(doc => {
                let popular = doc.data().popular;
                let oldObject = {
                    trackId: trackId,
                    plays: props.playCount
                };
                let newObject = {
                    trackId: trackId,
                    plays: props.playCount + 1
                }
                if (popular.includes(oldObject)) { }
                else if (popular.length < 25) {
                    popular.push(newObject);
                } else {
                    for (let i = 0; i < popular.length; i++) {
                        if (popular[i].plays < newObject.plays) {
                            popular.splice(i, 1);
                            popular.push(newObject);
                            break;
                        }
                    }
                }
                popular.sort((a, b) => b.plays - a.plays);
                db.collection('tracks-data').doc('popular-uploads').update({
                    popular: popular
                })
            })
        }
        setPlayed(true);
        setIsPlaying(isPlaying => !isPlaying);
    };

    const handleLike = () => {
        if (user != null) {
            db.collection('tracks').doc(trackId).get().then(doc => {
                let data = doc.data();
                if (data.likedBy.includes(user.uid)) return true;
                else return false;
            }).then(likedByCurrentUser => {
                db.collection('tracks').doc(trackId).update({
                    likeCount: likedByCurrentUser === false ? firebase.firestore.FieldValue.increment(1) : props.likes,
                    likedBy: firebase.firestore.FieldValue.arrayUnion(user.uid)
                });
                db.collection('users').doc(user.uid).update({
                    likedTracks: firebase.firestore.FieldValue.arrayUnion(trackId)
                });
                if (!likedByCurrentUser) {
                    setLikes(likes => likes + 1);
                }
            })
        }
        setTrackLiked(() => !trackLiked);
    }

    const handleRepost = () => {
        if (user != null) {
            db.collection('tracks').doc(trackId).get().then(doc => {
                let data = doc.data();
                if (data.repostedBy.includes(user.uid)) return true;
                else return false;
            }).then(repostedByUser => {
                if (!repostedByUser) {
                    db.collection('users').doc(user.uid).update({
                        posts: firebase.firestore.FieldValue.arrayUnion({
                            trackId: trackId,
                            postDate: Date.now()
                        })
                    })
                    db.collection('tracks').doc(trackId).update({
                        repostCount: firebase.firestore.FieldValue.increment(1),
                        repostedBy: firebase.firestore.FieldValue.arrayUnion(user.uid)
                    })
                }
            })
        }
    }

    const playBtn = !isPlaying && props.currentlyPlaying !== waveform ? <BsPlayFill /> : <BsPauseFill className="pause-btn" />;
    const post = props.userName === props.artistName ? "posted" : <>&nbsp;<BsArrowRepeat />reposted</>;
    const likeClass = trackLiked ? "social-icon liked" : "social-icon like";

    return (
        <Container className="track">
            <Row className="poster">
                <Col className="">
                    <img className="user-avatar" src="https://i.imgur.com/p3vccAp.jpeg" alt="poster-avatar" />
                    &nbsp;<a className="link" href={`/${props.userName}`}>{props.userName}</a>
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
                <Col className="wave-col">
                    <Row><div>
                        <a className="link artist" href={`/${props.artistName}`}>{props.artistName}</a>
                    </div></Row>
                    <Row className="track-song-name"><div>
                        {props.songName}
                    </div></Row>
                    <Row className="">
                        <Col className="waveform wave-container">
                        </Col>
                    </Row>
                    <Row className="social">
                        <div ><button className={likeClass} onClick={handleLike}>
                            <BsHeart /> {likes}
                        </button></div>
                        <div ><button className="social-icon repost" onClick={handleRepost}>
                            <BsArrowRepeat /> {props.reposts}
                        </button></div>

                        <div className="social-tag play"><BsPlay /> {props.playCount}</div>
                        {/* <div className="social-tag">
                            <BsChatSquare /> {props.commentCount}
                        </div> */}
                    </Row>
                </Col>
            </Row>
        </Container >
    )

}

export default Track;