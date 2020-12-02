import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { BsHeart, BsArrowRepeat, BsPlayFill } from 'react-icons/bs';
import './song-display.css';

const SongDisplay = (props) => {
    return (
        <>
            <Row className="song-display">
                <Col className="" md="auto" lg="auto" sm="auto" xs="auto">
                    <img
                        className="album-art"
                        src={props.img}
                    />
                </Col>
                <Col md="auto" lg="auto" sm="auto" xs="auto">
                    <Row>
                        <a className="link artist text" href={`/${props.artistName}`}>{props.artistName}</a>
                    </Row>
                    <Row className="text">
                        {props.songName}
                    </Row>
                    <Row className="social">
                        <span className="social-display">
                            <BsPlayFill /> {props.playCount}
                        </span>
                        <span className="social-display">
                            <BsHeart /> {props.likeCount}
                        </span>
                        <span className="social-display">
                            <BsArrowRepeat /> {props.repostCount}
                        </span>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

const createSongDisplay = (img, songName, artistName, playCount, repostCount, likeCount) => {
    return <SongDisplay
        key={`${artistName}-${songName}-${playCount}`}
        img={img}
        songName={songName}
        artistName={artistName}
        playCount={playCount}
        repostCount={repostCount}
        likeCount={likeCount}
    />
}

export { createSongDisplay };
export default SongDisplay;