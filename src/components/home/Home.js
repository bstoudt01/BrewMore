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
        <Container className="App" style={{backgroundImage: `url(${imageUrl})` }} fluid>
        <div className="container h-100"> 
        <div className="position-relative vh-100"> 
          <Row>
           <Col className="position-absolute mid-right" >
      <Button variant="secondary"  onClick={() => props.history.push(`/Login`) }>Current User Login</Button>    
           </Col> 
          </Row>
          <Row>
           <Col className="position-absolute mid-left" >
      <Button variant="secondary"  onClick={() => props.history.push(`/Registration`) }>Register New User</Button>
           </Col> 
          </Row>
          </div>
          </div>
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