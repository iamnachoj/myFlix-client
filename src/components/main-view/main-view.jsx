import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from "../registration-view/registration-view";

import './main-view.scss';

class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null, 
      user: null, //initial state set to null.
      register: null    
    };
  }
  
  componentDidMount(){ // this code allows to fetch the API from heroku to catch the movies. 
    axios
      .get('https://myflix-lounge.herokuapp.com/API/Movies') 
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({ 
     user 
    });
  }

  //same as to log in, but for the registration
  onRegistration(register) {
    this.setState({
     register,
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state; // creates consts for the state

    if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);
    
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className="main-view">Loading...</div>

    if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>; // at the beginning, selectedMovie = null. It won't be triggered.
  
    return (
      <div className="main-view">
        {movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>)}
      </div> // now we are sending a function as a prop (onMovieClick) to MovieCard that will be triggered over there, and makes the function 'setSelectedMovie' trigger.
      // then selectedMovie will not be null anymore, and then MovieView component will be returned.
    );
  }
  
}
export default MainView;