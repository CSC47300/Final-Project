import React, { useContext, useState, useEffect, useCallback } from 'react';
import { UserContext } from '../../Providers/UserProvider.js';
import { db } from '../../firebase';
import { createTrack, getElapsedTime } from '../../Helpers/helpers';
import { Col, Container, Row } from 'react-bootstrap';
import UserLikes from '../Likes/likes';
import Player from '../Player/player.js';
import Track from '../Track/track';
import './feed.css';

const Feed = ({ user }) => {
    const [tracks, setTracks] = useState([]);
    const [currentlyPlaying, setCurrent] = useState({
        current: "",
        id: ""
    });
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentInfo, setInfo] = useState({
        img: '',
        songName: '',
        artistName: ''
    })

    // const user = useContext(UserContext);

    const togglePlaying = (item = currentlyPlaying) => {
        // console.log(currentlyPlaying.current)
        // if (currentlyPlaying.current != "") {
        //     console.log(currentlyPlaying.current.current, item.id != currentlyPlaying.id);
        //     if (currentlyPlaying.current.current !== null && item.id != currentlyPlaying.id) currentlyPlaying.current.pause();
        // }
        // if (item.id != currentlyPlaying.id && item.id !== "") {
        //     currentlyPlaying.current.pause();
        // }
        if (item.current != "") {
            item.current.playPause();
            setIsPlaying(isPlaying => !isPlaying);
        }
    }

    const getPosts = () => {
        let posts = [], following = [], requests = [];
        db.collection('users-1').doc('user_2').get().then(doc => {
            const data = doc.data();
            following = [...data.following];
        }).then(() => {
            following.forEach(artist => {
                requests.push(db.collection('users-1').doc(artist).get());
            })
            return Promise.all(requests);
        }).then(docs => {
            let items = docs.map(doc => doc.data());
            for (let i = 0; i < items.length; i++) {
                let newPosts = items[i].posts;
                newPosts.forEach(post => {          // Get all posts by user and add the userName to the post object
                    post["postedBy"] = items[i].displayName;
                })
                posts = posts.concat(newPosts);
            }
            posts.sort((a, b) => b.postDate - a.postDate);  // Sort by latest posts first
            requests = [];
            // Get all tracks from posts
            for (let i = 0; i < posts.length || i < 25; i++) { // Hard limit on posts shown, this can be changed in future
                requests.push(db.collection('tracks-1').doc(posts[i].trackId).get());
            }
            return Promise.all(requests);
        }).then(docs => {
            let tracks = [];
            let items = docs.map(doc => doc.data());
            for (let i = 0; i < items.length; i++) {
                let data = items[i];      // Create tracks
                tracks.push(
                    <Track
                        key={`${data.trackId}_inst_${i}`}
                        isPlaying={isPlaying}
                        likes={data.likeCount}
                        reposts={data.repostCount}
                        playCount={data.playCount}
                        // commentCount={commentCount}
                        songName={data.trackName}
                        artistName={posts[i]["postedBy"]}
                        userName={data.userId}
                        albumArt={data.trackArt}
                        timeFrame={getElapsedTime(data.uploadDate)}
                        track={data.audio}
                        id={`${data.trackId}_inst_${i}`}
                        togglePlaying={togglePlaying}
                        setCurrent={setCurrent}
                        setInfo={setInfo}
                        currentlyPlaying={currentlyPlaying}
                    />
                )
            }
            setTracks(tracks);      // Push tracks to state
        }).catch(err => console.error(err))
    }

    const getDefaultPosts = () => {
        let requests = [];
        db.collection('tracks-data').doc('recent-uploads').get().then(doc => {
            let recents = doc.data().recent;
            recents.forEach(track => {
                requests.push(db.collection('tracks-1').doc(track).get());
            })
            return Promise.all(requests);
        }).then(docs => {
            let tracks = [];
            let items = docs.map(doc => doc.data());
            for (let i = 0; i < items.length; i++) {
                let data = items[i];      // Create tracks
                tracks.push(
                    createTrack(
                        `${data.trackId}_inst_${i}`,
                        data.userId,
                        data.userId,
                        getElapsedTime(data.uploadDate),
                        data.audio,
                        isPlaying,
                        togglePlaying,
                        data.trackName,
                        data.playCount,
                        data.likeCount,
                        data.repostCount,
                        data.trackArt,
                        setCurrent,
                        setInfo,
                        currentlyPlaying
                    )
                )
            }
            if (tracks.length === 0) getDefaultPosts();
            else setTracks(tracks);      // Push tracks to state
        }).catch(err => console.error(err))
    }

    useEffect(() => {
        if (user === null) return;
        if (user !== undefined) {
            getPosts();
        } else {
            getDefaultPosts();
        }
    }, [user])

    return (
        <>
            <Container className="feed">
                <Row>
                    <Col className="track-column" md={9} lg={9} sm="auto" xs="auto">
                        <h2 className="latest-header">
                            Here are the latest posts from the artists you follow:
                    </h2>
                    </Col>
                </Row>
                <Row>
                    <Col className="track-column" md={9} lg={9} sm="auto" xs="auto">
                        {tracks}
                    </Col>
                    <Col lg={3} md={3}>
                        <div>Likes:</div>
                        {/* <UserLikes /> */}
                        <div>Listening History:</div>
                    </Col>
                </Row>
            </Container>
            <Player
                togglePlay={togglePlaying}
                isPlaying={isPlaying}
                img={currentInfo.img}
                songName={currentInfo.songName}
                artistName={currentInfo.artistName}
            />
        </>
    )
}

export default Feed;