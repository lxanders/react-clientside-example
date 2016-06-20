import React from 'react';
import { PageHeader } from 'react-bootstrap';
import KeyValueList from './KeyValueList';

const QueryParamsDemo = ({ location }) => {
    return (
        <div>
            <PageHeader>Query parameter demo</PageHeader>
            <blockquote>This is demo page for query parameters. Add some to see it in action.</blockquote>
            <KeyValueList object={location.query} />
        </div>
    );
};

QueryParamsDemo.propTypes = {
    location: React.PropTypes.shape({
        query: React.PropTypes.object
    }.isRequired)
};

export default QueryParamsDemo;
