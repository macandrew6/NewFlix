import React from 'react';
import { Link } from 'react-router-dom';
import { Player } from 'video-react';

class MovieThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.sources = {
      trailer: this.props.movie.trailerUrl,
      movie: this.props.movie.movieUrl
    };
    this.state = {
      movie_id: this.props.movie.id,
      user_id: this.props.user.id,
      height: 149,
      width: 250,
      source: this.sources.trailer,
      autoplay: false,
      userMovie: false,
      showButtons: false,
      toggleControls: false,
    };
  
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.load = this.load.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
    this.handleAddMovie = this.handleAddMovie.bind(this);
    this.handleRemoveMovie = this.handleRemoveMovie.bind(this);
    // this.openShowPage = this.openShowPage.bind(this);
    // this.closeShowPage = this.closeShowPage.bind(this);
  }
  
  componentDidMount() {
    this.player.subscribeToStateChange(this.handleStateChange);
  }

  handleStateChange(state) {
    this.setState({
      player: state
    });
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  load() {
    this.player.load();
  }

  toggleSound(soundState) {
    return () => {
      if (this.player.muted) {
        this.player.muted = soundState;
      } else {
        this.player.muted = !soundState;
      }
    };
  }
  
  handleMouseEnter(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      showButtons: true
    });
    setTimeout(() => {
      this.play();
    }, 270);
  }

  handleMouseLeave(e) {
    e.preventDefault();
    this.setState({
      showButtons: false
    });
    setTimeout(() => {
      this.pause();
      this.load();
    }, 380);
  }

  handleRemoveMovie(e) {
    e.preventDefault();
    for (let i = 0; i <= this.props.userMovies.length; i++) {
      if (this.props.userMovies[i] === undefined) {
        return;
      }
      if (this.props.userMovies[i][1].id === this.props.movie.id) {
        this.props.removeUserMovie(this.props.userMovies[i][0]);
        //bug in changing the store after delete request
      }
    }

    this.setState({
      userMovie: !this.state.userMovie
    });
  }

  handleAddMovie(e) {
    e.preventDefault();
    const assData = {
      user_movie: {
        user_id: this.state.user_id,
        movie_id: this.state.movie_id
      }
    };
    
    console.log(assData);
    this.props.postUserMovie(assData);
    //bug in changing the store after post request

    this.setState({
      userMovie: !this.state.userMovie
    });
  }
      
  render() {
    const { isUserMovie, movie } = this.props;
    const { width, height, source, autoplay, showButtons } = this.state;
    return (
      <div 
        className="movie-thumbnail-slide"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={this.props.offSet ? {
          transform: `translateX(${this.props.offSet[0]}px)`,
          display: `${this.props.offSet[1] ? 'flex' : 'none'}`
        } : {position: 'relative'}}
        >
        <Link to={`/browse/watch/${movie.id}`}>
          <Player 
            ref={(p) => {
              this.player = p;
            }}
            autoPlay={autoplay}
            muted={true}
            fluid={false}
            poster={movie.imageUrl}
            src={source}
            width={width}
            height={height}
          >
          </Player>
        </Link>
        
        {showButtons ? 
          <div className="button-div">
            <div className="toggle-thumbnail-sound" onClick={this.toggleSound(false)}>
              <i className="fas fa-volume-up"></i>
            </div>
            {isUserMovie ?
              <button 
                className="remove-movie-btn" 
                onClick={e => this.handleRemoveMovie(e)} 
              >
                <i className="fas fa-minus-circle"></i>
              </button> :
              <button 
                className="add-movie-btn" 
                onClick={e => this.handleAddMovie(e)}
              >
                <i className="fas fa-plus"></i>
              </button>
            }
          </div> : 
          null
        }
      </div>
    );
  }
}


export default MovieThumbnail;