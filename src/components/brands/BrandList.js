import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import BrandManager from '../../modules/BrandManager'
import BrandCard from './BrandCard';
import BrandCardIsOpen from './BrandCardIsOpen'

const BrandList = (props) => {
    //All Brands of current User
    const [brands, setBrands]=useState([]);
    //Grain List View Toggle state
    const [activeId, setActiveId] = useState('null');

    //UserId pulled from session storage
    const sessionData = sessionStorage.getItem('credentials')
    console.log("sessionStorage.getItem", sessionData)
    const sessionId = sessionData.split(":")[4]
    const sessionUserId = sessionId.split("}")[0]
    console.log("sessionId",sessionId)
    console.log("sessionUserId",sessionUserId)

    //API call to get all brands of user including style and status information
    const getBrands = () => {
        return BrandManager.getSingleUserWithStatusStyle(sessionUserId).then((allBrands) =>{
            console.log(allBrands)
            setBrands(allBrands)
        })
    }
 
    //Grain View toggle function for Grain View Button
    const toggleActive = (id) => {
        if (activeId === id) {
        setActiveId(null);
        } else {
        setActiveId(id);
        }
    }
    console.log("activeId",activeId)

    useEffect(() => {
      getBrands()
    },[])

    return (
        // conditional that displays brand card with grain ingredients accordion open & display card with accordion closed
        <Container>
            <Button variant="primary" onClick={() => toggleActive('0')}>Toogle Grain View</Button>
            {activeId !== "0" ?
            <ListGroup  >
                <Row md={2} xl={3} >
                    {brands.map(brand => <BrandCard key={brand.id} id={brand.id} brand={brand} getBrands={getBrands}{...props} statusId={parseInt(brand.statusId)} styleId={parseInt(brand.styleId)} />)}
                </Row>
            </ListGroup>: <ListGroup  >
                <Row md={2} xl={3} >
                    {brands.map(brand => <BrandCardIsOpen key={brand.id} id={brand.id} brand={brand} getBrands={getBrands}{...props} statusId={parseInt(brand.statusId)} styleId={parseInt(brand.styleId)} />)}
                </Row>
            </ListGroup>}
        </Container>
    )
}

export default BrandList