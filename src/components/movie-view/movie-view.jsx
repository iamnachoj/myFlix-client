import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';

export class MovieView extends React.Component{

 render(){
   const { movie, onBackClick} = this.props;
   return (
    <div className="movie-view">
      <div className="movie-poster">
        <img src={movie.imagePath} />
      </div>
      <div className="movie-title">
        <span className="label">Title: </span>
        <span className="value">{movie.Title}</span>
      </div>
      <div className="movie-description">
        <span className="label">Description: </span>
        <span className="value">{movie.Description}</span>
      </div>
      <button onClick={() => onBackClick(null)}>Back</button>
     </div>
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