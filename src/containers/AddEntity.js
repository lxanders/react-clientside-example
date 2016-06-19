import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormControl } from 'react-bootstrap';
import { storeEntityIfNew } from '../actions/index';

class AddEntity extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            inputValue: ''
        };
    }

    updateValue(event) {
        this.setState({ inputValue: event.target.value });
    }

    render() {
        const addEntityWithName = (event) => {
            event.preventDefault();

            const { inputValue } = this.state;

            if (inputValue.trim()) {
                this.props.dispatch(storeEntityIfNew(inputValue));
                this.setState({ inputValue: '' });
            }
        };

        return (
            <Form inline onSubmit={addEntityWithName}>
                <FormControl
                    type='text'
                    placeholder='Entity name'
                    value={this.state.inputValue}
                    onChange={this.updateValue.bind(this)} />
                <Button bsStyle='primary' type='submit'>Add entity</Button>
            </Form>
        );
    }
}

AddEntity.propTypes = {
    dispatch: React.PropTypes.func.isRequired
};

export { AddEntity };
export default connect()(AddEntity);
