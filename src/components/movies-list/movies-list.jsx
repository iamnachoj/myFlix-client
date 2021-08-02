import React from 'react';
import {Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view"/>;

 return filteredMovies.map(m => (
  <Col sm={12} md={6} lg={4}><MovieCard movie={m} key={m._id}/></Col>
  ));
}

export default connect(mapStateToProps)(MoviesList);