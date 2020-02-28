import React, { Fragment } from 'react';

// Componets
import Header from './components/Header.js';
import Features from './components/Features';
import Red from './components/Red';

function App() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="row my-5">
          <div className="col-6">
            <Features />
          </div>
          <div className="col-6">
            <Red />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
