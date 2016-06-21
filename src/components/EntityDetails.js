import React from 'react';
import { PageHeader } from 'react-bootstrap';

const EntityDetails = ({ params }) => {
    return (
        <div>
            <PageHeader>Entity details: {params.id}</PageHeader>
        </div>
    );
};

EntityDetails.propTypes = {
    params: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired
    }.isRequired)
};

export default EntityDetails;
