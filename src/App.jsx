
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'
import './App.css'; 
import MovieBox from './components/MovieBox';
import MovieDetailPage from './components/MovieDetailPage';

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="App">
        <Routes>
          
          <Route path="/" element={<MovieBox />} />
       
          <Route path="/movie/:movieId" element={<MovieDetailPage />} />
        
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;