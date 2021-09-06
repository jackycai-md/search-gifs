import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GiphyView } from './app/giphy/GiphyView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GiphyView />
      </header>
    </div>
  );
}

export default App;
