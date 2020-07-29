import React, { Component } from 'react';
import Seasons from 'components/watch/seasons';
import Episode from 'components/watch/episode';
import Loader from 'components/loader';


/* ---------- */
import './styles/sourceControl.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
/* ---------- */

class SourceControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hovered: false,
            left: 0,
            slideBy: 90,
            slideLimit: this.props.episodes.length%5 ? Math.ceil(this.props.episodes.length/5) : this.props.episodes.length/5,
            slidePosition: 1
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.episodes !== this.props.episodes) {
            const slideLimit = this.props.episodes.length%5 ? Math.ceil(this.props.episodes.length/5) : this.props.episodes.length/5
            this.setState({
                slideLimit,
                left: 0,
                slidePosition: 1
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Seasons seasons={Array(this.props.seasons).fill('season')}
                        activeSeason={this.props.activeSeason}
                        changeSeason={this.props.changeSeason}
                />
        
        
        
                <div id="episode-switcher">
                    <FontAwesomeIcon id="slide-right" 
                                     icon={faCaretLeft} 
                                     onClick={() => this.slideRight()}
                                     className={this.state.slidePosition === 1 ? 'hidden' : ''}
                    />       

                        <div id="episodes-container"
                            onMouseEnter={() => this.setState({hovered: true})}
                            onMouseLeave={() => this.setState({hovered: false})}
                        >
                            <div id="episodes"
                                style={{left: `${this.state.left}vw`}}
                            >
                                {!this.props.loading && (
                                    <React.Fragment>
                                        {this.props.episodes.map((episode, index) => {
                                            return <Episode key={index} 
                                                            episode={episode}
                                                            changeSource={this.props.changeSource}
                                                            last={this.props.episodes.length-1 === index}
                                                            activeEpisode={this.props.activeEpisode === index}
                                                            parentHovered={this.state.hovered}
                                                    />
                                        })}
                                    </React.Fragment>
                                )}

                                {this.props.loading && (
                                    <div className="loading">
                                        <Loader />
                                    </div>
                                )}
                            </div>
        
                        </div>
                        
                    <FontAwesomeIcon id="slide-left" 
                                     icon={faCaretRight} 
                                     onClick={() => this.slideLeft()}
                                     className={this.state.slidePosition === this.state.slideLimit ? 'hidden' : ''}
                    />
                </div>
            </React.Fragment>
        )
    }

    slideLeft() {
        if (this.state.slidePosition !== this.state.slideLimit) {
            const left = this.state.left - this.state.slideBy
            const slidePosition = this.state.slidePosition+1
            this.setState({
                left,
                slidePosition
            })
        }
    }

    slideRight() {
        if (this.state.slidePosition !== 1) {
            const left = this.state.left + this.state.slideBy
            const slidePosition = this.state.slidePosition-1
            this.setState({
                left,
                slidePosition
            })
        }
    }
}

/* ---------- */

export default SourceControl;