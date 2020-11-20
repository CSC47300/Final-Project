import React, { useRef, useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Providers/UserProvider.js';
import { db } from '../../firebase';
import { createTrack, getElapsedTime } from '../../Helpers/helpers';
import firebase from "firebase/app";

const Feed = (props) => {
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
            return Promise.all(requests);
        }).then(docs => {
            for (let i = 0; i < data.length; i++) {
                let data = docs[i].data();
                posts.concat(data.posts);
            }
        })
    }

    return (
        <>
            <h2>
                Here are the latest posts from the artists you follow:
        </h2>

        </>
    )
}

export default Feed;