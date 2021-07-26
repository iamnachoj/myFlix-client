import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;
    return (
      <Card className="movie-card">
        <Card.Img variant="top" className="img-movie" src={movieData.imagePath} />
        <Card.Body className="movie-card text-center">
          <Card.Title className="card-text">{movieData.Title}</Card.Title>
          <Button variant="link">Open</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired
};