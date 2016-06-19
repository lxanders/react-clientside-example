import React from 'react';
import { connect } from 'react-redux';
import EntityList from '../components/EntityList';
import { fetchEntities } from '../actions/index';
import { getEntityItems, getEntityStatus, getEntityError } from '../reducers/index';

class AllEntitiesList extends React.Component {
    componentDidMount() {
        this.props.fetchEntities();
    }

    render() {
        return <EntityList entities={this.props.entities} />;
    }
}

AllEntitiesList.propTypes = {
    fetchEntities: React.PropTypes.func.isRequired,
    entities: React.PropTypes.arrayOf(React.PropTypes.shape({ name: React.PropTypes.string.isRequired })),
    status: React.PropTypes.string.isRequired,
    error: React.PropTypes.string
};

const mapStateToProps = (state) => ({
    entities: getEntityItems(state),
    status: getEntityStatus(state),
    error: getEntityError(state)
});

export default connect(mapStateToProps, { fetchEntities })(AllEntitiesList);
