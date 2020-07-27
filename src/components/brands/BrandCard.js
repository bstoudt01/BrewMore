import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/CardColumns';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Media from 'react-bootstrap/Media'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import { Form } from 'react-bootstrap';
const BrandCard = (props) => {
    const brand= props.brand;

    return (
        <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{brand.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Style: {brand.style.style} </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Yeast: {brand.yeast}</Card.Subtitle>
                <Card.Text>Hops: {brand.hop} with {brand.ibu} IBU's</Card.Text>
                <Card.Text>Batch Size: {brand.batchSize}</Card.Text>
                <Card.Text>Rotation Status: {brand.status.status}</Card.Text>
                <Card.Text>{brand.tastingNote}</Card.Text>
                
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default BrandCard