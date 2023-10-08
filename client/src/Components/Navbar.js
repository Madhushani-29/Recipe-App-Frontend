import {Navbar, Nav, Container, Button, Image} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../StyleSheets/Navbar.css";
import navBarImage from "../Images/navBarImage.png";
import {useCookies} from "react-cookie";

const NavbarHeader=()=>{
    const [cookies, setCookies]=useCookies(["access_token"]);
    const navigate=useNavigate();

    const logout =(event)=>{
      setCookies("access_token", "");
      window.localStorage.removeItem("User_ID");
      navigate("/auth");
    }
    return(
      <Navbar  collapseOnSelect expand="md" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className="sub-container">
            <Image src={navBarImage} className="navImage"/>
            <span className="pageTitle"><p>Cookbook Hub</p></span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav className="linkNav">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/add-recipe">Share Recipe</Nav.Link>
              <Nav.Link onClick={()=>{
                  if (!cookies.access_token){
                    window.alert("First you need to login.");
                  }
                  else{
                    navigate("/saved-recipes");
                  }
              }}>Favorite Recipes</Nav.Link>
              <div className="btnContsiner">
              {!cookies.access_token ? 
                <Button variant="secondary"><Link to="/auth" className="btnLink">Login</Link></Button> : 
                <Button onClick={logout} variant="secondary"><Link to="/auth" className="btnLink">Logout</Link></Button>
              }
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default NavbarHeader;

//line 25-27 if there is no cookie give login button 
//if there is give logout button




