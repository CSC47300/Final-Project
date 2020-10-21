import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsHeart, BsArrowRepeat, BsPlay, BsChatSquare, BsPlayFill, BsPauseFill } from 'react-icons/bs';
import "./track.css";

class Track extends Component {


    render() {
        const playBtn = !this.props.playing ? <BsPlayFill /> : <BsPauseFill className="pause-btn" />;
        const post = this.props.userName === this.props.artistName ? "posted" : <>&nbsp;<BsArrowRepeat />reposted</>;
        return (
            <Container className="track">
                <Row className="poster">
                    <Col className="">
                        <img className="user-avatar" src="https://i.imgur.com/p3vccAp.jpeg" alt="poster-avatar" />
                        &nbsp;<a className="link" href={`#${this.props.userName}`}>{this.props.userName}</a>
                        &nbsp;{post} a track {this.props.timeFrame} ago
                    </Col>

                </Row>
                <Row className="main-track">
                    <Col lg={2} className="art-clm">
                        <img className="track-art" src={this.props.albumArt} alt="track-art" />
                        <button className="play-btn">
                            {playBtn}
                        </button>
                    </Col>
                    <Col className="">
                        <Row><div>
                            <a className="link artist" href={`#${this.props.artistName}`}>{this.props.artistName}</a>
                        </div></Row>
                        <Row><div>
                            <a className="link song" href={`#${this.props.songName}`}>{this.props.songName}</a>
                        </div></Row>
                        <Row className="audio-wave"></Row>
                        <Row className="social">
                            <div ><button className="social-icon like">
                                <BsHeart /> {this.props.likes}
                            </button></div>
                            <div ><button className="social-icon repost">
                                <BsArrowRepeat /> {this.props.reposts}
                            </button></div>
                            <Col md={3}></Col>
                            <div className="social-tag"><BsPlay /> {this.props.playCount}</div>
                            <div className="social-tag">
                                <BsChatSquare /> {this.props.commentCount}
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container >
        )
    }
}

export default Track;