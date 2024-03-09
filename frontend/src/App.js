import React from 'react';
import { Routes, Route, Form, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard'
import Layout from './components/structure/Layout';
import Hero from './components/Hero'
import useGlobalContext from './hooks/useGlobal';

function App() {

  const { auth } = useAuth()

  const global = useGlobalContext()


  return (
    <Routes>
      <Route path='/' element={<Layout />}>

            {/* //Public routes */}
            <Route path='/' element={<Hero />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Private routes */}
            <Route
              path="/dashboard"
              element={auth.isLoggedIn === true ? <Dashboard /> : <Navigate to="/" replace />}
            />

           
      </Route>
      
    </Routes>
  );
}

export default App;





