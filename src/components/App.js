import React from 'react';
import Navigation from './Navigation';

const App = ({ children }) => (
    <div>
        <header>
            <Navigation />
        </header>
        <main className='container'>{children}</main>
    </div>
);

export default App;
