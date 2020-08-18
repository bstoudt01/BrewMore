import React from 'react';
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'


// handles indiviual ingredients that are being mapped over for each brand
//returns sinlge instance to accordion allowing the accordion to handle the map function.
// could not map directly into jsx, required a seperate js file to handle the action
const IngredientsAccordion = (props) => {
    const ingredient= props.ingredient;
    
    return (

                        <Accordion.Collapse eventKey="0">    
                            <div key={ingredient.id} id={ingredient.id}>
                            <Card.Body variant="flush" className="overflow-auto">
                                {ingredient.grain.maltster} {ingredient.grain.name}<br/> <strong>Weight:</strong> {ingredient.weight} lb's
                            </Card.Body>                            
                        </div>
                    </Accordion.Collapse>
                    
    )
}
export default IngredientsAccordion;