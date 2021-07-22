import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Form, Button, Row, Col } from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Row >
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
        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
       </Form>
      </Col>
      <Col></Col>
    </Row>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};