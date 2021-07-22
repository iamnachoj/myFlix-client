import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import {Row, Col, Button} from 'react-bootstrap';


export class MovieView extends React.Component{

 render(){
   const { movie, onBackClick} = this.props;
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
       <Button onClick={() => onBackClick(null)}>Back</Button>
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
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};