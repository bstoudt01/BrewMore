import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BrewCard from './BrewCard';

const BrewList = (props) => {
const brews=props.brews
const setCount = props.setCount
const count = props.count
    return (
        <Container fluid>
            {brews.map((brew, idx) => <BrewCard key={idx} id={brew.id} idx={idx} brew={brew} count={count} setCount={setCount} /> )}
        </Container>
    )
}

export default BrewList