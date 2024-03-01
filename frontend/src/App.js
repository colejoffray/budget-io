import React from 'react';
import { Routes, Route, Form } from 'react-router-dom';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard'
import Layout from './components/Layout';
import Hero from './components/Hero'
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>

            {/* //Public routes */}
            <Route path='/' element={<Hero />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route element={<RequireAuth />}>
              {/* Private routes */}
              
            </Route>
           
      </Route>
      
    </Routes>
  );
}

export default App;





