import React, { useState, useEffect } from 'react';
import BrandCard from './BrandCard';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import BrandManager from '../../modules/BrandManager'
import Button from 'react-bootstrap/Button'
//import './BrandList.css'
const BrandList = (props) => {
    const [brands, setBrands]=useState([]);
    const [isToggled, setToggled] = useState("0");
    
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
    const toggleTrueFalse = () => setToggled(!isToggled);
    console.log(isToggled)
  //  let ingredientsToggle=""
 
    //const timestamp = Date.now() + Math.random()
//console.log(timestamp)
    useEffect(() => {
      getBrands()
    },[isToggled])
    return (
        <Container>
            <Button variant="primary" onClick={toggleTrueFalse}>Toogle Grain View</Button>
            <ListGroup  >
                <Row md={2} xl={3} >
                    {brands.map(brand => <BrandCard key={brand.id} id={brand.id} brand={brand} isToggled={isToggled} getBrands={getBrands}{...props} statusId={parseInt(brand.statusId)} styleId={parseInt(brand.styleId)} />)}
                </Row>
            </ListGroup>
        </Container>
    )
}

export default BrandList