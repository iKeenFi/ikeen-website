import { useEthers } from '@usedapp/core';
import React, { useState, useEffect } from 'react';
import LinkButton from '../components/Button';
import Card from '../components/Card';
import DisabledLinkButton from '../components/DisabledButton';

interface AppProps {}

function Whitelist({}: AppProps) {
  const { activateBrowserWallet, account } = useEthers();
  return (
    <div className="flex flex-col p-2">
      <div className="flex flex-row justify-center">
        <Card>
          <h1 className="text-2xl font-bold text-center">iKeen Whitelist</h1>
          {<p>You are already whitelisted!</p>}
        </Card>
      </div>
    </div>
  );
}

export default Whitelist;
