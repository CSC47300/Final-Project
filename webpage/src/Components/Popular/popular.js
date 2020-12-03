import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { createSongDisplay } from './song-display';
import { MdAlbum } from 'react-icons/md';
import './popular.css';

const Popular = (props) => {
    const [entries, setEntries] = useState([]);
    const getPopular = () => {
        let requests = [];
        db.collection('tracks-data').doc('popular-uploads').get().then(doc => {
            return doc.data().popular;
        }).then(popular => {
            for (let i = 0; i < 5 && i < popular.length; i++) {
                requests.push(db.collection('tracks').doc(popular[i].trackId).get());
            }
            return Promise.all(requests);
        }).then(docs => {
            let items = docs.map(doc => doc.data());
            let tracks = [];
            items.forEach(track => {
                tracks.push(createSongDisplay(track.trackArt, track.trackName, track.userDisplayName,
                    track.playCount, track.repostCount, track.likeCount)
                )
            })
            setEntries(tracks);
        })
    }

    useEffect(() => {
        getPopular();
    }, [])
    return (
        <>
            <div className="popular">
                <span>
                    <MdAlbum className="record-icon" />
                    <h3 className="sidebar-header">Popular Tracks</h3>
                </span>
                <hr className="line" />
                {entries}
            </div>
        </>
    )
}

export default Popular;