import { useEthers } from '@usedapp/core';
import React, { useState, useEffect } from 'react';
import LinkButton from '../components/Button';
import DisabledLinkButton from '../components/DisabledButton';
import LogoDarkImage from '../assets/logo_dark_with_text.png';
import Card from '../components/Card';
interface AppProps {}

function Home({}: AppProps) {
  const { activateBrowserWallet, account } = useEthers();
  return (
    <div className="flex flex-col p-2">
      <div className="flex flex-col items-center">
        <img
          src={LogoDarkImage}
          className="inline-block justify-center max-w-md"
          alt="Pegged through seigniorage to 1 AVAX"
          crossOrigin="anonymous"
        />
        <Card>
          <ul className="flex flex-col gap-y-4 items-stretch">
            <LinkButton href="./whitelist" text="Buy Genesis Whitelist" />
            <DisabledLinkButton text="App" />
            <LinkButton href="https://docs.ikeenfi.app" text="Docs" />
          </ul>
        </Card>
      </div>
    </div>
  );
}

export default Home;
