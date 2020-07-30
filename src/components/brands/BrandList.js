import React, { useState, useEffect } from 'react';
import BrandCard from './BrandCard';
import ListGroup from 'react-bootstrap/ListGroup';

import BrandManager from '../../modules/BrandManager'
import IngredientManager from '../../modules/IngredientManager';
//import IngredientManager from '../../modules/IngredientManager';
//import GrainManager from '../../modules/GrainManager';

const BrandList = (props) => {
    const [brands, setBrands]=useState([]);
    

    const getBrands = () => {
        return BrandManager.getWithStyleStatus().then((allBrands) =>{
            console.log(allBrands)
            setBrands(allBrands)
          
        })
    }
    // const getIngredients = () => {
    //     return IngredientManager.getAll().then((allIngredients) =>{
    //         setIngredients(allIngredients)
    //     })
    // }
    // const getGrains = () => {
    //     return GrainManager.getAll().then((allGrains) =>{
    //         setGrains(allGrains)
    //     })
    // }


    useEffect(() => {
        getBrands()
    },[])
    return (
        
        <ListGroup horizontal>
        {brands.map(brand => <BrandCard key={brand.id} brand={brand} {...props} statusId={parseInt(brand.statusId)} styleId={parseInt(brand.styleId)} />)}
        </ListGroup>
        
    )
}

export default BrandList