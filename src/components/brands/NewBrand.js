import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button'
import Media from 'react-bootstrap/Media'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import "./BrewMore.css"
import { Form } from 'react-bootstrap';
const NewBrand = () => {

    
    return (
<Container fluid >
    <Row>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">BrewMore - Inovating Craft Beer Tools for Everyone</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Brew House</Nav.Link>
                    <Nav.Link href="#link">Design a Beer</Nav.Link>
                    <NavDropdown title="Wall of Beers" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">All the Beers</NavDropdown.Item>
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
    <Card>
        <Card.Body>
            <Row>
                <h2>NEW BRAND BUILDER KIT</h2>
            </Row>
            <Row>
            <Form>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Name:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="New Brand Name" />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Batch Size:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="BBL or Gallons" />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Style:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select">
                            <option>Pick One:</option>
                            <option>American I.P.A.</option>
                            <option>American Pale Ale</option>
                            <option>German Lager</option>
                            <option>Wheat Ale</option>
                            <option>English Brown Ale</option>
                        </Form.Control>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Yeast:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="Yeast Strain" />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Grain:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select">
                            <option>Choice 1</option>
                            <option>Rahr - 2 Row</option>
                            <option>Rahr - Pilsner </option>
                            <option>Briess - Crystal 30L</option>
                            <option>Crisp - Crystal 45L</option>
                            <option>Wyerman - Acid Malt</option>
                        </Form.Control>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Weight:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="Numbers Only" />
                    </InputGroup>
                </Col>

                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Grain:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select">
                            <option>Choice 2</option>
                            <option>Rahr - 2 Row</option>
                            <option>Rahr - Pilsner </option>
                            <option>Briess - Crystal 30L</option>
                            <option>Crisp - Crystal 45L</option>
                            <option>Wyerman - Acid Malt</option>
                        </Form.Control>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Weight:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="Numbers Only" />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Hops:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="Hop Schedule" />
                        <Form.Control type="text" placeholder="IBU's" />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Tasting Notes:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="textarea" placeholder="The Good, The Bad, The Ugly" />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Production Status:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select">
                            <option>Pick One:</option>
                            <option>Staple</option>
                            <option>Seasonal</option>
                            <option>Experimental</option>
                            <option>One Off</option>
                            <option>Unicorn (never actually seen it)</option>
                        </Form.Control>
                    </InputGroup>
                </Col>
             </Form>
             </Row>
             
        </Card.Body>
        <Button variant="warning">Submit New Brew</Button>{' '}

    </Card>

</Container>
   )
}

export default NewBrand