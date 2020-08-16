import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BrandManager from '../../modules/BrandManager';
import PotentialBrewList from './PotentialBrewList';
import BrewList from './BrewList';
import BrewhouseIngredientes from './BrewhouseIngredients';
import IngredientManager from '../../modules/IngredientManager'
const Brewhouse = (props) => {
    const [ingredients, setIngredients]=useState([])

    //All Available Brands to Brew from Database
    const [brands, setBrands]=useState([]);

    //Brands Added to Brew List
    const [brews, setBrews]=useState([]);

    //declares loading state to keep buttons from working during load time set by functions and button
    const [isLoading, setIsLoading] = useState(false);

    const [count, setCount]=useState([])

    //UserId pulled from session storage
    const sessionData = sessionStorage.getItem('credentials')
    console.log("sessionStorage.getItem", sessionData)
    const sessionId = sessionData.split(":")[4]
    const sessionUserId = sessionId.split("}")[0]
    console.log("sessionId",sessionId)
    console.log("sessionUserId",sessionUserId)

    //API call to get all brands of user
    const getBrands = () => {
        return BrandManager.getSingleUserWithStatusStyle(sessionUserId).then((allBrands) =>{
            console.log(allBrands,"allBrands")
            setBrands(allBrands)
        })
    }
    const getIngredientsbyBrand = (id) => {
        return IngredientManager.getIngredientsData(id).then((brandIngredients) =>{
            console.log(brandIngredients, "brandIngredients")
            const addIngredients = [...ingredients]
            addIngredients[id] = {...ingredients[id],...brandIngredients}
            setIngredients(addIngredients)
        })
    }
    const handleAddBrew = (evt, brand) => {

        console.log(evt,"evt")
        console.log(brand,"Add brew clicked")
        //set brand into brew list
        
        let id=brand.id
        let brewsList = [...brews]
        brewsList = [brand,...brews]
        getIngredientsbyBrand(id)
        setBrews(brewsList)
        //place first brand into counter
        let brewsCount = [...count]
        console.log(brewsCount,"brewsCount")
        let brewCounter= {
            brandId: brand.id,
            count: 1
        }
        console.log(brewCounter,"brewCounter")
        brewsCount.push(brewCounter) 
        // = [{...brewsCount,...brewCounter}]
        setCount(brewsCount)
        setIsLoading(true);

    }

    useEffect(() => {
        getBrands()
      },[])

    return (
        <Container fluid>
            <Row>
                <Col lg={3}>
                {/* Available Brands to add to BrewList */}
                    <PotentialBrewList brands={brands} count={count} setCount={setCount} handleAddBrew={handleAddBrew} {...props} />
                </Col>
                <Col lg={9}>
                {/* Brands selected to Brew from Brand List */}
                    <BrewList brews={brews} count={count} setCount={setCount} handleAddBrew={handleAddBrew} {...props} />
                    Brew Schedule area
                    ...Ideally its a calender
                </Col>
            </Row>
            <Row>
                <Col>
                <BrewhouseIngredientes {...props} count={count} setCount={setCount} ingredients={ingredients}/>
                    Brew Window grain totaler
                </Col>
            </Row>
        </Container>
    )
}

export default Brewhouse;