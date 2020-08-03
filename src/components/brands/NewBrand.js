import React, { useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import { Form } from 'react-bootstrap';
import GrainManager from '../../modules/GrainManager';
import BrandManager from '../../modules/BrandManager';
import IngredientManager from '../../modules/IngredientManager';
import StatusManager from '../../modules/StatusManager';
import StyleManager from '../../modules/StyleManager';
  
//Creates a new brand to be stored in the database (brand table & ingredients table)
const NewBrand = () => {


    const sessionData = sessionStorage.getItem('credentials')
    console.log("sessionStorage.getItem", sessionData)
    const sessionId = sessionData.split(":")[1]
    const sessionUserId = sessionId.split(",")[0]
    console.log("sessionId",sessionId)
    console.log("sessionUserId",sessionUserId)
    //holds brand key : values as an object, set by handleFieldChange
    const [brand, setBrand] = useState({name: "", userId:sessionUserId })

    //declares loading state to keep buttons from working during load time set by functions and button
    const [isLoading, setIsLoading] = useState(false);

    //holds all the grains from database as array, used to place each grain into an option of a select element, set during useEffect
    const [grainSelects, setGrainSelects] = useState([])

    //holds an array of grain (select) & weight (txt input) objects, inputsset by handleAddGrainElement & controlled by handleIngredients
    const [grainFieldsArray, setGrainFieldsArray] = useState([])

    //holds the ingredients objects after the brandId has been added, set & used inside createNewBrand
    const [completeIngredient, setCompleteIngredient] = useState([])

    //holds all the styles from database as array, used to place each style into an option of a select element, set during useEffect
    const [styleSelects, setStyleSelects] = useState([])
    
    //holds all the statuses from database as array, used to place each status into an option of a select element, set during useEffect
    const [statusSelects, setStatusSelects] = useState([])


    //Listens for click on "add more grain" button and creates a new instance of grain selection options and a weight input
    const handleAddGrainElements = () => {
        const values = [...grainFieldsArray ];
        values.push({});
        setGrainFieldsArray(values);
      }

      //Removes grain / weight instance from brand form
      //should not be using index number, I need to create a unique variable to set as a key for each object made, maybe a timestamp? or i++?
      const handleRemove = idx => {
          console.log(idx)
        const list = [...grainFieldsArray];
        list.splice(idx, 1);
        setGrainFieldsArray(list);
      };
   
 //Handle User Inputs on Form FOR GRAIN AND WEIGHT ONLY sets into state to hold 1 object....
 const handleIngredients = evt => {
    const value = evt.target.value;
    const idx= evt.target.id
    const splitIdx=idx.split("-")[1]
    const splitName=idx.split("-")[0]
    const singleIngredient = {
        [splitName]: value
    };
    console.log(singleIngredient)
    const add = [...grainFieldsArray ];
        add[splitIdx]={...add[splitIdx],...singleIngredient};
        console.log(add)
    setGrainFieldsArray(add)
}

    //Handle Change of Inputs on Form EXCEPT GRAIN AND WEIGHT ONLY
    const handleFieldChange = evt => {
        console.log("what is the evt", evt)
        //anytime you have an event all of the stuff is passed along 
        //state to change set equal to value and pass it in
        //  brand is  inside our state, so any change to those values causes setBrand to run with stateToChange passed through
        // it watches you type into the input and holds onto that as stateToChange within brand useState.
        const stateToChange = { ...brand };
        console.log("stateToChange brand", stateToChange);
        stateToChange[evt.target.id] = evt.target.value;
        // if (Number(stateToChange) === stateToChange ) {
        //     Number(stateToChange)
        //     setBrand(stateToChange)
        // } else {
        setBrand(stateToChange);
    //}
};

    //creates new object in brand table from all element except grain and weight
    //creates new object(s) in ingredients table after the response is returned from brand.post using the brand.id , grain, and weight
    const constructNewBrand = (event) => {
        event.preventDefault();
        if (brand.name === "") {
            window.alert("Please input an brand name to continue");
        } else {
            setIsLoading(true);
            // Create the brand and then grabs the id from the response 
            //and adds that to each object as they are redeclared within another set state
            BrandManager.post(brand)
            .then((brand) => { 
                console.log(brand)
                let completeIngredient = [...grainFieldsArray]
               // const BI = { brandId:`${brand.id}` }
                let i= 0
                for(i=0;i<grainFieldsArray.length; i++) {
                    grainFieldsArray[i].brandId = brand.id
                }
                setCompleteIngredient(grainFieldsArray)
                console.log("ci",completeIngredient)
                console.log("gf",grainFieldsArray)
                completeIngredient.map(singleIngredientRelationship => IngredientManager.post(singleIngredientRelationship))
//have not redirected from page yet, nor have i reset the input fields(if i need to...)
            }).then(() => setBrand(""))
        }
    }
    
    useEffect(() => {
        GrainManager.getAll().then(grains => {
            setGrainSelects(grains)
        })
        StyleManager.getAll().then(styles => {
            setStyleSelects(styles)
        })
        StatusManager.getAll().then(statuses => {
            setStatusSelects(statuses)
        })
    },[])

    return (
<Container fluid >
    <Card>
        <Card.Body>
            <Row>
                <h2>NEW BRAND FROM THE BREW MEISTER</h2>
            </Row>
            <Row>
            <Form>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Name:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" id="name" placeholder="New Brand Name"  onChange={handleFieldChange}/>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Batch Size:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" id="batchSize" placeholder="BBL or Gallons" onChange={handleFieldChange}/>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Style:</InputGroup.Text>
                        </InputGroup.Prepend>
                            <Form.Control as="select" id="styleId" onChange={handleFieldChange}>
                        <option> Choose style</option>
                        {styleSelects.map(style => 
                            <option key={style.id} value={style.id} id={style.id}>{style.style}</option>
                        )}
                        </Form.Control>
                    </InputGroup>
                </Col>
                
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Yeast:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" id="yeast" placeholder="Yeast Strain" onChange={handleFieldChange}/>
                    </InputGroup>
                </Col>

                {grainFieldsArray.map((grainFields, idx) => {
                return (
                <Col key={idx}>
                    <InputGroup className="mb-3" >
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Grain:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" key={idx} id={`grainId-${idx}`} name="grainId" onChange={handleIngredients}>
                        <option> Choose grain</option>
                        {grainSelects.map(grain => 
                            <option key={grain.id} value={grain.id} id={grain.id}>{grain.maltster} - {grain.name}</option>
                        )}
                        </Form.Control>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Weight:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" name="weight" placeholder="Numbers Only" id={`weight-${idx}`}  key={idx} onChange={handleIngredients}/>
                    </InputGroup>
                    <button type="button" onClick={() => handleRemove(idx)}>X</button>
                </Col>
                )
                })}
                <Button variant="outline-primary"  id="addGrainButton" onClick={handleAddGrainElements}>Add Another Grain</Button>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Hops:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" id="hop" placeholder="Hop Schedule" onChange={handleFieldChange} />
                        <Form.Control type="text" id="ibu" placeholder="IBU's" onChange={handleFieldChange} />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Tasting Notes:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="textarea" id="tastingNote" placeholder="The Good, The Bad, The Ugly" onChange={handleFieldChange}/>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Production Status:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" id="statusId" onChange={handleFieldChange}>
                            <option> Choose status</option>
                            {statusSelects.map(status => 
                                <option key={status.id} value={status.id} id={status.id}>{status.status}</option>
                            )}
                        </Form.Control>
                    </InputGroup>
                </Col>
             </Form>
             </Row>
             
        </Card.Body>
        <Button variant="warning" disabled={isLoading} onClick={constructNewBrand}>Submit New Brew</Button>{' '}

    </Card>

</Container>
   )
}

export default NewBrand