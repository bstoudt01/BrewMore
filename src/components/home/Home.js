import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import desktopImage from '../../images/HomeBackground.jpg'
import mobileImage from '../../images/HomeBackground3.jpg'
import "../BrewMore.css"
const Home = (props) => {
  const imageUrl = useWindowWidth() >= 650 ? desktopImage : mobileImage;
    return (
        <>
        <Container className="App homebg" style={{backgroundImage: `url(${imageUrl})` }} fluid>
          <Row>
           <Col className="App-content" >
      <Button variant="secondary"  id="registrationButton" onClick={() => props.history.push(`/Registration`) }>Register New User</Button>
           </Col> 
           

           <Col className="App-content" >
      <Button variant="primary" id="loginButton" size="lg" onClick={() => props.history.push(`/Login`) }>Login</Button>
           </Col> 
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