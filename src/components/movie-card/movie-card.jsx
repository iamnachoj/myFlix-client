import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;
    return (
      <Card className="movie-card">
        <Card.Img variant="top" className="img-movie" src={movieData.imagePath} />
        <Card.Body className="movie-card text-center">
          <Card.Title className="card-text">{movieData.Title}</Card.Title>
          <Link to={"/movies/" + movieData._id}>
          <Button variant="light">Open</Button>
          </Link>
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