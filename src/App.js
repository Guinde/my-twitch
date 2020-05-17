import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './component/header/Header';
import TopChannels from './component/top-channels/TopChannels';
import Body from './component/body/Body';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column">
        <Header />
        <div className="d-flex flex-row">
          <TopChannels />
          <Body />
        </div>
      </div>
    </Router>
  );
}

export default App;
