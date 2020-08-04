import React from "react";

import H1 from "react-bootstrap/FormText"
import Button from "react-bootstrap/Button"
const Home = (props) => {

    return (
        <>
       <H1>Help</H1>
       <Button variant="secondary" onClick={() => props.history.push(`/Registration`) }>Register New User</Button>
       <Button variant="secondary" onClick={() => props.history.push(`/Login`) }>Current User Login</Button>
        </>
        )
}

export default Home