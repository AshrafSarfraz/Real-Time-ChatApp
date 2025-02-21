import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/admin/home/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Career from './pages/Career';
import Login from './pages/admin/Login';
import Signup from './pages/admin/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/career" element={<Career />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
