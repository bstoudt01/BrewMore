import React, { useState, useEffect }from 'react';
import Col from 'react-bootstrap/CardColumns';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
import { Container } from 'react-bootstrap';

const IngredientCard = (props) => {
    const ingredientCard=props.ingredientCard;
    const usedGrains = props.usedGrains;
    const setUsedGrains= props.setUsedGrains;
    const count=props.count;
    console.log(ingredientCard.brandId, "ingredient from ingcard brandId")
    console.log(count, " count from ingCard")


    console.log(count.brandId, "brandId count from ingCard")

    // const newGrain= () => {
    //     usedGrains.map(grain => {
    //         if (ingredientCard.id !== grain.id) {
    //             return ( 
    //             <Container fluid>
          
    //                 <Row>
    //                 <p>{ingredientCard.grain.name} Weight: {ingredientCard.weight}</p>
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
    // updateUsedGrains.push(ingredientCard.grainId)
    // setUsedGrains(updateUsedGrains)
    // console.log(usedGrains, "usedGrains from ingcard")      
    // useEffect(() => {
    //     updateUsedGrains()
    // },[])

    //fetches count for brandId
    let ingredientCount = ""
    count.map(singleBrandCount => {
        if (ingredientCard.brandId === singleBrandCount.brandId) {
             ingredientCount = singleBrandCount.count
            }
    })

    
    //     let theseGrains = [...usedGrains]
    //     theseGrains.push(ingredientCard.grainId)
        
    // useEffect(() => {
    //     setUsedGrains(theseGrains)
    // },[])

    console.log(ingredientCount, "ingredientCount")
    return (
        <Container fluid>
          
            <Row>
            <p>{ingredientCard.grain.name} Weight: {ingredientCard.weight * ingredientCount}</p>
            </Row>
        </Container>
        
    )
}

export default IngredientCard