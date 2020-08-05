import React, { useState, useEffect } from 'react';
import BrandCard from './BrandCard';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import BrandManager from '../../modules/BrandManager';

const BrandListFiltered = (props) => {
    const [brands, setBrands]=useState([]);
    console.log("props.location.pathname",props.location.pathname)
    
        const pathname = props.location.pathname
        const statusId=pathname.split("/")[2]
        console.log("statusId",statusId)

        const sessionData = sessionStorage.getItem('credentials')
        console.log("sessionStorage.getItem", sessionData)
        const sessionId = sessionData.split(":")[1]
        const sessionUserId = sessionId.split(",")[0]
        console.log("sessionId",sessionId)
        console.log("sessionUserId",sessionUserId)
    
    const getBrands = () => {
        
        return BrandManager.getSingleUserByStatusIdWithStyle(sessionUserId,statusId).then((filteredBrands) =>{
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
        <Container>
            <ListGroup  >
                <Row md={2} xl={3} >
                    {brands.map(brand => <BrandCard key={brand.id} brand={brand} {...props} statusId={parseInt(brand.statusId)} styleId={parseInt(brand.styleId)} />)}
                </Row>
            </ListGroup>
        </Container>
        
    )
}

export default BrandListFiltered