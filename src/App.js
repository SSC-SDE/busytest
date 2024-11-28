// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './page/dashboard';
import LoginPage from './page/loginPage';
import "./App.css"
import CartPage from './page/cartPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cartPage" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
