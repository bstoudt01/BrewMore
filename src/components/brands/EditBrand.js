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


    //holds brand key : values as an object, set by handleFieldChange
    const [brand, setBrand] = useState({name: "", batchSize: "", yeast: "", hop: "", ibu: "", tastingNote: "", styleId: "", statusId: ""})
    
    //holds brand ingredients previously created
    const [knownIngredients, setKnownIngredients]=useState([])
    console.log("knownIngredient state",knownIngredients)
    //holds all the grains from database as array, used to place each grain into an option of a select element, set during useEffect
    const [grainSelects, setGrainSelects] = useState([])

    //holds an array of grain (select) & weight (txt input) objects, inputsset by handleAddGrainElement & controlled by handleIngredients
    const [grainFieldsArray, setGrainFieldsArray] = useState([])

    //holds the ingredients objects from the database
    const [completeIngredient, setCompleteIngredient] = useState([])
    console.log("completeIngredient state",completeIngredient)
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
    console.log("whats singleIngredient",singleIngredient)
    const add = [...grainFieldsArray ];
        add[splitIdx]={...add[splitIdx],...singleIngredient};
        console.log("whats add",add)
    setGrainFieldsArray(add)
}

const handleKnownIngredients = (evt, idx) => {
    console.log("handleIngredient event value",evt.target.value)
    const completeArray = [...completeIngredient]
    const singleObject ={ ...completeIngredient[idx]}
    const stateToChange = { ...singleObject };
    console.log("first stateToChange completeIng", stateToChange);
    stateToChange[evt.target.id] = parseInt(evt.target.value);
    console.log("comp. ingrd. statetochange",stateToChange)
    completeArray.splice([idx], 1, stateToChange)

    setCompleteIngredient(completeArray);
 

}
    //Handle Change of Inputs on Form EXCEPT GRAIN AND WEIGHT ONLY
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
    //}
};
  
    //updates object in brand table from all element except grain and weight
    //updates object(s) in ingredients table after the response is returned from brand.post using the brand.id , grain, and weight
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
            const editedIngredient = {
                id: completeIngredient.id,
                brandId: completeIngredient.brandId,
                grainId: completeIngredient.grainId,
                weight: completeIngredient.weight
            }
            console.log("edited Brand b4put", editedBrand)
            BrandManager.update(editedBrand)
            .then((response) => { 
                console.log("edited Brand after put", response);
                // for( let i=0;i<completeIngredient.length; i++) {
                //     editedIngredient = {
                //         id: completeIngredient.id,
                //         brandId: completeIngredient.brandId,
                //         grainId: completeIngredient.grainId,
                //         weight: completeIngredient.weight
                //     }
                //     console.log(editedIngredient)
                //     IngredientManager.update(editedIngredient).then(() => {

                //     })
                // }
                // setCompleteIngredient(grainFieldsArray)
                // console.log("ci",completeIngredient)
                // console.log("gf",grainFieldsArray)
                if (completeIngredient !== "") {completeIngredient.map(editedIngredient => IngredientManager.update(editedIngredient))}
                // completeIngredient.map(editedIngredient =>
                //    editedIngredient = {
                //         id: props.match.params.completeIngredientId,
                //         brandId: props.match.params.brandId,
                //         grainId: completeIngredient.grainId,
                //         weight: completeIngredient.weight
                //     },
                //      IngredientManager.update(editedIngredient))
                // .then((editedIngredient) => {
                //     console.log("edited ingred put",editedIngredient)
        
//                 grainFieldsArray.map(singleIngredientRelationship => IngredientManager.post(singleIngredientRelationship))
// //have not redirected from page yet, nor have i reset the input fields(if i need to...)
                // })
        })
        }
    }
    
    useEffect(() => {
        BrandManager.getSingleWithStyleStatus(props.match.params.brandId).then((brand) =>{
            IngredientManager.get(brand.id)
            .then(IngredientsByBrand => {
                IngredientManager.getIngredientsData(brand.id)
                .then(ingredientsWithGrain => {
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
                                setKnownIngredients(ingredientsWithGrain)
                                setCompleteIngredient(IngredientsByBrand)
                            })
                        })
                    })
                })
            })
        })
    },[props.match.params.brandId])

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
                    {knownIngredients.map((grainFields, idx) => {
                return (
                <Col key={`knownIngredient:${idx}`}>
                    <InputGroup className="mb-3" >
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-newBrandForm">Grain:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" id="grainId" name="knownGrainId" defaultValue={grainFields.grainId}  onChange={ e => handleKnownIngredients(e,idx)}>
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
                        <Form.Control type="text" name="weight" placeholder="Numbers Only" id="weight"  key={idx} defaultValue={grainFields.weight} onChange={e => handleKnownIngredients(e,idx)}/>
                    </InputGroup>
                    <button type="button" onClick={() => handleRemove(idx)}>X</button>
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
                        <Form.Control as="select" id={`grainId-${idx}`} name="grainId" key={idx} onChange={handleIngredients}>
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