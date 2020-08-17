import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Accordion from 'react-bootstrap/Accordion';
import IngredientsAccordion from '../brands/BrandCardAccordion';
import IngredientManager from '../../modules/IngredientManager';
const PotentialBrewCard = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    
    //ingredients for this brand
    //get ingredients by brandId and then map through them and place into BrandCardAccordion.js to be grouped and sent back to accordion header
    const [ingredients, setIngredients]=useState([])
    
    const brand=props.brand;
    const brandId = brand.id
    
    const handleAddBrew=props.handleAddBrew;

    const handleClick = (handleAddBrew) => setIsLoading(true);
    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">{brand.name}</Popover.Title>
          <Popover.Content>
          <Card.Title>{brand.name}</Card.Title>
                <Card.Subtitle className="text-muted"> {brand.style.style} </Card.Subtitle>
                <Card.Text><strong>Yeast:</strong> {brand.yeast}</Card.Text>
                <Card.Text><strong>Hops: </strong> {brand.hop}</Card.Text>
                <Card.Text><strong>IBU's:</strong> {brand.ibu} </Card.Text>
                <Card.Text><strong>ABV:</strong> {brand.abv}% </Card.Text>
                <Card.Text><strong>Batch Size:</strong> {brand.batchSize}</Card.Text>
                <Card.Text><strong>Rotation Status:</strong> {brand.status.status}</Card.Text>
                <Card.Text><strong>Tasting Notes:</strong> {brand.tastingNote}</Card.Text>
                <Accordion defaultActiveKey="">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Grains & Weights
                        </Accordion.Toggle>
                        {ingredients.map(ingredient => <IngredientsAccordion key={ingredient.id} ingredient={ingredient}/>)}
                    </Card>
                </Accordion>
          </Popover.Content>
        </Popover>
      );
      //Gather all ingredients objects for this brand based on brandId, invoked in useEffect
      const getIngredients = () => {
          IngredientManager.getIngredientsData(brandId)
        .then(allIngredients => {
            setIngredients(allIngredients);
        });
    }
    useEffect(() => {
        getIngredients()
    },[brand])

    return (
        <Container fluid >
        <Card className="brewCard" >
        
        <p style={{fontSize: "16px",margin:(0,0,0,0) }} >{brand.name} </p> <a style={{fontSize: "12px"}}> {brand.style.style}</a>
       <div> <Button style={{fontSize: "12px", margin: ".1rem", width:"45%"}} disabled={isLoading} onClick={() => handleAddBrew(brand, handleClick)} >Add Brew</Button>
       <OverlayTrigger trigger="click" placement="right"   rootClose overlay={popover}>
        <Button variant="success"  style={{fontSize: "12px", margin: ".1rem", width:"45%"}}>Details</Button>
        </OverlayTrigger>
        {/* <Button style={{fontSize: "12px", width:"45%" }} onClick={BrandDetails}>Details</Button> */}
        </div>
        </Card>
</Container>
    )
}

export default PotentialBrewCard;