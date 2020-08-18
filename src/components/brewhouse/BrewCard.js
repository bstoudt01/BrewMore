import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import IngredientManager from '../../modules/IngredientManager';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const BrewCard = (props) => {
     // Instances of brews by Id
    // const [count, setCount]=useState(1)
    const [ingredients, setIngredients]=useState([])
     const [allIngredients, setAllIngredients]=useState([])
     const brew=props.brew;
     const setCount = props.setCount
     const count = props.count
     //API call to get all Ingredients by brand
    const getIngredientsbyBrand = () => {
        return IngredientManager.getIngredientsData(brew.id).then((brandIngredients) =>{
            console.log(brandIngredients, "brandIngredients")
            const addIngredients = [...ingredients]
            addIngredients[brew.id] = {...ingredients[brew.id],...brandIngredients}
            setIngredients(addIngredients)
        })
    }

    // Add one Additional brew to counter of single brand
    const handleAddBrewCount= (id, idx) => {
    
        let newCount=[...count]
        console.log(idx, "idx")
        console.log(id, "id")
        console.log(newCount, "newCount ")

        newCount.map((anotherCount, index) => {
            console.log(anotherCount, "anotherCount")
         if (anotherCount.brandId === id ) {
            console.log(index, "anotherCount index")

        
        //brand id on brewCard
        let brandId = anotherCount.brandId
        console.log("brandId[idx]", brandId)
        //brew count from state plus 1 more
        let brandCount = anotherCount.count +1
        console.log("brandCount", brandCount)
        console.log(newCount[id], "newCountIDX")
        // new object for Count useState to replace the object at the index number of this card
        const newBrandCount={
            brandId: brandId,
            count: brandCount
        }
        const countIndex=
//        newCount[id]=newBrandCount
        newCount.splice([index],1,newBrandCount)
        setCount(newCount)
        } 
    })
}
    //Remove single instance of a brew from counter of a single brand
    const handleRemoveBrewCount= (id,idx) => {
    
        let newCount=[...count]
        console.log(idx, "idx")
        console.log(id, "id")
        console.log(newCount, "newCount ")

        newCount.map((anotherCount, index) => {
            console.log(anotherCount, "anotherCount")
         if (anotherCount.brandId === id ) {
            console.log(index, "anotherCount index")

        let brandId = anotherCount.brandId
        console.log("brandId", brandId)
        //brewcount from state minus 1 less
        let brandCount = anotherCount.count - 1
        console.log("brandCount", brandCount)
        console.log(newCount[id], "newCountIDX")
     
                const newBrandCount={
                    brandId: brandId,
                    count: brandCount
                }
                // newCount[idx]=newBrandCount
                // setCount(newCount)
                newCount.splice([index],1,newBrandCount)
                setCount(newCount)
                } 
            })
      
//    //place first brand into counter
//    let brewsCount = [...count]
//    console.log(brewsCount,"brewsCount")
//    let brewCounter= {
//        brandId: brand.id,
//        count: 1
//    }
//    console.log(brewCounter,"brewCounter")
//    brewsCount.push(brewCounter) 
//    // = [{...brewsCount,...brewCounter}]
//    setCount(brewsCount)        
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">{brew.name}</Popover.Title>
          <Popover.Content>
         
            And here's some <strong>amazing</strong> details....well, soon to come
          </Popover.Content>
        </Popover>
      );
console.log(brew,"brew for id")
useEffect(() => {
    getIngredientsbyBrand()
}, []);
    return (
        <Container key={props.idx} fluid>
        <Card className="brewCard" style={{ width: '12rem'}}>
        <Row>
        <Col>
        <p className="d-flex justify-content-center">{brew.name}</p>
        <div className="d-flex justify-content-around">
        <Button size="sm" onClick={() =>handleAddBrewCount(brew.id, props.idx)}>+ Brew</Button>
        {/* <OverlayTrigger trigger="click" placement="right" rootClose overlay={popover}>
            <Button variant="success"  style={{fontSize: "12px", margin: ".1rem", width:"45%"}}>Details</Button>
        </OverlayTrigger> */}
        <Button size="sm" onClick={() =>handleRemoveBrewCount(brew.id, props.idx)}>- Brew</Button>
        {/* <p>you have of {count[props.idx].count} this brew</p> */}
        </div>
        </Col>        
        </Row>
        </Card>
</Container>
    )
}

export default BrewCard;