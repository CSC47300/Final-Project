import Track from '../Components/Track/track';
import React from 'react';

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
    return `${val} ${val > 1 || val === 0 ? names[i] : names[i].substr(0, names[i].length - 1)} ago`;
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

export { getElapsedTime, createTrack };