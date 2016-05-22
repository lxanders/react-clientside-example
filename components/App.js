import React from 'react';
import Navigation from './Navigation';

class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <Navigation />
                </header>
                <main className='container'>{this.props.children}</main>
            </div>
        );
    }
}

export default App;
