import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const PotentialBrewCard = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const brand=props.brand;
    const handleAddBrew=props.handleAddBrew;
    const handleClick = (handleAddBrew) => setIsLoading(true);
    
    useEffect(() => {
    },[brand])

    return (
        <Container fluid>
        <Card className="brewCard" >
        <Row>
        <Col>
        <p>{brand.name}</p>
        <p>{brand.style.style}</p>
        <Button size="sm" disabled={isLoading} onClick={() => handleAddBrew(brand, handleClick)} >Add Brew</Button>
        <Button size="sm">Details</Button>
        </Col>        
        </Row>
        </Card>
</Container>
    )
}

export default PotentialBrewCard;