import React from 'react';
import { Row, PageHeader } from 'react-bootstrap';
import AddEntity from '../containers/AddEntity';
import AllEntitiesList from '../containers/AllEntitiesList';

const Home = () => (
    <div>
        <Row>
            <PageHeader>Home</PageHeader>
            <blockquote>
                This is an example for a react webapplication which uses state-of-the-art technologies like Redux and
                React Router.
            </blockquote>
        </Row>
        <Row><AddEntity /></Row>
        <Row><AllEntitiesList /></Row>
    </div>
);

export default Home;
