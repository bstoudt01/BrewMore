import React from 'react'
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { withRouter } from 'react-router-dom'
const Navigationbar = () => {
    return (
        <Row>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">BrewMore - Inovating Craft Beer Tools for Everyone</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="#BrewHouse">Brew House</Nav.Link>
                    <Nav.Link href="NewBrand"> Design a Beer</Nav.Link>
                    <NavDropdown title="Wall of Beers" id="basic-nav-dropdown">
                        <NavDropdown.Item href="BrandList">All the Beers</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Staple Beers</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Seasonal Beers</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Experimental Beers</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Dead Beers</NavDropdown.Item>
                        
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Row>
    )
}

export default withRouter(Navigationbar)