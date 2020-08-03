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
const EditBrand = (props) => {


    //holds brand key : values as an object, set during useEffect render and watched by handleFieldChange
    const [brand, setBrand] = useState({name: "", batchSize: "", yeast: "", hop: "", ibu: "", tastingNote: "", styleId: "", statusId: ""})
    
    //holds ingredients from database for this brand and includes expand on grainId, used to create dropdowns for ingredients from database, set during useEffect
    

    //holds all the grain types from database, used to place each grain into an option of a select element, set during useEffect
    const [grainSelects, setGrainSelects] = useState([])

    //holds Newly created grain (select) & weight (txt input) as an object, inputs set by handleAddGrainElement & watched by handleIngredients
    const [grainFieldsArray, setGrainFieldsArray] = useState([])

    //holds the ingredients objects from the database without the expand on grain types, set during useEffect and watched by handleCompleteIngredients
    const [completeIngredients, setCompleteIngredients] = useState([])
    console.log("completeIngredient state",completeIngredients)

    //holds all the styles from database as array, used to place each style into an option of a select element, set during useEffect
    const [styleSelects, setStyleSelects] = useState([])
    
    //holds all the statuses from database as array, used to place each status into an option of a select element, set during useEffect
    const [statusSelects, setStatusSelects] = useState([])
    
    //declares loading state to keep buttons from working during load time set by functions and button
    const [isLoading, setIsLoading] = useState(false);
    

    //Listens for click on "add more grain" button and creates a new instance of grain selection options and a weight input
    const handleAddGrainElements = () => {
        const values = [...grainFieldsArray ];
        values.push({brandId: brand.id});
        setGrainFieldsArray(values);
        console.log("grainFieldsArray",grainFieldsArray)
      }

      //Removes grain / weight elements created on the edit form
      //should not be using index number, I need to create a unique variable to set as a key for each object made, maybe a timestamp? or i++?
      //use filter() instead?
      const handleRemoveNewGrain = idx => {
          console.log(idx)
        const list = [...grainFieldsArray];
        list.splice(idx, 1);
        setGrainFieldsArray(list);
        refreshForm()
      };
      
      //Removes grain/weight objects from the ingredients table 
      const handleRemoveEditGrain = (id) => {
      IngredientManager.delete(id).then(() => refreshForm() )};

   
    //Handle New Inputs for grain and weight contained in GrainFieldsArray
    const handleIngredients = evt => {
        const value = evt.target.value;
        const idx= evt.target.id
        const splitIdx=idx.split("-")[1]
        const splitName=idx.split("-")[0]
        const singleIngredient = {
            [splitName]: value
        };
        console.log("whats singleIngredient",singleIngredient)
        const add = [...grainFieldsArray ];
            add[splitIdx]={...add[splitIdx],...singleIngredient};
            console.log("whats add",add)
        setGrainFieldsArray(add)
    }

    //Handle ingredients Table objects that were placed in Inputs for grain and weight in GrainFieldsArray
    const handleCompleteIngredients = (evt, idx) => {
        console.log("handleIngredient event value",evt.target.value)
        const completeArray = [...completeIngredients]
        const singleObject ={ ...completeIngredients[idx]}
        const stateToChange = { ...singleObject };
        console.log("first stateToChange completeIng", stateToChange);
        stateToChange[evt.target.id] = evt.target.value;
        console.log("comp. ingrd. statetochange",stateToChange)
        completeArray.splice([idx], 1, stateToChange)

        setCompleteIngredients(completeArray);
    }

    //Handle Change of Inputs for Brand (...all EXCEPT GRAIN AND WEIGHT)
    const handleBrandFieldChange = evt => {
        console.log("what is the evt", evt)
        //anytime you have an event all of the stuff is passed along 
        //state to change set equal to value and pass it in
        //  brand is  inside our state, so any change to those values causes setBrand to run with stateToChange passed through
        // it watches you type into the input and holds onto that as stateToChange within brand useState.
        const stateToChange = { ...brand };
        console.log("stateToChange brand", stateToChange);
        stateToChange[evt.target.id] = evt.target.value;
        setBrand(stateToChange);
    
};
  
    //updates object in brand table from all element except grain and weight
    //updates object(s) in ingredients table and post's new ingredient objects created
    const editBrand = (event, props ) => {
        event.preventDefault();
        setIsLoading(true);
        if (brand.name === "") {
            window.alert("Please input an brand name to continue");
        } else {
            const editedBrand = {
                id: brand.id,
                name: brand.name,
                yeast: brand.yeast,
                hop: brand.hop,
                ibu: brand.ibu,
                tastingNote: brand.tastingNote,
                batchSize: brand.batchSize,
                styleId: brand.styleId,
                statusId: brand.statusId
            }
            // const editedIngredient = {
            //     id: completeIngredient.id,
            //     brandId: completeIngredient.brandId,
            //     grainId: completeIngredient.grainId,
            //     weight: completeIngredient.weight
            // }
            console.log("edited Brand b4put", editedBrand)
            BrandManager.update(editedBrand)
            .then((response) => { 
                console.log("edited Brand after put", response);
                completeIngredients.map(editedIngredient => IngredientManager.update(editedIngredient))
            }).then(() => { 
                grainFieldsArray.map(singleIngredientRelationship => IngredientManager.post(singleIngredientRelationship))
//have not redirected from page yet, nor have i reset the input fields(if i need to...)
                })
                .then(() => {
                    props.props.history.push(`/brandlist`)
                   })
        }
    }
    const refreshForm = () => {
        BrandManager.getSingleWithStyleStatus(props.match.params.brandId).then((brand) =>{
            IngredientManager.get(brand.id)
            .then(IngredientsByBrand => {
                    GrainManager.getAll()
                    .then(grains => {
                        StyleManager.getAll()
                        .then(styles => {
                            StatusManager.getAll()
                            .then(statuses => {
                                setGrainSelects(grains)
                                setStatusSelects(statuses)
                                setStyleSelects(styles)
                                setBrand(brand)
                                
                                setCompleteIngredients(IngredientsByBrand)
                            
                        })
                    })
                })
            })
        })

    }
    
    useEffect(() => {
        
        refreshForm()
    },[])

    return (
<Container fluid >
    <Card>
        <Card.Body>
            <Row>
                <h2>Make Adjustments</h2>
            </Row>
            <Row>
            <Form>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Name:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" id="name" placeholder="New Brand Name"  value={brand.name} onChange={handleBrandFieldChange}/>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Batch Size:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" id="batchSize" placeholder="BBL or Gallons" value={brand.batchSize} onChange={handleBrandFieldChange}/>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Style:</InputGroup.Text>
                        </InputGroup.Prepend>
                            <Form.Control as="select" id="brand.styleId" value={brand.styleId} onChange={handleBrandFieldChange}>
                        <option> Choose style</option>
                        {styleSelects.map(style => 
                            <option key={style.id} id={style.id} value={style.id} >{style.style}</option>
                        )}
                        </Form.Control>
                    </InputGroup>
                </Col>
                
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Yeast:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" id="yeast" placeholder="Yeast Strain" value={brand.yeast} onChange={handleBrandFieldChange}/>
                    </InputGroup>
                </Col>

                    {/* GRAIN INPUTS BROUGHT IN FROM DATABASE FOR EDIT */}
                    {completeIngredients.map((knownIngredient, idx) => {
                return (
                <Col key={idx}>
                    <InputGroup className="mb-3" >
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Grain:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control key={knownIngredient.id} as="select" id="grainId" name="grainId" defaultValue={knownIngredient.grainId} onChange={ e => handleCompleteIngredients(e,idx)}>
                        <option> Choose grain</option>
                        {grainSelects.map(grain => { return (<option key={grain.id} value={grain.id} id={grain.id} name="grainId">{grain.maltster} - {grain.name}</option>)})}
                        </Form.Control>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Weight:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" name="weight" placeholder="Numbers Only" id="weight"   defaultValue={knownIngredient.weight} onChange={e => handleCompleteIngredients(e,idx)}/>
                    </InputGroup>
                    <button type="button" onClick={() => handleRemoveEditGrain(knownIngredient.id)}>X</button>
                </Col>
                )
                })}

                {/* NEW GRAIN INPUTS */}
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
                    <button type="button" onClick={() => handleRemoveNewGrain(grainFields.id)}>X</button>
                </Col>
                )
                })}
                <Button variant="outline-primary"  id="addGrainButton" onClick={handleAddGrainElements}>Add Another Grain</Button>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Hops:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" id="hop" placeholder="Hop Schedule" value={brand.hop} onChange={handleBrandFieldChange} />
                        <Form.Control type="text" id="ibu" placeholder="IBU's" value={brand.ibu} onChange={handleBrandFieldChange} />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Tasting Notes:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="textarea" id="tastingNote" placeholder="The Good, The Bad, The Ugly" value={brand.tastingNote} onChange={handleBrandFieldChange}/>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Production Status:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" id="statusId" value={brand.statusId} onChange={handleBrandFieldChange}>
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
        <Button variant="warning" disabled={isLoading} onClick={editBrand}>Submit New Brew</Button>{' '}

    </Card>

</Container>
   )
}

export default EditBrand