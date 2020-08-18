import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import BrandManager from '../../modules/BrandManager';
import BrandCard from './BrandCard';
import BrandCardIsOpen from './BrandCardIsOpen'

// Filtered based on brand status and redirected based on pathway name

const BrandListFiltered = (props) => {
    //all brands from user
    const [brands, setBrands]=useState([]);
    //grain ingredients view
    const [activeId, setActiveId] = useState('null');

    //set statusId equal to the number assoscated with the pathname
    const pathname = props.location.pathname
    const statusId=pathname.split("/")[2]
    console.log("statusId",statusId)
    
    //get userId from session storage
    const sessionData = sessionStorage.getItem('credentials')
    console.log("sessionStorage.getItem", sessionData)
    const sessionId = sessionData.split(":")[4]
    const sessionUserId = sessionId.split("}")[0]
    console.log("sessionId",sessionId)
    console.log("sessionUserId",sessionUserId)

    //get all brands by user
    const getBrands = () => {
        return BrandManager.getSingleUserByStatusIdWithStyle(sessionUserId,statusId).then((filteredBrands) =>{
            console.log(filteredBrands)
            setBrands(filteredBrands)      
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
                    {brands.map(brand => <BrandCardIsOpen key={brand.id} id={brand.id} brand={brand}  getBrands={getBrands}{...props} statusId={parseInt(brand.statusId)} styleId={parseInt(brand.styleId)} />)}
                </Row>
            </ListGroup>}
        </Container>
        
    )
}

export default BrandListFiltered