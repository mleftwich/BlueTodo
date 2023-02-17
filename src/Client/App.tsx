import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from  './Pages/Landing';
import Main from './Pages/Main';

function App() {
  fetch('api/users')
  .then(response => response.json())
  .then(data => console.log(data));

  fetch('api/todos')
  .then(response => response.json())
  .then(data => console.log(data)); 


  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />

      </Routes>
      </Router>
    </div>
    
  );
}

export default App;
