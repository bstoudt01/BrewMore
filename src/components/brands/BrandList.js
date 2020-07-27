import React, { useState, useEffect } from 'react';
import BrandCard from './BrandCard';
import APIManager from '../../modules/APIManager'
import ListGroup from 'react-bootstrap/ListGroup';


const BrandList = (props) => {
    const [brands, setBrands] = useState([]);

    const getBrands = () => {
        return APIManager.getWithStyleStatus().then(allBrands =>{
            setBrands(allBrands)
        })
    }

    useEffect(() => {
        getBrands()
    })
    return (
        <>
        <ListGroup horizontal>
        <>
        {brands.map(brand => <BrandCard key={brand.id} brand={brand} {...props} />)}
        </>
        </ListGroup>
        </>
    )
}

export default BrandList