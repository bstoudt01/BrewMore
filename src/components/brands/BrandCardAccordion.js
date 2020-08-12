import React from 'react';
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'



const IngredientsAccordion = (props) => {
    const ingredient= props.ingredient;
    
    return (

                        <Accordion.Collapse eventKey="0">    
                            <div key={ingredient.id} id={ingredient.id}>
                            <Card.Body variant="flush">
                                {ingredient.grain.maltster} {ingredient.grain.name}<br/> <strong>Weight:</strong> {ingredient.weight} lb's
                            </Card.Body>                            
                        </div>
                    </Accordion.Collapse>
                    
    )
}
export default IngredientsAccordion;