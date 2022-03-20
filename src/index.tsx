import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Mainnet, DAppProvider, Config, Avalanche } from '@usedapp/core';

const config: Config = {
  readOnlyChainId: Avalanche.chainId,
  readOnlyUrls: {
    [Avalanche.chainId]: 'https://api.avax.network/ext/bc/C/rpc',
  },
};

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
