import React from 'react';
import { Link} from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import styled from "styled-components";
import Logout from "./Logout";

function NavbarComponent() {

  return (
    <StyledContainer fluid>
      <Row>
        <Col>
          <Navbar bg="light" variant="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/home" activeClassName="active">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/" activeClassName="active" >
                  Chat
                </Nav.Link>
                <Nav.Link as={Link} to="/event" activeClassName="active">
                  Add Event
                </Nav.Link>
                <Nav.Link as={Link} to="/submission" activeClassName="active">
                  Add Submission
                </Nav.Link>
                <Nav.Link as={Link} to="/post" activeClassName="active">
                  Posts
                </Nav.Link>
                <Nav.Link as={Link} to="/leaderboard" activeClassName="active">
                  Leaderboard
                </Nav.Link>
                <Nav className="ml-auto">
                </Nav>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
        <Col xs={2} className="d-flex justify-content-end align-items-center" bg="light" variant="light">
          <Logout />
        </Col>
      </Row>
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)`
  
 position: sticky;
  .navbar-light .navbar-nav .nav-link {
    color: black;
    margin-right: 1rem;
  }

  .navbar-light .navbar-nav .nav-link:hover {
    color: black;
    background-color: #aef359; 
  }

  .navbar-light .navbar-nav .nav-link>.active {
    font-weight: bold;
    background-color: #aef359 !important; 
    color: black;
  }
`;

export default NavbarComponent;