//Modules
import React from 'react';
import axios from 'axios';
import {UpdateView} from '../update-view/update-view'

//React-bootstrap
import { Row, Col, Button, Card, Form } from 'react-bootstrap';

//CSS
import './profile-view.scss';

//ProfileView Component
export class ProfileView extends React.Component{
  
  constructor(){
    super();
    this.state = {
      Name: null,
      Password: null,
      Email: null, 
      Birthday: null,
      FavouriteMovies: [],
      validated: null    
    };
  }

  //Methods

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('Name');
    props.setState({
      user: null
    });
  }
  //GET method 
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
  
  // PUT method
  handleUpdate(e, newName, newPassword, newEmail, newBirthdate) {
      this.setState({
        validated: null,
      });

      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
          validated: true,
        });
        return;
      }
      e.preventDefault();

      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      let url = 'https://myflix-lounge.herokuapp.com/users/' + localStorage.getItem('Name');

      axios.put(url, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          Name: newName ? newName : this.state.Name,
          Password: newPassword ? newPassword : this.state.Password,
          Email: newEmail ? newEmail : this.state.Email,
          Birthdate: newBirthdate ? newBirthdate : this.state.Birthdate,
        },
      })
        .then((response) => {
          alert('Saved Changes');
          this.setState({
            Name: response.data.Name,
            Password: response.data.Password,
            Email: response.data.Email,
            Birthdate: response.data.Birthdate,
          });
          localStorage.setItem('Name', this.state.Name);
          window.open(`/users/${username}`, '_self');
        })
        .catch(function (error) {
         console.log(error);
      });
  }
  

  //set different inputs

  setName(input) {
    this.Name = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthdate(input) {
    this.Birthdate = input;
  }

  //DELETE method for users
  handleDeleteUser(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    let url = 'https://myflix-lounge.herokuapp.com/users/' + localStorage.getItem('Name');

    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted.');
        window.open(`/`, '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render(){
    const { FavoriteMovies, validated } = this.state;
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
       <a href="/"><Button variant="secondary"className="logout-button"onClick={()=>{this.onLoggedOut()}}>Log out</Button></a>
      </Col>
     </Row>
     <Card className="profile-card">

          <h1 className="section">Update Profile</h1>
          <Card.Body>
            <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.Name, this.Password, this.Email, this.Birthdate)}>

              <Form.Group controlId="formName">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control type="text" placeholder="Change Name" onChange={(e) => this.setName(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form-label">
                  Password<span className="required">*</span>
                </Form.Label>
                <Form.Control type="password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" placeholder="Change Email" onChange={(e) => this.setEmail(e.target.value)}/>
              </Form.Group>

              <Form.Group controlId="formBasicBirthday">
                <Form.Label className="form-label">Birthdate</Form.Label>
                <Form.Control type="date" placeholder="Change Birthdate" onChange={(e) => this.setBirthdate(e.target.value)} />
              </Form.Group>

              <Button variant='warning' type="submit">
                Update
              </Button>
            </Form>
          </Card.Body>
       </Card>
       <Card>
         <Card.Title><h3>Delete your Account</h3></Card.Title>
         <Card.Body>
                <Button variant='danger' onClick={(e) => this.handleDeleteUser(e)}>
                  Delete Account
                </Button>
        </Card.Body>
       </Card>
     </>
    )
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }
}