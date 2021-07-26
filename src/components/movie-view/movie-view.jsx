import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import {Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export class MovieView extends React.Component{

 render(){
   const { movie } = this.props;
   return (
     <Row className="movie-view">
      <Col className="text-center">
        <div className="movie-poster">
         <img src={movie.imagePath} />
        </div>
      </Col>
      <Col className="info">
       <div className="movie-title">
         <span className="label">Title: </span>
         <span className="value">{movie.Title}</span>
       </div>
       <div className="movie-description">
         <span className="label">Description: </span>
         <span className="value">{movie.Description}</span>
       </div>
       <div className="movie-director">
         <span className="label">Director: </span>
         <span className="value">{movie.Director.Name}</span>
       </div>
       <div className="movie-genre">
         <span className="label">Genre: </span>
         <span className="value">{movie.Genre.Name}</span>
       </div>
       <Link to={"/"}>
       <Button>Back</Button>
       </Link>
      </Col>
     </Row>
   )
 }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string
  }).isRequired
};