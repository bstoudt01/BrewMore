import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const BrewhouseIngredients= (props) => {
    const [usedGrains, setUsedGrains] = useState([])
    const ingredients = props.ingredients;
    console.log(ingredients,"ingredeints")

    const grainId= (props) =>
    ingredients.map(element => {
        console.log(element, "grainId element")
        const previousGrains=[...usedGrains]
        previousGrains.push(element)
        setUsedGrains(previousGrains)
    }); 
    // ingredients.grainId;
    // console.log(grainId, "grainId")
    
    const grain=ingredients[6]
      console.log(grain, "grain in brewIngred")

    useEffect(() => {
        
    }, []);
    return (
        <Container>

            <Row><p>Beer ingredeints go here</p></Row>
        </Container>
    )
}

export default BrewhouseIngredients