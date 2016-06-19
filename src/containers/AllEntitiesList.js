import React from 'react';
import { connect } from 'react-redux';
import EntityList from '../components/EntityList';
import { fetchEntities } from '../actions/index';
import { getEntitiesItems, getEntitiesIsInProgress, getEntitiesErrorMessage } from '../reducers/index';

class AllEntitiesList extends React.Component {
    componentDidMount() {
        this.props.fetchEntities();
    }

    render() {
        return <EntityList entities={this.props.items} />;
    }
}

AllEntitiesList.propTypes = {
    fetchEntities: React.PropTypes.func.isRequired,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({ name: React.PropTypes.string.isRequired })),
    isInProgress: React.PropTypes.bool.isRequired,
    errorMessage: React.PropTypes.string
};

const mapStateToProps = (state) => ({
    items: getEntitiesItems(state),
    isInProgress: getEntitiesIsInProgress(state),
    errorMessage: getEntitiesErrorMessage(state)
});

export { AllEntitiesList };
export default connect(mapStateToProps, { fetchEntities })(AllEntitiesList);
