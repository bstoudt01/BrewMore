import React, { useState, useEffect } from 'react';
import BrandCard from './BrandCard';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import BrandManager from '../../modules/BrandManager'
import Button from 'react-bootstrap/Button'
//import './BrandList.css'
import BrandCardIsOpen from './BrandCardIsOpen'
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

    // const [isToggled, setToggled] = useState(false);
    // const toggleTrueFalse = () => setToggled(!isToggled);
    // console.log(isToggled)

 
  const [activeId, setActiveId] = useState('0');
  function toggleActive(id) {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  }
  console.log("activeId",activeId)

    //const timestamp = Date.now() + Math.random()
//console.log(timestamp)
    useEffect(() => {
      getBrands()
      toggleActive(activeId)
    },[BrandList])
    return (
        <Container>
            <Button variant="primary" onClick={() => toggleActive('0')}>Toogle Grain View</Button>
            {activeId !== "0" ?
            <ListGroup  >
                <Row md={2} xl={3} >
                    {brands.map(brand => <BrandCard key={brand.id} id={brand.id} brand={brand} activeId="0" getBrands={getBrands}{...props} statusId={parseInt(brand.statusId)} styleId={parseInt(brand.styleId)} />)}
                </Row>
            </ListGroup>: <ListGroup  >
                <Row md={2} xl={3} >
                    {brands.map(brand => <BrandCardIsOpen key={brand.id} id={brand.id} brand={brand} activeId="null" getBrands={getBrands}{...props} statusId={parseInt(brand.statusId)} styleId={parseInt(brand.styleId)} />)}
                </Row>
            </ListGroup>}
        </Container>
    )
}

export default BrandList