import React, { useState, useEffect }from 'react';
import Col from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Image  from 'react-bootstrap/Image';
import BrandManager from '../../modules/BrandManager'
import IngredientManager from '../../modules/IngredientManager';
import IngredientsAccordion from './BrandCardAccordion'
import BeerThumbnail from '../../images/BeerThumbnail100.png'

//Accordion Open, defaultActiveKey="0"
    //Displays all ingredients on cards
const BrandCard = (props) => {
    const [ingredients, setIngredients]=useState([])
    const brand= props.brand;
    

    //Gather all ingredients objects for this brand based on brandId, invoked in useEffect
    const brandId = brand.id
    const getIngredients = () => {
        IngredientManager.getIngredientsData(brandId)
        .then(allIngredients => {
            setIngredients(allIngredients);
        });
    }

    //Delete All ingredient objects and brand object when button is clicked and then re-render brand list
    const handleDelete = () => {
        BrandManager.delete(brandId).then(()=> {
            props.getBrands()
        })
    }

    useEffect(() => {
        getIngredients()
    }, []);
    return (
        <Col>
        <Card className="brewCard" style={{ width: '22rem' }}>
        <Image variant="top" className="thumbnail" src={BeerThumbnail} roundedCircle/>
            <Card.Body>
                <Card.Title>{brand.name}</Card.Title>
                <Card.Subtitle > {brand.style.style} </Card.Subtitle>
                <Card.Text><strong>Yeast:</strong> {brand.yeast}</Card.Text>
                {/* <Card.Subtitle className="mb-2 text-muted"><strong>Yeast:</strong> {brand.yeast}</Card.Subtitle> */}
                <Card.Text><strong>Hops: </strong> {brand.hop}</Card.Text>
                <Card.Text><strong>IBU's:</strong> {brand.ibu} </Card.Text>
                <Card.Text><strong>ABV:</strong> {brand.abv}% </Card.Text>
                <Card.Text><strong>Batch Size:</strong> {brand.batchSize} bbl</Card.Text>
                <Card.Text><strong>Rotation Status:</strong> {brand.status.status}</Card.Text>
                <Card.Text><strong>Tasting Notes:</strong> {brand.tastingNote}</Card.Text>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Grains & Weights
                        </Accordion.Toggle>
                        {ingredients.map(ingredient => <IngredientsAccordion key={ingredient.id} ingredient={ingredient}/>)}
                    </Card>
                </Accordion>
                <Button variant="primary"  onClick={() => handleDelete(props.brand.id)} >Delete</Button>
                <Button variant="secondary" onClick={() => props.history.push(`/brands/${brand.id}/edit`) }>Edit</Button>
            </Card.Body>
        </Card>
        </Col>
    )
}

export default BrandCard