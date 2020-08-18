import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
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
    //trying to get all grainId's used in brews into 1 array
    // to map over so i can make a new grain card or add weight to an existing card... and not duplicate grainIds on the dom
    let handleUsedGrains=[]
    const updateUsedGrains = (id) => { 
        if (usedGrains.id !== id && id === Number) {
            let grainId=id
        console.log(id,"id")
        console.log(grainId,"grainId")
       const tempUsedGrains = [...usedGrains]
       console.log(usedGrains, "usedGrains from brewhousing")
        handleUsedGrains = [...tempUsedGrains,...grainId]
      // tempUsedGrains.push(id)
    }
}

useEffect(() => {
    setUsedGrains(handleUsedGrains)
        // getIngredients()
        getGrainsInBrews()
        getCount()
    }, [ingredients]);

    return (
        <Container>
        <Card >
            <Card.Header className="text-center">Grain Totals</Card.Header>
            <Card.Body>
                {/* const id=ingredientCard.grainId
                const getUsedGrains=[...usedGrains,id]
                console.log(ingredientCard, "ingredientCard")
                setUsedGrains(getUsedGrains) */}
            
            {grainsArray.map(ingredientCard =>  {
                
                    let i = ""
                    for (i=0; i<ingredients.length; i++) {
                        console.log(ingredients,"ingredients frominside i")
                        let ingredient=ingredients[i]
                    console.log(ingredient,"ingredient includes?",ingredientCard.grainId)
                    if (ingredient !== undefined && ingredient[i].grainId.includes(ingredientCard.grainId)) {
                        
                
               return (
                    <p>what?</p>            )
            } else {
                  
               return (
                    <IngredientCard key={ingredientCard.id} id={ingredientCard.id} ingredientCard={ingredientCard} count={count} usedGrains={usedGrains} updateUsedGrains={updateUsedGrains} {...props} />
            )
            }
        }        })}
                {/* console.log(usedGrains, "usedGrains")
                const theseGrains = ingredientCard.grainId
                    console.log(theseGrains,"theseGrains") */}

                   {/* theseGrains.push(ingredientCard.grainId) */}
                {/* theseGrains=[...theseGrains,ingredientCard.grainId] */}
                    {/* console.log(theseGrains,"theseGrains after push")
                    setUsedGrains(theseGrains)  */}

                {/* usedGrains.map(usedGrain => {
                    console.log(usedGrain, "usedGrain")
                if (usedGrain !== ingredientCard.grainId ) {
                    var theseGrains = [...usedGrains]
                    console.log(theseGrains,"theseGrains")
                    theseGrains.push(ingredientCard.grainId)
                //theseGrains=[...theseGrains,ingredientCard.grainId]
                 } 
                 }) */}
            </Card.Body>
            </Card>
        </Container>
    )
}

export default BrewhouseIngredients