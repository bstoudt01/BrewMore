import React, { useState } from "react";
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"
import UserManager from "../../modules/UserManager";


const RegistrationForm = (props) => {
  const [validated, setValidated] = useState(false);
  const [userDetails, setUserDetails] = useState([])
console.log(validated)

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    UserManager.post(userDetails).then(() => {props.history.push("/")})
  }
  const handleFieldChange = (evt) => {
    const stateToChange = { ...userDetails };
    stateToChange[evt.target.id] = evt.target.value;
    setUserDetails(stateToChange);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={handleFieldChange}
            type="email"
            //id="email"
            required autoFocus="" 
            placeholder="Brewery@Brewey.com"
          />
          <Form.Control.Feedback type="invalid">Uh oh! Looks like there is an issue with your email. Please input a correct email.</Form.Control.Feedback>
        </Form.Group>
      
        <Form.Group as={Col} md="4" controlId="username">
          <Form.Label>Username</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              onChange={handleFieldChange}
              type="text"
              //id="username"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="inputPassword6">Password</Form.Label>
          <Form.Control
            onChange={handleFieldChange}
            type="password"
            className="mx-sm-3"
            id="password"
            aria-describedby="passwordHelpInline"
          />
          <Form.Control.Feedback type="invalid">
              Please choose a password.
            </Form.Control.Feedback>
          <Form.Text id="passwordHelpBlock" muted>
            Must be 8-20 characters long.
          </Form.Text>
          
        </Form.Group>
      </Form.Row>
      <Form.Group>
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}

export default RegistrationForm