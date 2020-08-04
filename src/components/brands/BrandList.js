import React, { useState, useEffect } from 'react';
import BrandCard from './BrandCard';
import ListGroup from 'react-bootstrap/ListGroup';

import BrandManager from '../../modules/BrandManager'

const BrandList = (props) => {
    const [brands, setBrands]=useState([]);

            const sessionData = sessionStorage.getItem('credentials')
            console.log("sessionStorage.getItem", sessionData)
            const sessionId = sessionData.split(":")[1]
            const sessionUserId = sessionId.split(",")[0]
            console.log("sessionId",sessionId)
            console.log("sessionUserId",sessionUserId)

    const getBrands = () => {
        
        return BrandManager.getSingleUserWithStatusStyle(sessionUserId).then((allBrands) =>{
            console.log(allBrands)
            setBrands(allBrands)
          
        })
    }

    //const timestamp = Date.now() + Math.random()
//console.log(timestamp)
    useEffect(() => {
        getBrands()
    },[])
    return (
        
        <ListGroup horizontal>
        {brands.map(brand => <BrandCard key={brand.id} id={brand.id} brand={brand} getBrands={getBrands}{...props} statusId={parseInt(brand.statusId)} styleId={parseInt(brand.styleId)} />)}
        </ListGroup>
        
    )
}

export default BrandList