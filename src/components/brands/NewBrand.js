import React, { useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button'
import Media from 'react-bootstrap/Media'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import $ from 'jquery'
import { counter } from 'react'
import { Form } from 'react-bootstrap';

import GrainManager from '../../modules/GrainManager';
import BrandManager from '../../modules/BrandManager';
  
const NewBrand = () => {

    const [grainSelects, setGrainSelects] = useState([])
    const [grainFieldsArray, setGrainFieldsArray] = useState([])
    const [usedGrains, setUsedGrains] = useState([{grainId:"", weight:""}])


    const handleAdd = () => {
        const values = [...grainFieldsArray ];
        values.push({ value: grainFieldsArray.id });
        setGrainFieldsArray(values);
      }

      const handleRemove = index => {
        const list = [...grainFieldsArray];
        list.splice(index, 1);
        setGrainFieldsArray(list);
      };
    // const handleRemove = (i) => {

    //     const newList = grainFieldsArray.filter((grainFields) => grainFields.id !== i);
    //     setGrainFieldsArray(newList);
    
    //     // const values = [...grainFieldsArray];
    //     // values.splice(i, 1);
    //     // setGrainFieldsArray(values);
    //   }

      const handleChange=(i, event)  => {
        const values = [...grainFieldsArray];
        values[i].value = event.target.value;
        setGrainFieldsArray(values);
      }
    // const addNewGrainInput = () => {
    //     //setGrainSelects(grainSelects=> grainSelects += className="mb+map");
    //   };
    // const handleChange = (e) => {
    //     if(["grainId", "weightId"].includes(e.target.className))
    //     let grains = {...grains}
    // }
    
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
                        <Form.Control type="text" placeholder="New Brand Name" />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Batch Size:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="BBL or Gallons" />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Style:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select">
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
                        <Form.Control type="text" placeholder="Yeast Strain" />
                    </InputGroup>
                </Col>

                {grainFieldsArray.map((grainFields, idx) => {
                return (
                <Col key={`${grainFields}-${idx}`}>
                    <InputGroup className="mb-3" >
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Grain:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" onChange= {e => handleChange(idx, e)}>
                        <option> Choose grain</option>
                        {grainSelects.map(grain => 
                            <option key={grain.id} value={grain.name}>{grain.name}</option>
                        )}
                        </Form.Control>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Weight:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="Numbers Only" />
                    </InputGroup>
                    <button type="button" onClick={() => handleRemove(idx)}>X</button>
                </Col>
                )
                })}

                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Grain:</InputGroup.Text>
                        </InputGroup.Prepend>
                      
                        <Form.Control as="select" className="grainId">
                        <option >Choice 1</option>
                        {grainSelects.map(item => 
                            <option key={item.id} value={item.name}>{item.name}</option>
                        )}
                        </Form.Control>
                        
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Weight</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="Numbers Only" className="weightId" />
                    </InputGroup>
                </Col>
                    
                
                <Button variant="outline-primary"  id="addGrainButton" onClick={handleAdd}>Add Another Grain</Button>

                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Grain:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select">
                            <option>Choice 2</option>
                            <option>Rahr - 2 Row</option>
                            <option>Rahr - Pilsner </option>
                            <option>Briess - Crystal 30L</option>
                            <option>Crisp - Crystal 45L</option>
                            <option>Wyerman - Acid Malt</option>
                        </Form.Control>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Weight:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="Numbers Only" />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Hops:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="Hop Schedule" />
                        <Form.Control type="text" placeholder="IBU's" />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Tasting Notes:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="textarea" placeholder="The Good, The Bad, The Ugly" />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Production Status:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select">
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
        <Button variant="warning">Submit New Brew</Button>{' '}

    </Card>

</Container>
   )
}

export default NewBrand