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

            // const grainId= (props) =>
            // ingredients.map(element => {
            //     console.log(element, "grainId element")
            //     const previousGrains=[...usedGrains]
            //     previousGrains.push(element)
            //     setUsedGrains(previousGrains)
            // }); 
            // ingredients.grainId;
            // console.log(grainId, "grainId")

        const getCount =() => {count.map(singleBrewCount => {
            console.log(singleBrewCount, "single brewCount")
            const brewId= singleBrewCount.brandId
            const brewCount=singleBrewCount.count
            console.log(brewId, "single brewId")
            console.log(brewCount, "single brewCount")
        })
        }

        

        
            // const getIngredients = () => {
            //     ingredients.map((filteredIngredients) => {
            //         console.log(filteredIngredients, "filteredIngredients") 
            //         let updatedGrains=[...grainsInBrews]
            //         console.log(updatedGrains,"updatedGrainsAsGrainsInBrews")
            //         //updatedGrains.push(filteredIngredients)
            //         updatedGrains=[...updatedGrains,filteredIngredients]
            //         console.log(updatedGrains,"updatedGrains after push")
            //         //array of multiple brand objects containing the ingredient objects
            //         //THIS IS NOT UPDATING CORRECTLY, LAST CONSOLE LOG SHOWS IT EMPTY
            //         setGrainsInBrews(updatedGrains)
            //         console.log(grainsInBrews, "grainsInBrews")   
            //     })
        
            // }

    const getGrainsInBrews = () => {ingredients.map(brandGrains => {
        console.log(brandGrains, "brandGrains")
        if (brandGrains !== undefined) {
        const singleIngredient=Object.values(brandGrains)
        console.log(singleIngredient,"singleIngredient")
        const brandGrainsArray=[...grainsArray]
        singleIngredient.forEach(element => {
            brandGrainsArray.push(element)
            //brandGrainsArray=[...grainsArray,element]
        });
        console.log(brandGrainsArray,"brandGrainsArray")
        setGrainsArray(brandGrainsArray)
        console.log(grainsArray,"grainsArray after function")
    }
    })  
    }
    useEffect(() => {
        // getIngredients()
        getGrainsInBrews()
        getCount()
    }, [ingredients]);

    return (
        <Container>
          <Row>
               <h1>Total Grain Required</h1> 
            </Row>
            
            {grainsArray.map(ingredientCard =>  {
               return (
                    <IngredientCard key={ingredientCard.id} id={ingredientCard.id} ingredientCard={ingredientCard} count={count} usedGrains={usedGrains} setUsedGrains={setUsedGrains} {...props} />
            )})}
            <Row><p>Beer ingredeints go here</p></Row>
        </Container>
    )
}

export default BrewhouseIngredients