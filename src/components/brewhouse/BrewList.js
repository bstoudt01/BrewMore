import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import BrewCard from './BrewCard';
import { ListGroup } from 'react-bootstrap';

const BrewList = (props) => {
const brews=props.brews
const setCount = props.setCount
const count = props.count
const brewUI = () => {
    console.log(brews,"brews")
if (brews && brews.length) {
    return (
    <ListGroup >
                <Row md={2} xl={3}>
                    {brews.map((brew, idx) => <BrewCard lg={2} xl={3} key={idx} id={brew.id} idx={idx} brew={brew} count={count} setCount={setCount} /> )}
                </Row>
            </ListGroup>
    )
} else {
    return (
        <Container fluid>
        <Row ><h1>Welcome to the Brewhouse</h1></Row>
        <Row ><p>Please pick from your availabe brands</p></Row>
        <Row ><p>Add and Remove brews as needed</p></Row>
        <Row ><p>The required grain will print to the bottom of your screen,<br/> The weight of grain in bags, are available on the right ...1 bag=55lbs</p></Row>
        </Container>
            )
}
}
    return (
        <Container fluid>
            {brewUI()}
        </Container>
    )
}

export default BrewList