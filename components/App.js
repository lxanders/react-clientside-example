import React from 'react';
import Greeting from './Greeting';
import AddEntity from '../containers/AddEntity';
import AllEntitiesList from '../containers/AllEntitiesList';

class App extends React.Component {
    render() {
        return (
            <div>
                <Greeting />
                <AddEntity />
                <AllEntitiesList/>
            </div>
        );
    }
}

export default App;
