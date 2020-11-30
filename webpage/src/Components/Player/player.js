import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { MdAlbum } from 'react-icons/md';
import './player.css';

const Player = (props) => {
    const defaultAlbum = <MdAlbum className="p-el default-album" />
    const play = !props.isPlaying ? <FaPlay className="play" /> : <FaPause className="pause" />;
    return (
        <>
            <div className="player">
                <div className="p-container">
                    {props.img === '' ? defaultAlbum : <img className="p-el album-player" src={props.img} />}
                    <div className="p-el info-container">
                        <div className="p-el song">{props.songName}</div>
                        <div className="p-el artist">{props.artistName}</div>
                    </div>
                    <div className="p-el play-button">
                        <button onClick={() => props.togglePlay()}>{play}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Player;