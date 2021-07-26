import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { Form, Button, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    axios.post('https://myflix-lounge.herokuapp.com/login', {
      Name: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
    
  };

  return (
    <>
      <Col></Col>
      <Col>
       <Form>
        <Form.Group>
        <Form.Label className="username">
          Username: 
          <Form.Control type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Label>
        </Form.Group>
        <Form.Group>
        <Form.Label className="password">
          Password:
          <Form.Control type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Label>
        </Form.Group>
        <Row>
           <Col><Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button></Col>
           <Col xs={12} md={8}><p>Not an user? register <Link to={"/register"}>here</Link></p></Col>
        </Row>
       </Form>
      </Col>
      <Col></Col>
    </>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};