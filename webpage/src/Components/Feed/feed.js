import React, { useContext, useState, useEffect, useCallback } from 'react';
import { UserContext } from '../../Providers/UserProvider.js';
import { db } from '../../firebase';
import { createTrack, getElapsedTime } from '../../Helpers/helpers';
import { Col, Container, Row } from 'react-bootstrap';
import UserLikes from '../Likes/likes';
import History from '../ListenHistory/history'
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
    const [header, setHeader] = useState("");
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
        db.collection('users').doc(user.uid).get().then(doc => {
            const data = doc.data();
            following = [...data.following];
        }).then(() => {
            following.forEach(artist => {
                requests.push(db.collection('users').doc(artist).get());
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
            for (let i = 0; i < posts.length && i < 25; i++) { // Hard limit on posts shown, this can be changed in future
                requests.push(db.collection('tracks').doc(posts[i].trackId).get());
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
                        userName={data.userDisplayName}
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
            if (tracks.length < 1) getDefaultPosts();
            setHeader("Here are the latest posts from the artists you follow:");
        }).catch(err => console.error(err))
    }

    const getDefaultPosts = () => {
        let requests = [];
        db.collection('tracks-data').doc('recent-uploads').get().then(doc => {
            let recents = doc.data().recent;
            recents.forEach(track => {
                requests.push(db.collection('tracks').doc(track).get());
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
                        data.userDisplayName,
                        data.userDisplayName,
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
            setTracks(tracks);      // Push tracks to state
            setHeader("Most recently uploaded tracks:");
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

    // const header = user !== undefined ? "Here are the latest posts from the artists you follow:" : "Most recently uploaded tracks:";
    return (
        <>
            <Container className="feed">
                <Row>
                    <Col className="track-column" md={9} lg={9} sm="auto" xs="auto">
                        <h2 className="latest-header">
                            {header}
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col className="track-column" md={9} lg={9} sm="auto" xs="auto">
                        {tracks}
                    </Col>
                    <Col lg={3} md={3}>
                        <div><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>Likes:</div>
                        { <UserLikes /> }
                        <div> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5z"/>
                              </svg> Listening History:</div>
                         { < History /> }
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