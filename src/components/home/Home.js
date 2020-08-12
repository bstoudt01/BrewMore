import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import desktopImage from '../../images/HomeBackgroundCheers.jpg'
import mobileImage from '../../images/HomeBackground3.jpg'
import "../BrewMore.css"
const Home = (props) => {
  const imageUrl = useWindowWidth() >= 650 ? desktopImage : mobileImage;
    return (
        <>
        <Container className="App homebg" style={{backgroundImage: `url(${imageUrl})` }} fluid>
          <Row>
           <Col className="App-content" >
           <h2 style={{textAlign:"center"}}>New to BrewMore?</h2>
      <Button variant="secondary"  id="registrationButton" onClick={() => props.history.push(`/Registration`) }>Register New User</Button>
           </Col> 
           

           <Col className="App-content" >
           <h2 style={{textAlign:"center"}}>Returning Brewer?</h2>

      <Button variant="primary" id="loginButton" size="lg" onClick={() => props.history.push(`/Login`) }>Login</Button>
           </Col> 
             </Row>
           <Row lg={1}>
             <h1 style={{textAlign:"center"}}>Welcome to BrewMore</h1>
           </Row>
          </Container>
  {/* <Container className="homeBody" fluid>
    <Row>
    </Row>     
</Container> */}
        </>
        )
}

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth ] = useState(window.innerWidth);

  useEffect(() => {
      const handleWindowResize = () => {
          setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleWindowResize);
      return () => window.removeEventListener('resize', handleWindowResize);
  },[]);

  return windowWidth;
};
export default Home