import React from 'react';
import './css/App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import BaseRouter from './routes';

function App() {
  return (
    <Router>
      <div className="App">
        <BaseRouter />
      </div>
    </Router>
  );
}

export default App;
