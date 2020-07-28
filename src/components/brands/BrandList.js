import React, { useState, useEffect } from 'react';
import BrandCard from './BrandCard';
import BrandManager from '../../modules/BrandManager'
import ListGroup from 'react-bootstrap/ListGroup';


const BrandList = (props) => {
    const [brands, setBrands] = useState([]);

    const getBrands = () => {
        return BrandManager.getWithStyleStatus().then(allBrands =>{
            setBrands(allBrands)
        })
    }

    useEffect(() => {
        getBrands()
    },[])
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