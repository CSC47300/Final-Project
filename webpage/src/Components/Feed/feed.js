import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Providers/UserProvider.js';
import { db } from '../../firebase';
import { createTrack, getElapsedTime } from '../../Helpers/helpers';

const Feed = (props) => {

    const [tracks, setTracks] = useState([]);

    const user = useContext(UserContext);

    const getPosts = () => {
        let posts = [], following = [], requests = [];
        db.collection('users').doc(user.uid).get().then(doc => {
            const data = doc.data();
            following = [...data.following];
        }).then(() => {
            following.forEach(artist => {
                requests.push(db.collection('users').doc(artist).get());
            });
            return Promise.all(requests);           // Get all users followed
        }).then(docs => {
            for (let i = 0; i < data.length; i++) {
                let data = docs[i].data();
                let newPosts = data.posts;
                newPosts.forEach(post => {          // Get all posts by user and add the userName to the post object
                    post["postedBy"] = data.displayName;
                })
                posts.concat(data.posts);
            }
            posts.sort((a, b) => b.postDate - a.postDate);  // Sort by latest posts first
            requests = [];

            // Get all tracks from posts
            for (let i = 0; i < posts.length || i < 25; i++) { // Hard limit on posts shown, this can be changed in future
                requests.push(db.collection('tracks').doc(posts[i].trackId));
            }
            return Promise.all(requests);
        }).then(docs => {
            let tracks = [];
            for (let i = 0; i < data.length; i++) {
                let data = docs[i].data();      // Create tracks
                tracks.push(
                    createTrack(
                        data.trackId,
                        posts[i]["postedBy"],
                        data.userId,
                        getElapsedTime(data.uploadDate),
                        data.audio,
                        props.isPlaying,
                        props.togglePlay,
                        data.trackName,
                        data.playCount,
                        data.likes,
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
        getPosts();
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