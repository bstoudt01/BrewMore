import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import BrewCard from './BrewCard';
import { ListGroup } from 'react-bootstrap';

const BrewList = (props) => {
const brews=props.brews
const setCount = props.setCount
const count = props.count
    return (
        <Container fluid>
            <ListGroup >
                <Row md={2} xl={2}>
                    {brews.map((brew, idx) => <BrewCard lg={2} xl={3} key={idx} id={brew.id} idx={idx} brew={brew} count={count} setCount={setCount} /> )}
                </Row>
            </ListGroup>
        </Container>
    )
}

export default BrewList