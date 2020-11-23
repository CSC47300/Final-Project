import Track from '../Components/Track/track';
import React from 'react';
import { db } from '../firebase';

const getElapsedTime = (time) => {
    const current = Date.now();
    const elapsed = current - time;
    const seconds = elapsed / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = weeks / 4;
    const years = months / 12;
    const names = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];
    const values = [years, months, weeks, days, hours, minutes, seconds];
    let measurment;
    let i = 0;
    for (; i < values.length; i++) {
        measurment = values[i];
        if (measurment > 1) {
            break;
        }
    }
    if (i === 7) i--;
    let val = Math.floor(measurment);
    return `${val} ${val > 1 || val === 0 ? names[i] : names[i].substr(0, names[i].length - 1)}`;
}

const createTrack = (trackId, userName, artistName, uploadDate, audio, isPlaying, togglePlay,
    trackName, playCount, likeCount, commentCount, repostCount, trackArt) => {
    return <Track
        key={trackId}
        isPlaying={isPlaying}
        likes={likeCount}
        reposts={repostCount}
        playCount={playCount}
        commentCount={commentCount}
        songName={trackName}
        artistName={artistName}
        userName={userName}
        albumArt={trackArt}
        timeFrame={uploadDate}
        track={audio}
        id={trackId}
        togglePlay={togglePlay}
    />
}

const updateRecentUploads = (trackId) => {
    db.collection('tracks-data').doc('recent-uploads').get().then(doc => {
        let recent = doc.data().recent;
        if (recent.length < 25) {
            recent.unshift(trackId);
        } else {
            recent.unshift(trackId);
            recent.pop();
        }
        db.collection('tracks-data').doc('recent-uploads').set({
            recent: recent
        })
    })
}

export { getElapsedTime, createTrack, updateRecentUploads };