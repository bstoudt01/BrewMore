import React, { useState, useEffect }from 'react';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/CardColumns';
//import Navbar from 'react-bootstrap/Navbar';
//import Nav from 'react-bootstrap/Nav'
//import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
//import Media from 'react-bootstrap/Media'
import Card from 'react-bootstrap/Card'
//import InputGroup from 'react-bootstrap/InputGroup'
//import { Form } from 'react-bootstrap';
import IngredientManager from '../../modules/IngredientManager';
import BrandManager from '../../modules/BrandManager'

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

    //Delete All ingredient objects and brand object when button is clicked
    let i = 1;
    const handleDelete = () => {
        // for(let i=0;i<ingredients.length; i++) {
        //     IngredientManager.delete(ingredients.id).then(() => {
        //         BrandManager.delete(brandId)  
        //     })
        // }
                BrandManager.delete(brandId)  
           


    }
    useEffect(() => {
        getIngredients(brandId)
    }, []);
    return (
        <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{brand.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Style: {brand.style.style} </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Yeast: {brand.yeast}</Card.Subtitle>
                <Card.Text>Hops: {brand.hop} with {brand.ibu} IBU's</Card.Text>
                <Card.Text>Batch Size: {brand.batchSize}</Card.Text>
                <Card.Text>Rotation Status: {brand.status.status}</Card.Text>
                <Card.Text>{brand.tastingNote}</Card.Text>
                {ingredients.map(ingredient => <><Card.Text key={ingredient.id++}> Grain:{i++} {ingredient.grain.name}</Card.Text><Card.Text>Weight:{ingredient.weight}</Card.Text></>)}
                <Button variant="primary"  onClick={() => handleDelete(props.brand.id)}>Delete</Button>
            </Card.Body>
        </Card>
    )
}

export default BrandCard