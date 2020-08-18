import React, { useState, useEffect }from 'react';
import Col from 'react-bootstrap/CardColumns';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
import { Container } from 'react-bootstrap';

const IngredientCard = (props) => {
    const ingredientCard=props.ingredientCard;
    const usedGrains = props.usedGrains;
    const updateUsedGrains= props.updateUsedGrains;
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
        console.log(singleBrandCount,"singleBrandCount")
        if (ingredientCard.brandId === singleBrandCount.brandId) {
           
                ingredientCount = singleBrandCount.count
             console.log(ingredientCount,"ingredientCount")
             }
    })
    
    
    //     let theseGrains = [...usedGrains]
    //     theseGrains.push(ingredientCard.grainId)
        
    useEffect(() => {
        updateUsedGrains(ingredientCard.grainId)
    },[])

    console.log(ingredientCount, "ingredientCount outta func")
    return (
        <Container fluid>
          
            <Row >
            <Col className="d-flex justify-content-start flex-fill">
            <p>{ingredientCard.grain.maltster} - {ingredientCard.grain.name} @ {ingredientCard.weight * ingredientCount} lbs</p>
            </Col>
            <Col className="d-flex justify-content-end flex-fill">
            <p>{ingredientCard.grain.maltster} - {ingredientCard.grain.name} @ {Math.round(((ingredientCard.weight * ingredientCount / 55) + Number.EPSILON) * 100) / 100} bags  </p>
            </Col>
            </Row>
        </Container>
        
    )
}

export default IngredientCard