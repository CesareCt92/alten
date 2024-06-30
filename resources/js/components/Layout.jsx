// components/Layout.jsx

import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import "./style.css";
import Login from './LoginForm/Login';

const Layout = () => {
  return (
    <div>
      <Header />
      <Login />
      <Footer />
    </div>
  );
}

export default Layout;
