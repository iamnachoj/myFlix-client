import React from 'react';
import axios from 'axios';
import './profile-view.scss';
import { Row, Col, Button } from 'react-bootstrap';

export class ProfileView extends React.Component{
  
  constructor(){
    super();
    this.state = {
      Name: null,
      Password: null,
      Email: null, 
      Birthday: null,
      FavouriteMovies: []    
    };
  }
  
  getUser(token) {
    let url = 'https://myflix-lounge.herokuapp.com/users/' + localStorage.getItem('Name');

    axios
        .get(url, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            this.setState({
                Name: response.data.Name,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday,
                FavoriteMovies: response.data.FavoriteMovies
            });
        });   
  }
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
         <span className="value">{this.state.Email}</span>--
       </div>
       <div className="user-date">
         <span className="label">Birthdate: </span>
         <span className="value">{this.state.Birthday}</span>
       </div>
       <Button className="back-button" onClick={() => onBackClick()}>Back</Button>
      </Col>
     </Row>
     
     </>
    )
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }
}