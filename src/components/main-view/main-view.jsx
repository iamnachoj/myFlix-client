//Modules
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

//React Redux
import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';

//React Components
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import MoviesList from '../movies-list/movies-list';

//React Bootstrap
import { Row, Col } from 'react-bootstrap';

//Main-view CSS
import './main-view.scss';

//Class MainView component 
class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      user: null 
    };
  }


  //Methods
  
  getMovies(token){
    axios
      .get('https://myflix-lounge.herokuapp.com/API/Movies', {headers: { Authorization: `Bearer ${token}`}})
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    this.setState({ 
     user: authData.user.Name
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('Name', authData.user.Name);
    this.getMovies(authData.token);
  }


  //Render method
  render() {
    let { movies } = this.props
    let { user } = this.state;

    return (
      <Router> 
      <Row className="main-view justify-content-md-center">
           { /* All Routes */}
          <Route exact path="/" render={() => {            
            if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            if (movies === 0) return <MainView> loading... </MainView>
            return <Col sm={12} md={6} lg={4} key={movie._id}><MovieList movies={movies} /></Col>
            }
           } />


          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <RegistrationView onBackClick={() => history.goBack()}/> 
          }} />


          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            return <Col md={8}>
              <MovieView movie={movies.find(movie => movie._id === match.params.movieId)} onBackClick={() => history.goBack()} /></Col>
          }} />


          <Route path="/director/:name" render={({match, history}) => {
            if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            return <Col md={8}>
               <DirectorView movie={movies.find(movie => movie.Director.Name === match.params.name)} onBackClick={() => history.goBack()}/></Col>
          }} />

          <Route path="/genre/:name" render={({match, history}) => {
            if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            return <Col md={8}>
               <GenreView movie={movies.find(movie => movie.Genre.Name === match.params.name)} onBackClick={() => history.goBack()}/></Col>
          }}/>

          <Route path="/my-profile" render={({ history}) => {
            if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            return <Col md={8}>
               <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()}/></Col>
          }}/>

        </Row>
      </Router>
    );
  }

  componentDidMount(){ 
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('Name')
      });
      this.getMovies(accessToken);
    }
  }
  
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);