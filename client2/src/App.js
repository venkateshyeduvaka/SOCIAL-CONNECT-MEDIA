// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profileview from './components/Profileview';


const App = () => {
  return (
    <div>
        <ToastContainer position="bottom-right" />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />}  />
        <Route path="/"  element={<ProtectedRoute element={Home}/>}/>
        <Route path="/profile"  element={<ProtectedRoute element={Profile}/>}/>
      </Routes>
    </div>
  );
}

export default App;
