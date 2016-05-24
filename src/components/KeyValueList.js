import React from 'react';
import R from 'ramda';

function buildListItems(object) {
    return R.map((keyValuePair) => {
        const key = keyValuePair[0];
        const value = keyValuePair[1];

        return <li key={key}>{`${key}: ${value}`}</li>;
    }, R.toPairs(object));
}

const KeyValueList = ({ object }) => {
    const listItems = buildListItems(object);

    return R.isEmpty(listItems) ? null : <ul>{listItems}</ul>;
};

KeyValueList.propTypes = {
    object: React.PropTypes.object.isRequired
};

export default KeyValueList;
