import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  Mainnet,
  DAppProvider,
  useEtherBalance,
  useEthers,
  Config,
  Avalanche,
} from '@usedapp/core';
import { formatEther } from '@ethersproject/units';
import Homepage from './views/Homepage';

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
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

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
