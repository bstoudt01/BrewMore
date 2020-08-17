import React from 'react';
import Container from 'react-bootstrap/Container';
import PotentialBrewCard from './PotentialBrewCard';

const PotentialBrewList = (props) => {
const brands=props.brands
const handleAddBrew=props.handleAddBrew
    return (
        <Container fluid>
            {brands.map(brand => <PotentialBrewCard key={brand.id} id={brand.id} brand={brand} handleAddBrew={handleAddBrew} /> )}
        </Container>
    )
}

export default PotentialBrewList