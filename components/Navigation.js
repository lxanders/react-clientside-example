import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import githubImage from '../assets/img/GitHub-Mark-32px.png';

const Navigation = () => {
    const githubLink = 'https://github.com/lxanders/react-clientside-example';

    return (
        <Navbar className='navigation'>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href={githubLink}>
                        <img
                            src={githubImage}
                            alt='Link to GitHub repository for react-clientside-example project'>
                        </img>
                    </a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem eventKey={1} href='/'>Example for client side rendered React</NavItem>
            </Nav>
        </Navbar>
    );
};

export default Navigation;
