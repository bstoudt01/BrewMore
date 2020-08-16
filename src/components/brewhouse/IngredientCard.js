import React, { useState, useEffect }from 'react';
import Col from 'react-bootstrap/CardColumns';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
import { Container } from 'react-bootstrap';

const IngredientCard = (props) => {
    const ingredient=props.ingredient;
    const usedGrains = props.usedGrains;
    const setUsedGrains= props.setUsedGrains;
    const count=props.count;
    console.log(ingredient.brandId, "ingredient from ingcard brandId")
    console.log(count, " count from ingCard")


    console.log(count.brandId, "brandId count from ingCard")

    // const newGrain= () => {
    //     usedGrains.map(grain => {
    //         if (ingredient.id !== grain.id) {
    //             return ( 
    //             <Container fluid>
          
    //                 <Row>
    //                 <p>{ingredient.grain.name} Weight: {ingredient.weight}</p>
    //                 </Row>
    //             </Container>
    //         )
    //         } else {
    //             return (
    //                 <p>already have this one</p>
    //             )
    //         }
    //     })
    // }
    // const updateUsedGrains = [...usedGrains]
    // updateUsedGrains.push(ingredient.grainId)
    // setUsedGrains(updateUsedGrains)
    // console.log(usedGrains, "usedGrains from ingcard")      
    // useEffect(() => {
    //     updateUsedGrains()
    // },[])
    
    //fetches count for brandId
    let ingredientCount = ""
    count.map(singleBrandCount => {
        if (ingredient.brandId === singleBrandCount.brandId) {
             ingredientCount = singleBrandCount.count
            }
    })
    console.log(ingredientCount, "ingredientCount")
    return (
        <Container fluid>
          
            <Row>
            <p>{ingredient.grain.name} Weight: {ingredient.weight * ingredientCount}</p>
            </Row>
        </Container>
        
    )
}

export default IngredientCard