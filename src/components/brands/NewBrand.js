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
  
const NewBrand = () => {


    //holds brand key : values as an object, set by handleFieldChange
    const [brand, setBrand] = useState({name: ""})

    //declares loading state to keep buttons from working during load time set by functions and button
    const [isLoading, setIsLoading] = useState(false);

    //holds all the grains from database as array, used to place each grain into an option of a select element, set during useEffect
    const [grainSelects, setGrainSelects] = useState([])

    //holds an array of grain (select) & weight (txt input) objects, inputsset by handleAddGrainElement & controlled by handleIngredients
    const [grainFieldsArray, setGrainFieldsArray] = useState([])

    const [completeIngredient, setCompleteIngredient] = useState([])

    //Listens for click on "add more grain" button and creates a new instance of grain selection options and a weight input
    const handleAddGrainElements = () => {
        const values = [...grainFieldsArray ];
        values.push({});
        //values.push({});

        setGrainFieldsArray(values);
      }

      //Removes grain / weight instance from brand form
      //NOT WORKING, still only deletes the last item in the array
      const handleRemove = idx => {
          console.log(idx)
        const list = [...grainFieldsArray];
        list.splice(idx, 1);
        setGrainFieldsArray(list);
      };
      //ANOTHER APPROACH TO DELETE
    // const handleRemove = (i) => {

    //     const newList = grainFieldsArray.filter((grainFields) => grainFields.id !== i);
    //     setGrainFieldsArray(newList);
    
    //     // const values = [...grainFieldsArray];
    //     // values.splice(i, 1);
    //     // setGrainFieldsArray(values);
    //   }
    
 //Handle USer Inputs on Form FOR GRAIN AND WEIGHT ONLY sets into state to hold 1 object....
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
    //Handle Change of Inputs on Form EXCEPT GRAIN AND WEIGHT
    const handleFieldChange = evt => {
        console.log("what is the evt", evt)
        //anytime you have an event all of the stuff is passed along 
        //state to change set equal to value and pass it in
        // brred and name are inside our state, so any change to those values causes setAnimal to run with stateToChange passed through
        // it watches you type into the input and holds onto that as stateToChange and then when you hit enter it subbmits those and creates a new database item.
        const stateToChange = { ...brand };
        console.log("stateToChange brand", stateToChange);
        stateToChange[evt.target.id] = evt.target.value;
        setBrand(stateToChange);
    };

    const constructNewBrand = (event) => {
        event.preventDefault();
        if (brand.name === "") {
            window.alert("Please input an brand name to continue");
        } else {
            setIsLoading(true);
            // Create the brand and redirect user to brand list
            BrandManager.post(brand)

            .then((brand) => { 
                console.log(brand)
                console.log(parseInt(brand.id))
                // const completeIngredient = {
                //     brandId: parseInt(brand.id),
                //     grainId: grainFieldsArray.grainId,
                //     weight: grainFieldsArray.weight
                // }

                
                //
                let completeIngredient = [...grainFieldsArray]
                const BI = { brandId:`${brand.id}` }
                let i= 0
                for(i=0;i<grainFieldsArray.length; i++) {
                    grainFieldsArray[i].completeIngredient = {BI}
                }
                setCompleteIngredient(grainFieldsArray)
                console.log("ci",completeIngredient)
                console.log("gf",grainFieldsArray)

            })
        }
    }
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // }

    useEffect(() => {
        GrainManager.getAll().then(grains => {
            setGrainSelects(grains)
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
                        <Form.Control as="select" id="style" onChange={handleFieldChange}>
                            <option>Pick One:</option>
                            <option>American I.P.A.</option>
                            <option>American Pale Ale</option>
                            <option>German Lager</option>
                            <option>Wheat Ale</option>
                            <option>English Brown Ale</option>
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
                        <Form.Control as="select" id={`grainId-${idx}`} name="grainId" onChange={handleIngredients}>
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
                        <Form.Control as="select" id="status" onChange={handleFieldChange}>
                            <option>Pick One:</option>
                            <option>Staple</option>
                            <option>Seasonal</option>
                            <option>Experimental</option>
                            <option>One Off</option>
                            <option>Unicorn (never actually seen it)</option>
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