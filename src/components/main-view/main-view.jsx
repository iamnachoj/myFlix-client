import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    }
  }
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }
  render() {
    const { movies, selectedMovie } = this.state; // creates consts for the state

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>; //displays a message in case there isn't movies.

    if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>; // at the beginning, selectedMovie = null. It won't be triggered.
  
    return (
      <div className="main-view">
        {movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>)}
      </div> // now we are sending a function as a prop (onMovieClick) to MovieCard that will be triggered over there, and makes the function 'setSelectedMovie' trigger.
      // then selectedMovie will not be null anymore, and then MovieView component will be returned.
    );
  }
  componentDidMount(){
    axios.get('https://myflix-lounge.herokuapp.com/API/Movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
export default MainView;