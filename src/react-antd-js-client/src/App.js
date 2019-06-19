import React from 'react';
import logo from './logo.svg';
import TableDemo from './TableDemo';

import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <TableDemo />
      </header>
    </div>
  );
}

export default App;
