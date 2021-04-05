import React from 'react';
import {Navbar, Nav , NavDropdown} from 'react-bootstrap';
import logo from '../horse-club-logo.png';


export default function Header(props) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <img alt='logo' src={logo} style={{width:'4rem',height:'5rem'}}/>
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/Schedule">יומן</Nav.Link>
                    <NavDropdown title="רוכבים" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/Riders">צפייה ברוכבים</NavDropdown.Item>
                        <NavDropdown.Item href="/AddRider">רוכב חדש</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="סוסים" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/Horses">צפייה בסוסים</NavDropdown.Item>
                        <NavDropdown.Item href="/AddHorse">סוס חדש</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Navbar>
    )
}
