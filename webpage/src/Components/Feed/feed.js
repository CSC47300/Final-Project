import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Providers/UserProvider.js';
import { db } from '../../firebase';
import { createTrack, getElapsedTime } from '../../Helpers/helpers';

const Feed = (props) => {

    const [tracks, setTracks] = useState([]);

    const user = useContext(UserContext);

    const getPosts = () => {
        let posts = [], following = [], requests = [];
        db.collection('users-1').doc('user_0').get().then(doc => {
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
                // let data = items[i];
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
                    createTrack(
                        `${data.trackId}_inst_${i}`,
                        posts[i]["postedBy"],
                        data.userId,
                        getElapsedTime(data.uploadDate),
                        data.audio,
                        props.isPlaying,
                        props.togglePlay,
                        data.trackName,
                        data.playCount,
                        data.likeCount,
                        data.commentCount,
                        data.repostCount,
                        data.trackArt,
                    )
                )
            }
            setTracks(tracks);      // Push tracks to state
        })
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
                        props.isPlaying,
                        props.togglePlay,
                        data.trackName,
                        data.playCount,
                        data.likeCount,
                        data.commentCount,
                        data.repostCount,
                        data.trackArt,
                    )
                )
            }
            setTracks(tracks);      // Push tracks to state
        })
    }

    useEffect(() => {
        // getPosts();
        getDefaultPosts();
    }, [])

    return (
        <>
            <h2>
                Here are the latest posts from the artists you follow:
            </h2>
            {tracks}
        </>
    )
}

export default Feed;