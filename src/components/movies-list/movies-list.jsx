import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
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

  if (!movies) return <div className="main-view">Oops, seems like that movie is not on our list :(</div>;

 return <>
     {/* this Column is missing a key */}
    <Col md={12}  style={{ margin: '1em' }}> 
     <VisibilityFilterInput visibilityFilter={visibilityFilter}  />
    </Col>
   {filteredMovies.map(m => (
   <Col sm={12} md={6} lg={4}><MovieCard movie={m} key={m._id}/></Col>
   ))}
  </>;
}

export default connect(mapStateToProps)(MoviesList);