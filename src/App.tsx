import { useEthers } from '@usedapp/core';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './views/Homepage';
import { Link, Route, Routes } from 'react-router-dom';
import Whitelist from './views/Whitelist';

interface AppProps {}

function App({}: AppProps) {
  const { activateBrowserWallet, account } = useEthers();
  return (
    <>
      <div className="flex flex-col flex-grow min-h-screen text-white bg-gray-900">
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="whitelist" element={<Whitelist />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
