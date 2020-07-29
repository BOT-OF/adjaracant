import React, { Component } from 'react';
import videojs from 'video.js';

/* ---------- */
import './styles/videoPlayer.scss';
import '@silvermine/videojs-quality-selector/src/sass/quality-selector.scss';
/* ---------- */

class VideoPlayer extends Component {

    componentDidMount() {
        require('@silvermine/videojs-quality-selector')(videojs)
        this.player = videojs(this.videoNode, this.props)
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    changeSource(source) {
        this.player.src(source)
    }

    render() {
        return (
            <div id="video-player-container" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${this.props.backgroundImage})`}}>
                <div data-vjs-player>
                    <video ref={ node => this.videoNode = node } className="video-js"></video>
                </div>
            </div>
        )
    }
}

/* ---------- */

export default VideoPlayer;