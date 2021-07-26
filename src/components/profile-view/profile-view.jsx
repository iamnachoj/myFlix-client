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
         <span className="value">{user.Name}</span>
       </div>
       <div className="user-email">
         <span className="label">Email: </span>
         <span className="value">{User.Email}</span>
       </div>
       <Button className="back-button" onClick={() => onBackClick()}>Back</Button>
      </Col>
     </Row>
     
     </>
    )

  }
}