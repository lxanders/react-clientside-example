import React from 'react';
import Navigation from './Navigation';
import AddEntity from '../containers/AddEntity';
import AllEntitiesList from '../containers/AllEntitiesList';

class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <Navigation />
                </header>
                <section className='container'>
                    <div className='row'><AddEntity /></div>
                    <div className='row'><AllEntitiesList /></div>
                </section>
            </div>
        );
    }
}

export default App;
