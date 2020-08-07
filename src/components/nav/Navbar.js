import React, { useState,useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import StatusManager from "../../modules/StatusManager"
import BrewMachine from "../../images/BrewMachine.jpg"
const Navigationbar = (props) => {
    const [statuses, setStatuses] = useState([])
    // function that resets the user session storage and invokes setHasUser to update the state
    const clearUser = () => {sessionStorage.clear()}


    const getStatuses = () => {
        StatusManager.getAll().then((allStatuses) => setStatuses(allStatuses))
    } 
    useEffect(() => {
        getStatuses()
    }, []);
    return (
        <Container>
        <Row>
        <Navbar bg="transparent" expand="xl">       
    <Navbar.Brand>
      <img
        alt=""
        src={BrewMachine}
        width= "20%"
        height="100%"
        className="d-inline-block align-center"
      />{' '}
      BrewMore - Innovating Craft Beer Tools for Everyone
    </Navbar.Brand>
 
            {/* <Navbar.Brand>BrewMore - Innovating Craft Beer Tools for Everyone</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link  href="/">Home</Nav.Link>
                    <Nav.Link href="/NewBrand"> Design a Beer</Nav.Link>
                    <NavDropdown title="Wall of Beers" id="basic-nav-dropdown" >
                        <NavDropdown.Item  href="/BrandList">All the Beers</NavDropdown.Item>
                        {statuses.map(status => (<NavDropdown.Item key={status.id} href={`/BrandList/${status.id}`}>{status.status}</NavDropdown.Item>))}
                    </NavDropdown>
            {props.hasUser ?        
            <Button 
            href="/login"
              className="nav-link" 
              onClick={clearUser}> 
              Logout </Button>
            :null }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Row>
    </Container>
    )
}

export default Navigationbar