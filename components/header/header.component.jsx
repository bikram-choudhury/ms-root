import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export default class HeaderComponent extends Component {
    render() {
        const user = localStorage.getItem('user');
        const name = user && JSON.parse(user).name;
        return (
            <header>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Link to="/" className="navbar-brand">
                        <span>&#8730;</span>MS
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav className="mr-auto">
                            {/* <Link to="/" className="nav-link">Home</Link> */}
                            <Link to="/course" className="nav-link">Course</Link>
                            <Link to="/register" className="nav-link">Registration</Link>
                        </Nav>
                        <Navbar.Text>
                            Signed in as: <a href="#login">{name}</a>
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
