import React from 'react';
import { PageHeader } from 'react-bootstrap';

const NotFound = () => (
    <div>
        <PageHeader>Page not found</PageHeader>
        <blockquote>The page you requested does not exist</blockquote>
    </div>
);

export default NotFound;
