import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import desktopImage from '../../images/HomeBackgroundCheers.jpg'
import mobileImage from '../../images/HomeBackground3.jpg'
import "../BrewMore.css"
import Card from 'react-bootstrap/Card'

//Initial View with Login/Logout Buttons
const Home = (props) => {
    //changes background image based on window with of 650+ and 649-
    //useWindowWith declared below
    const imageUrl = useWindowWidth() >= 650 ? desktopImage : mobileImage;
    // function for Logout button that resets the user session storage and invokes setHasUser to update the state
            // logout button not redirecting yet..
    const clearUser = () => {
        sessionStorage.clear() 
        props.history.push(`/Login`)};
    //is user loged in?
    const hasUser = props.hasUser
    console.log(hasUser,"hasUser on home")
   
    return (
        <>
            <Container className="App homebg" style={{backgroundImage: `url(${imageUrl})` }} fluid>
                <Row>

                {/* Registration Button */}
                    {!hasUser ? <Col className="App-content" >
                        <h2 style={{textAlign:"center"}}>New to BrewMore?</h2>
                        <Button variant="secondary"  id="registrationButton" onClick={() => props.history.push(`/Registration`) }>Register New User</Button>
                    </Col> : null }
                    {/* Login Button */}
                    {!hasUser ? 
                    <Col className="App-content" >
                        <h2 style={{textAlign:"center"}}>Returning Brewer?</h2>
                        <Button variant="primary" id="loginButton" size="lg" onClick={() => props.history.push(`/Login`) }>Login</Button>
                    </Col> : 
                    <Col className="App-content " >
                        <h2 style={{textAlign:"center"}}>Come on Back Now!</h2>
                        <Button variant="primary" id="loginButton" size="lg" onClick={clearUser}>Logout</Button>
                    </Col>
                    }
                </Row>
                {/* Welcome Message */}
                {!hasUser ?
                <Row lg={1} >
                    <h1 style={{textAlign:"center"}}>Welcome to BrewMore</h1>
                </Row> :  <Card className="brewCard" ><h2 style={{textAlign:"center"}}>Dont forget to Checkout our New <br/> <b>Brewhouse Feature!</b></h2><h3 style={{textAlign:"center"}}>See all the grain you need for your upcoming brews Instantly!</h3> <Card.Link style={{textAlign:"center"}} className="text-black-50" href="#"> Contact us: BrewMore@BrewMore.com</Card.Link></Card>} 
            </Container>
        </>
        )
}

const useWindowWidth = () => {
    //State of innerWidth of window watched to determine if mobile background (>650px screen width) is needed
    const [windowWidth, setWindowWidth ] = useState(window.innerWidth);

    useEffect(() => {
    
        const handleWindowResize = () => {
        //if innerWith chnages setWindowWidth
          setWindowWidth(window.innerWidth);
        };
        //once the setWindowWith is declared then we add an event listener to "window" waiting for 'resize' to occure an assigning that value to handleWindowResize which setsWindowWith state that contains the window.innerWidth element.
        //once that occures the event listener is removed.. and then if the innerWidth changes the state resets and useEffect runs again..
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    },[]);
    
    return windowWidth;
};
export default Home