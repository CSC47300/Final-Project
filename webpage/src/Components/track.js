import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "../CSS/track.css";

class Track extends Component {


    render() {
        return (
            <Container className="track">
                <Row className="poster">
                    <Col className="">
                        <img className="user-avatar" src="https://i.imgur.com/p3vccAp.jpeg" alt="poster-avatar" />
                        User posted a track 15 hours ago
                    </Col>

                </Row>
                <Row className="">
                    <Col lg={2} className="">
                        <img className="track-art" src="https://i.imgur.com/p3vccAp.jpeg" alt="track-art" />
                    </Col>
                    <Col className="">
                        <Row>Artist name</Row>
                        <Row>Song name</Row>
                        <Row className="audio-wave"></Row>
                        <Row className="social">
                            <Col md={1}><button>like</button></Col>
                            <Col md={1}><button>Repost</button></Col>
                            <Col md={6}></Col>
                            <Col md={2}>89 plays</Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Track;