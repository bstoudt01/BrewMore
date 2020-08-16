import React, { useState,useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import StatusManager from "../../modules/StatusManager"
import Logo from "../../images/CheersMugs.png"
const Navigationbar = (props) => {
    //Brand Statuses from the database for use in navbar dropdown
    const [statuses, setStatuses] = useState([]);
    // function for Logout button that resets the user session storage and invokes setHasUser to update the state
    const clearUser = () => {sessionStorage.clear()};
    //API Call to get all from statuses table
    const getStatuses = () => {
        StatusManager.getAll().then((allStatuses) => setStatuses(allStatuses))
    }; 
    
    useEffect(() => {
        getStatuses()
    }, []);
    return (
        <Container>
            <Row>
                <Navbar bg="transparent" expand="xl">       
                {/* Logo and Brand w. Title  */}
                    <Navbar.Brand >
                        <img
                        style={{textAlign:"left"}}
                            alt=""
                            src={Logo}
                            width= "80rem"
                            height="100%"
                            className="d-inline-block align-center"
                        />{' '}
                        BrewMore - Innovating Craft Beer Tools for Everyone
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link  href="/">Home</Nav.Link>
                            <Nav.Link href="/NewBrand"> Design a Beer</Nav.Link>
                            <Nav.Link  href="/brewhouse">Brewhouse</Nav.Link>
                            {/* Dropdown box for brand status types uses statusId to reference for route */}
                            <NavDropdown title="Wall of Beers" id="basic-nav-dropdown" >
                                <NavDropdown.Item  href="/BrandList">All the Beers</NavDropdown.Item>
                                    {statuses.map(status => (<NavDropdown.Item key={status.id} href={`/BrandList/${status.id}`}>{status.status}</NavDropdown.Item>))}
                            </NavDropdown>
                            {props.hasUser ?        
                                <Button 
                                href="/"
                                variant="secondary" 
                                onClick={clearUser}> 
                                Logout </Button>
                                :
                                <Button 
                                href="/Login"
                                variant="secondary" 
                                onClick={() => props.history.push(`/Login`) }> 
                                Login </Button> }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Row>
        </Container>
    )
}

export default Navigationbar