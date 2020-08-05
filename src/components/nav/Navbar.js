import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import StatusManager from "../../modules/StatusManager"
const Navigationbar = (props) => {
    const [statuses, setStatuses] = useState([])
    // function that resets the user session storage and invokes setHasUser to update the state
    const clearUser = () => {sessionStorage.clear()}

   StatusManager.getAll().then((allStatuses) => setStatuses(allStatuses))
    

    return (
        <Row>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>BrewMore - Innovating Craft Beer Tools for Everyone</Navbar.Brand>
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
    )
}

export default Navigationbar