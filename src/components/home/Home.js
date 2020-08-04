import React from "react";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import H1 from "react-bootstrap/FormText"
import Button from "react-bootstrap/Button"
const Home = (props) => {

    return (
        <>
        <Container >
  <Row className="justify-content-md-center">
    <Col xs lg="2">
      1 of 3
    </Col>
    <Col md="auto">Variable width content</Col>
    <Col xs lg="2">
      3 of 3
    </Col>
  </Row>
  <Row>
    <Col>1 of 3</Col>
    <Col md="auto">Variable width content</Col>
    <Col xs lg="2">
      3 of 3
    </Col>
  </Row>
</Container>
       {/* <H1>Help</H1>
       <Button variant="secondary" onClick={() => props.history.push(`/Registration`) }>Register New User</Button>
       <Button variant="secondary" onClick={() => props.history.push(`/Login`) }>Current User Login</Button> */}
        </>
        )
}

export default Home