import React from 'react';
import { PageHeader } from 'react-bootstrap';
import R from 'ramda';
import KeyValueList from './KeyValueList';

const EntityDetails = ({ params, location }) => {
    const queryParametersListWithHeader = R.isEmpty(location.query) ? null : (
        <div>
            <h3>Query parameters</h3>
            <KeyValueList object={location.query} />
        </div>
    );

    return (
        <div>
            <PageHeader>Entity details: {params.entityId}</PageHeader>
            {queryParametersListWithHeader}
        </div>
    );
};

EntityDetails.propTypes = {
    params: React.PropTypes.shape({
        entityId: React.PropTypes.string.isRequired
    }.isRequired),
    location: React.PropTypes.shape({
        query: React.PropTypes.object
    }.isRequired)
};

export default EntityDetails;
