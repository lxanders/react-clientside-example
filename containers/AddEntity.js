import React from 'react';
import { connect } from 'react-redux';
import { addEntity } from '../actions/index';

export class AddEntity extends React.Component {
    render() {
        let input;

        const addEntityWithName = (event) => {
            event.preventDefault();

            if (input.value.trim()) {
                this.props.dispatch(addEntity(input.value));
                input.value = '';
            }
        };

        const saveInputRef = (node) => {
            input = node;
        };

        return (
            <form onSubmit={addEntityWithName}>
                <input ref={saveInputRef} />
                <button type='submit'>Add entity</button>
            </form>
        );
    }
}

AddEntity.propTypes = {
    dispatch: React.PropTypes.func.isRequired
};

export default connect()(AddEntity);
