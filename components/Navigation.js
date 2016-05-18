import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Navigation = () => {
    const githubLink = 'https://github.com/lxanders/react-clientside-example';

    return (
        <Navbar className='navigation'>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href={githubLink}>
                        <img
                            src='assets/img/GitHub-Mark-32px.png'
                            alt='Link to GitHub repository for react-clientside-example project'>
                        </img>
                    </a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem eventKey={1} href='/'>Example for client side rendered React and Redux</NavItem>
            </Nav>
        </Navbar>
    );
};

export default Navigation;
