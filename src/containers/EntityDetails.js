import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { PageHeader } from 'react-bootstrap';
import { getEntity, getEntitiesIsInProgress, getEntitiesErrorMessage } from '../reducers/index';
import { fetchEntity } from '../actions/index';
import { entity as entityDefinition } from '../lib/typeDefinitions';

const renderErrorMessage = (errorMessage) => (
    <div className='error'>No entity found with this key. Message: {errorMessage}</div>
);

const renderLoadingIndicator = () => <div className='loading'>Loading...</div>;

const renderDetails = (entity) => {
    const keyValuePairs = R.toPairs(entity);

    if (keyValuePairs.length > 0) {
        const createListItem = (key, value) => <li key={key}>{key}: {value}</li>;

        return (
            <ul>
                {R.map(([ key, value ]) => createListItem(key, value), keyValuePairs)}
            </ul>
        );
    }

    return null;
};

class EntityDetails extends React.Component {
    componentDidMount() {
        this.props.fetchEntity(this.props.id);
    }

    render() {
        const { entity, errorMessage, isInProgress, id } = this.props;
        let entityDetailsBody;

        if (isInProgress) {
            entityDetailsBody = renderLoadingIndicator();
        } else if (errorMessage) {
            entityDetailsBody = renderErrorMessage(errorMessage);
        } else {
            entityDetailsBody = renderDetails(entity);
        }

        return (
            <div>
                <PageHeader>Entity details: {id}</PageHeader>
                {entityDetailsBody}
            </div>
        );
    }
}

EntityDetails.propTypes = {
    fetchEntity: React.PropTypes.func.isRequired,
    isInProgress: React.PropTypes.bool.isRequired,
    id: React.PropTypes.string.isRequired,
    entity: entityDefinition,
    errorMessage: React.PropTypes.string
};

const mapStateToProps = (state, { params }) => ({
    entity: getEntity(state, params.id),
    id: params.id,
    isInProgress: getEntitiesIsInProgress(state),
    errorMessage: getEntitiesErrorMessage(state)
});

export { EntityDetails };
export default connect(mapStateToProps, { fetchEntity })(EntityDetails);
