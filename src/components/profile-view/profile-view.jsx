import React from 'react';
import './profile-view.scss';
import { Row, Col, Button } from 'react-bootstrap';

export class ProfileView extends React.Component{
  render(){
    const { user, onBackClick } = this.props;
    return(
      <>
      <Row className="genre-view">
        <Col>
       <h1 className="Title">My Profile</h1>
       <div className="user-name">
         <span className="label">Name: </span>
         <span className="value">{user}</span>
       </div>
       <div className="user-email">
         <span className="label">Email: </span>
         <span className="value">{user.Email}</span>
       </div>
       <div className="user-date">
         <span className="label">Birthdate: </span>
         <span className="value">{user.Birthday}</span>
       </div>
       <Button className="back-button" onClick={() => onBackClick()}>Back</Button>
      </Col>
     </Row>
     
     </>
    )

  }
}