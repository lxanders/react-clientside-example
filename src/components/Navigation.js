import React from 'react';
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

const Navigation = () => {
    const githubLink = 'https://github.com/lxanders/react-clientside-example';
    const queryParameters = {
        any: 'query parameters',
        areDisplayed: true
    };

    return (
        <Navbar className='navigation'>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to={githubLink}>
                        <Image
                            src='/assets/img/GitHub-Mark-32px.png'
                            alt='Link to GitHub repository for react-clientside-example project' />
                    </Link>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
                <IndexLinkContainer to={{ pathname: '/' }}>
                    <NavItem><span>Home</span></NavItem>
                </IndexLinkContainer>
                <LinkContainer to={{ pathname: '/queryParamsDemo', query: queryParameters }}>
                    <NavItem><span>QueryParamsDemo</span></NavItem>
                </LinkContainer>
            </Nav>

        </Navbar>
    );
};

export default Navigation;
