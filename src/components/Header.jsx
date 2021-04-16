import React from 'react';
import {Navbar, Nav , NavDropdown} from 'react-bootstrap';
import logo from '../horse-club-logo.png';
import {Link} from 'react-router-dom';


export default function Header(props) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <img alt='logo' src={logo} style={{width:'3.5rem',height:'4rem'}}/>
            </Navbar.Brand>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="navbar-right">
                    <NavDropdown title="יומן" id="basic-nav-dropdown">
                        <NavDropdown.Item ><Link className="nav-link" to="/Schedule">צפייה ביומן</Link></NavDropdown.Item>
                    </NavDropdown>
                    &nbsp;&nbsp;
                    <NavDropdown title="רוכבים" id="basic-nav-dropdown">
                        <NavDropdown.Item ><Link className="nav-link" to="/Riders">צפייה ברוכבים</Link></NavDropdown.Item>
                        <NavDropdown.Item ><Link className="nav-link" to="/AddRider">רוכב חדש</Link></NavDropdown.Item>
                    </NavDropdown>
                    &nbsp;&nbsp;
                    <NavDropdown title="סוסים" id="basic-nav-dropdown">
                        <NavDropdown.Item ><Link className="nav-link" to="/HorsesPage">צפייה בסוסים</Link></NavDropdown.Item>
                        <NavDropdown.Item ><Link className="nav-link" to="/AddHorse">סוס חדש</Link></NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Navbar>
    )
}
