import React from 'react';
import NavBar from './components/Header/NavBar/NavBar';
import FileCard from './components/Body/FileCard/FileCard';
import './App.css';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <div className='wrapper'>
        <FileCard />
      </div>
    </div>
  );
}

export default App;
