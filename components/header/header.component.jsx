import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink} from 'react-router-dom';

export default class HeaderComponent extends Component {
    render() {
        return (
            <header>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        <span>&#8730;</span>MS
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav className="mr-auto">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/register" className="nav-link">Registration</Link>
                        </Nav>
                        <Navbar.Text>
                            Signed in as: <a href="#login">Bikram Choudhury</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        )
    }
}




/*export default class HeaderComponent extends Component {
    render() {
        return React.createElement("header", null, 
            React.createElement("h3", null, 
                React.createElement("span", null, "&#8730; ms")
            )
        )
    }
}*/
