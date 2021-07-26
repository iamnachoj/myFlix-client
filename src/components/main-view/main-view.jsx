import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { Row, Col, Button } from 'react-bootstrap';

import './main-view.scss';

class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      user: null, //initial state set to null.
      register: null    
    };
  }
  //get request sent by axios to fetch movie data
  getMovies(token){
    axios
      .get('https://myflix-lounge.herokuapp.com/API/Movies', {headers: { Authorization: `Bearer ${token}`}})
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    this.setState({ 
     user: authData.user.Name
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('Name', authData.user.Name);
    this.getMovies(authData.token);
  }
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }
  //same as to log in, but for the registration
  onRegistration(register) {
    this.setState({
     register,
    });
  }

  render() {
    const { movies, user, register } = this.state; // creates consts for the state

    return (
      <Router>
      <Row><Button onClick={()=>{this.onLoggedOut()}}>Log out</Button></Row>
      <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
            if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            return movies.map(movie => (
              <Col sm={12} md={6} lg={4} key={movie._id}>
                <MovieCard movieData={movie} />
              </Col>
            ))
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <RegistrationView onBackClick={() => history.goBack()}/> 
          }} />
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            return <Col md={8}>
              <MovieView movie={movies.find(movie => movie._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/director/:name" render={({match, history}) => {
            if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            return <Col md={8}>
               <DirectorView movie={movies.find(movie => movie.Director.Name === match.params.name)} onBackClick={() => history.goBack()}/>
            </Col>
          }} />
          <Route path="/genre/:name" render={({match, history}) => {
            if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            return <Col md={8}>
               <GenreView movie={movies.find(movie => movie.Genre.Name === match.params.name)} onBackClick={() => history.goBack()}/>
            </Col>
          }}/>
          <Route path="/users/:username" render={({match, history}) => {
            if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            return <Col md={8}>
               <ProfileView onBackClick={() => history.goBack()}/>
            </Col>
          }}/>
        </Row>
      </Router>
    );
  }

  componentDidMount(){ // this code allows to fetch the API from heroku to catch the movies. 
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('Name')
      });
      this.getMovies(accessToken);
    }
  }
  
}

export default MainView;