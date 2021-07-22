import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Row, Col } from 'react-bootstrap';
import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate);
    props.onRegistration(username);
  };

  return (
    <Form>
      <Form.Group>
       <Form.Label className="username"> Username:
         <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
       </Form.Label>
      </Form.Group>
      <Form.Group>
       <Form.Label className="password"> Password:
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
       </Form.Label>
      </Form.Group>
      <Form.Group>
       <Form.Label className="email">E-mail:
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
       </Form.Label>
      </Form.Group>
      <Form.Group>
       <Form.Label className="birthdate">Birth date:
        <Form.Control type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)}/>
       </Form.Label>
      </Form.Group>
      <Button className="registerBtn" type="submit" onClick={handleSubmit}>
        Register
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func.isRequired,
}