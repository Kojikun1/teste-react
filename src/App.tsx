import React from 'react';
import './App.css';

import Home from './pages/Home';
import DataProvider from './contexts/PostsContext';

function App() {
  return (
   <DataProvider>
      <div className="App">
        <header className="App-header">
              <h2>Posts</h2>
        </header>
        <Home />
      </div>
    </DataProvider>
  );
}

export default App;
