import React from 'react';
import {Navbar, Nav , NavDropdown} from 'react-bootstrap';
import logo from '../horse-club-logo.png';


export default function Header(props) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <img alt='logo' src={logo} style={{width:'3.5rem',height:'4rem'}}/>
            </Navbar.Brand>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="navbar-right">
                    <Nav.Link href="/Schedule">יומן</Nav.Link>
                    &nbsp;&nbsp;
                    <NavDropdown title="רוכבים" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/Riders">צפייה ברוכבים</NavDropdown.Item>
                        <NavDropdown.Item href="/AddRider">רוכב חדש</NavDropdown.Item>
                    </NavDropdown>
                    &nbsp;&nbsp;
                    <NavDropdown title="סוסים" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/HorsesPage">צפייה בסוסים</NavDropdown.Item>
                        <NavDropdown.Item href="/AddHorse">סוס חדש</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Navbar>
    )
}
