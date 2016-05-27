import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EntityList from '../components/EntityList';
import { fetchEntities } from '../actions/index';

class AllEntitiesList extends React.Component {
    componentDidMount() {
        this.props.fetchEntities();
    }

    render() {
        return <EntityList entities={this.props.entities.items} />;
    }
}

AllEntitiesList.propTypes = {
    fetchEntities: React.PropTypes.func.isRequired,
    entities: React.PropTypes.shape({
        status: React.PropTypes.string.isRequired,
        error: React.PropTypes.string,
        items: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string.isRequired
        }))
    })
};

function mapStateToProps(state) {
    return { entities: state.entities };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchEntities }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllEntitiesList);
