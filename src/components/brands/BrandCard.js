import React, { useState, useEffect }from 'react';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/CardColumns';
//import Navbar from 'react-bootstrap/Navbar';
//import Nav from 'react-bootstrap/Nav'
//import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
//import Media from 'react-bootstrap/Media'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
//import InputGroup from 'react-bootstrap/InputGroup'
//import { Form } from 'react-bootstrap';
import IngredientManager from '../../modules/IngredientManager';
import BrandManager from '../../modules/BrandManager'
import IngredientsAccordion from './BrandCardAccordion'
import { ToggleButton } from 'react-bootstrap';
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
    // let rows=[];
    // for(let i=0; i<ingredients.length; i++) {
    //     let ingredient=ingredients[i];
    //     rows.push(<Card.Body eventKey={brand.id} key={ingredient.id}>Grain: {ingredient.grain.name} Weight: {ingredient.weight}</Card.Body>)
    //     console.log("rows",rows)
    //}
//     let toggle=""
//     let ingredientsToggle = () => {
//         props.isToggled===false ? 
//             toggle="1" : toggle="0";
       
//    }
//    console.log("toggle",toggle)
    useEffect(() => {
        getIngredients()
    }, [BrandCard]);
    return (
        <Col>
        <Card style={{ width: '22rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{brand.name}</Card.Title>
                <Card.Subtitle className="text-muted"> {brand.style.style} </Card.Subtitle>
                <Card.Text><strong>Yeast:</strong> {brand.yeast}</Card.Text>
                {/* <Card.Subtitle className="mb-2 text-muted"><strong>Yeast:</strong> {brand.yeast}</Card.Subtitle> */}
                <Card.Text><strong>Hops: </strong> {brand.hop}</Card.Text>
                <Card.Text><strong>IBU's</strong> {brand.ibu} </Card.Text>
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
                {/* {ingredients.map(ingredient => <div key={`Ingredient-${ingredient.id}`}><Card.Text > {ingredient.grain.name}</Card.Text><Card.Text>Weight:{ingredient.weight}</Card.Text></div>)} */}
                <Button variant="primary"  onClick={() => handleDelete(props.brand.id)} >Delete</Button>
                <Button variant="secondary" onClick={() => props.history.push(`/brands/${brand.id}/edit`) }>Edit</Button>
            </Card.Body>
        </Card>
        </Col>
    )
}

export default BrandCard