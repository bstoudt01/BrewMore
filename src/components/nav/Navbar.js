import React from 'react'
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
//import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Navigationbar = (props) => {
      // function that resets the user session storage and invokes setHasUser to update the state
  const clearUser = () => {
    sessionStorage.clear();
  }
    return (
        <Row>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>BrewMore - Inovating Craft Beer Tools for Everyone</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link  href="/">Home</Nav.Link>
                    <Nav.Link href="/NewBrand"> Design a Beer</Nav.Link>
                    <NavDropdown title="Wall of Beers" id="basic-nav-dropdown" >
                        <NavDropdown.Item  href="/BrandList">All the Beers</NavDropdown.Item>
                        <NavDropdown.Item  href="/BrandList/1" >Staple Beers</NavDropdown.Item>
                        <NavDropdown.Item  href="/BrandList/2">Seasonal Beers</NavDropdown.Item>
                        <NavDropdown.Item  href="/BrandList/3">Experimental Beers</NavDropdown.Item>
                        <NavDropdown.Item  href="/BrandList/4">Dead Beers</NavDropdown.Item>
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
    )
}

export default Navigationbar