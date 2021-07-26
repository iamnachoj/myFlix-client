import React from 'react';
import './genre-view.scss';
import { Row, Col, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export class GenreView extends React.Component{
  render(){
    const { movie } = this.props;
    return(
      <>
      <Row className="genre-view">
        <Col>
       <h1 className="title">Genre</h1>
       <div className="genre-name">
         <span className="label">Name: </span>
         <span className="value">{movie.Genre.Name}</span>
       </div>
       <div className="genre-description">
         <span className="label">Description: </span>
         <span className="value">{movie.Genre.Description}</span>
       </div>
      <Link to={"/"}><Button className="back-button">Back</Button></Link>
      </Col>
     </Row>
     
     </>
    )

  }
}