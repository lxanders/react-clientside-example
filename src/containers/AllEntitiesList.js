import { connect } from 'react-redux';
import EntityList from '../components/EntityList';

const mapStateToProps = (state) => {
    return {
        entities: state.entities
    };
};

const AllEntitiesList = connect(mapStateToProps)(EntityList);

export default AllEntitiesList;
