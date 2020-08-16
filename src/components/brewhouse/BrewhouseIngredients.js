import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import IngredientCard from './IngredientCard';
const BrewhouseIngredients= (props) => {
    const [usedGrains, setUsedGrains] = useState([])
    const [grainsArray, setGrainsArray] = useState([])
    const [grainsInBrews, setGrainsInBrews] = useState([])
    const ingredients = props.ingredients;
    const count = props.count
    const setCount = props.setCount
    console.log(ingredients,"ingredeints")

    
    // ingredients.map((singleBrand) => {
    //     console.log(singleBrand, "singleIngredient") 
    //     const updatedGrains=[...usedGrains]
    //     updatedGrains.push(singleBrand)
    //     setUsedGrains(updatedGrains)
    //     console.log(usedGrains, "usedGrains")   
    // })
        // let singleBrandId=singleBrand.brandId
        // console.log(singleBrandId, "singleBrandId")
        // if(singleBrandId === brewId ) {

            // }
        count.map(singleBrewCount => {
            console.log(singleBrewCount, "single brewCount")
            const brewId= singleBrewCount.brandId
            const brewCount=singleBrewCount.count
            console.log(brewId, "single brewId")
            console.log(brewCount, "single brewCount")
            console.log(usedGrains, "usedGrains from countmap")
        })

        
    // const grainId= (props) =>
    // ingredients.map(element => {
    //     console.log(element, "grainId element")
    //     const previousGrains=[...usedGrains]
    //     previousGrains.push(element)
    //     setUsedGrains(previousGrains)
    // }); 
    // ingredients.grainId;
    // console.log(grainId, "grainId")



    useEffect(() => {
        ingredients.map((filteredIngredients) => {
            console.log(filteredIngredients, "singleBrand") 
            const updatedGrains=[...grainsInBrews]
            updatedGrains.push(filteredIngredients)
            //array of multiple brand objects containing the ingredient objects
            setGrainsInBrews(updatedGrains)
            console.log(grainsInBrews, "grainsInBrews")   
            grainsInBrews.map(brandGrains => {
                // for (const single of brandGrains) {
                //     const singleIngredient=single.grainId
                    
                //     console.log(singleIngredient, "singleIngredient")
                // }
                console.log(brandGrains, "brandGrains")
                const singleIngredient=Object.values(brandGrains)
                console.log(singleIngredient,"singleIngredient")
                const brandGrainsArray=[...grainsArray]
                singleIngredient.forEach(element => {
                    
                    brandGrainsArray.push(element)
                });
                console.log(brandGrainsArray,"brandGrainsArray")
                setGrainsArray(brandGrainsArray)
            })  
        })
    }, [ingredients]);

    return (
        <Container>
          <Row>
               <h1>Total Grain Required</h1> 
            </Row>
            
            {grainsArray.map(ingredient =>  {
                console.log(usedGrains,"usedGrains from grainsArrayMap")
               return (
                    <IngredientCard key={ingredient.id} id={ingredient.id} ingredient={ingredient} count={count} usedGrains={usedGrains} setUsedGrains={setUsedGrains} {...props} />
            )})}
            <Row><p>Beer ingredeints go here</p></Row>
        </Container>
    )
}

export default BrewhouseIngredients