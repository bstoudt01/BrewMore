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
    const [brand, setBrand] = useState([])
    const [isLoading, setIsLoading] = useState(false);



    const [grainSelects, setGrainSelects] = useState([])
    const [grainFieldsArray, setGrainFieldsArray] = useState([])
    const [usedGrains, setUsedGrains] = useState([{grainId:"", weight:""}])


    const handleAdd = () => {
        const values = [...grainFieldsArray ];
        values.push({ grainId: grainFieldsArray.id, weight: grainFieldsArray.weight });
        setGrainFieldsArray(values);
      }

      const handleRemove = index => {
        const list = [...grainFieldsArray];
        list.splice(index, 1);
        setGrainFieldsArray(list);
      };
    

        //Handle Change of Inputs on Form
        //anytime you have an event all of the stuff is passed along 
        //state to change set equal to value and pass it in
        // brred and name are inside our state, so any change to those values causes setAnimal to run with stateToChange passed through
        // it watches you type into the input and holds onto that as stateToChange and then when you hit enter it subbmits those and creates a new database item.
      const handleGrainChange=(i, event)  => {
        console.log("what is evt", event)
        console.log("what is i?", i)
        const stateToChange = [...grainFieldsArray];
        console.log("stateToChange", stateToChange);
        stateToChange[i].grainId = event.target.value;
        stateToChange[i].weight = event.target.value;
        setGrainFieldsArray(stateToChange);
      }

      const handleFieldChange = evt => {
    
        console.log("what is evt", evt)
        //anytime you have an event all of the stuff is passed along 
        //state to change set equal to value and pass it in
        // brred and name are inside our state, so any change to those values causes setAnimal to run with stateToChange passed through
        // it watches you type into the input and holds onto that as stateToChange and then when you hit enter it subbmits those and creates a new database item.
      const stateToChange = { ...brand };
      console.log("stateToChange", stateToChange);
      stateToChange[evt.target.id] = evt.target.value;
      setBrand(stateToChange);
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // }

    const constructNewBrandName = event => {
        event.preventDefault();
    if (brand.name === "") {
      window.alert("Please input an brand name to continue");
    } else {
      setIsLoading(true);
      // Create the animal and redirect user to animal list
      BrandManager.post(brand)

        .then((brand) => setBrand(brand));
        console.log(setBrand)
    }
  };


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
                              <Form.Control type="text" id="name" placeholder="New Brand Name" onChange={handleFieldChange}/>
                          </InputGroup>
                      </Col>
                   </Form>
                   </Row>
                   
              </Card.Body>
              <Button variant="warning" disabled={isLoading} onClick={constructNewBrandName}>Submit Brand Name</Button>{' '}
          </Card>
      </Container>
   )
}

export default NewBrand