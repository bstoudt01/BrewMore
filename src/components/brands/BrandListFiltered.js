import React, { useState, useEffect } from 'react';
import BrandCard from './BrandCard';
import ListGroup from 'react-bootstrap/ListGroup';

import BrandManager from '../../modules/BrandManager'

const BrandListFiltered = (props) => {
    const [brands, setBrands]=useState([]);
    console.log("props.location.pathname",props.location.pathname)
    
        const pathname = props.location.pathname
        const statusId=pathname.split("/")[2]
        console.log("statusId",statusId)
    
    const getBrands = () => {
        
        return BrandManager.getByStatusIdWithStyle(statusId).then((filteredBrands) =>{
            console.log(filteredBrands)
            setBrands(filteredBrands)
          
        })
    }

    //const timestamp = Date.now() + Math.random()
//console.log(timestamp)
    useEffect(() => {
        getBrands()
    },[])
    return (
        
        <ListGroup horizontal>
        {brands.map(brand => <BrandCard key={brand.id} brand={brand} {...props} statusId={parseInt(brand.statusId)} styleId={parseInt(brand.styleId)} />)}
        </ListGroup>
        
    )
}

export default BrandListFiltered