import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Nav from './components/Nav';
import Footer from './components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Nav/>
    <App />
    <Footer/>
  </React.StrictMode>
);

