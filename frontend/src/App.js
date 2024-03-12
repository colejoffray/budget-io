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

            {/* //Guest routes */}
            <Route path='/' element={!auth.isLoggedIn  ? <Hero /> : <Navigate to='/dashboard' replace />} />
            <Route path="/signup" element={!auth.isLoggedIn ?  <Signup /> : <Navigate to='/dashboard' replace />} />
            <Route path="/login" element={!auth.isLoggedIn ? <Signup /> : <Navigate to='/dashboard' replace />} />

            {/* User routes */}
            <Route
              path="/dashboard"
              element={auth.isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />}
            />

           
      </Route>
      
    </Routes>
  );
}

export default App;





