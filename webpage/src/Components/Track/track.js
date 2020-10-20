import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsHeart, BsArrowRepeat, BsPlay, BsChatSquare } from 'react-icons/bs';
import "./track.css";

class Track extends Component {


    render() {
        const playing = this.props.playing ? "play-btn pause" : "play-btn play";
        const post = this.props.userName === this.props.artistName ? "posted" : "reposted";
        return (
            <Container className="track">
                <Row className="poster">
                    <Col className="">
                        <img className="user-avatar" src="https://i.imgur.com/p3vccAp.jpeg" alt="poster-avatar" />
                        &nbsp;{this.props.userName} {post} a track 15 hours ago
                    </Col>

                </Row>
                <Row className="">
                    <Col lg={2} className="">
                        <img className="track-art" src={this.props.albumArt} alt="track-art" />
                        <button className={playing}></button>
                    </Col>
                    <Col className="">
                        <Row><div>{this.props.artistName}</div></Row>
                        <Row>{this.props.songName}</Row>
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
                                <div className="social-icon"><BsPlay /> {this.props.playCount}</div>
                            </Col>
                            <Col md={1}>
                                <div className="social-icon">
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