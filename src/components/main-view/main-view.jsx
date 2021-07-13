import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...'},
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...'},
        { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...'}
      ],
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

    if (selectedMovie) return <MovieView movie={selectedMovie} />; // at the beginning, selectedMovie is = null, so this won't be triggered.
  
    return (
      <div className="main-view">
        {movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>)}
      </div> // now we are sending a function as a prop (onMovieClick) to MovieCard that will be triggered over there, and makes the function 'setSelectedMovie' trigger.
      // then selectedMovie will not be null anymore, and then MovieView component will be returned.
    );
  }
}
export default MainView;