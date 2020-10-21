import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsHeart, BsArrowRepeat, BsPlay, BsChatSquare, BsPlayFill, BsPauseFill } from 'react-icons/bs';
import "./track.css";

class Track extends Component {


    render() {
        const playBtn = !this.props.playing ? <BsPlayFill /> : <BsPauseFill className="pause-btn" />;
        const post = this.props.userName === this.props.artistName ? "posted" : "reposted";
        return (
            <Container className="track">
                <Row className="poster">
                    <Col className="">
                        <img className="user-avatar" src="https://i.imgur.com/p3vccAp.jpeg" alt="poster-avatar" />
                        &nbsp;<a href={`#${this.props.userName}`}>{this.props.userName}</a> {post} a track 15 hours ago
                    </Col>

                </Row>
                <Row className="">
                    <Col lg={2} className="">
                        <img className="track-art" src={this.props.albumArt} alt="track-art" />
                        <button className="play-btn">
                            {playBtn}
                        </button>
                    </Col>
                    <Col className="">
                        <Row><div>
                            <a href={`#${this.props.artistName}`}>{this.props.artistName}</a>
                        </div></Row>
                        <Row><div>
                            <a href={`#${this.props.songName}`}>{this.props.songName}</a>
                        </div></Row>
                        <Row className="audio-wave"></Row>
                        <Row className="social">
                            <Col md={1}><button className="social-icon">
                                <BsHeart /> {this.props.likes}
                            </button></Col>
                            <Col md={1}><button className="social-icon">
                                <BsArrowRepeat /> {this.props.reposts}
                            </button></Col>
                            <Col md={3}></Col>
                            <Col md={1}>
                                <div className="social-tag"><BsPlay /> {this.props.playCount}</div>
                            </Col>
                            <Col md={1}>
                                <div className="social-tag">
                                    <BsChatSquare /> {this.props.commentCount}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container >
        )
    }
}

export default Track;