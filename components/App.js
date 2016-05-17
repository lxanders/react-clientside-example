import React from 'react';
import Navigation from './Navigation';
import AddEntity from '../containers/AddEntity';
import AllEntitiesList from '../containers/AllEntitiesList';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/main.css';

class App extends React.Component {
    render() {
        return (
            <div className='container'>
                <header className='row'>
                    <Navigation />
                </header>
                <section className='row'>
                    <div className='row'><AddEntity /></div>
                    <div className='row'><AllEntitiesList /></div>
                </section>
            </div>
        );
    }
}

export default App;
