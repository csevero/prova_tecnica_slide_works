import React from 'react';
import Routes from './Routes';
import { ToastContainer } from 'react-toastify';
import './assets/styles/global.css';

function App() {
  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
}

export default App;
