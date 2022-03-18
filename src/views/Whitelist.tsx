import { useEthers, useTokenAllowance, useTokenBalance } from '@usedapp/core';
import React, {
  useState,
  useEffect,
  SyntheticEvent,
  ChangeEvent,
  FormEvent,
} from 'react';
import { useWhitelistStatus } from '../hooks/useWhitelistStatus';
import LinkButton from '../components/LinkButton';
import Card from '../components/Card';
import DisabledLinkButton from '../components/DisabledButton';
import Button from '../components/Button';
import { useWhitelistPrice } from '../hooks/useWhitelistPrice';
import { useApprove } from '../hooks/useApprove';
import { useBuyWhitelist } from '../hooks/useBuyWhitelist';
import { convert } from '../lib/convertHelper';
import { useWhitelistSpotsTaken } from '../hooks/useWhitelistSpots';
import { ethers } from 'ethers';

interface AppProps {}
let tokens = {
  'usdc.e': '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
  usdc: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
  mim: '0x130966628846BFd36ff31a822705796e8cb8C18D',
  'usdt.e': '0xc7198437980c041c805a1edcba50c1ce5db95118',
  usdt: '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
  wavax: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
} as { [x: string]: string };
let tokenDecimals = {
  'usdc.e': 6,
  usdc: 6,
  mim: 18,
  'usdt.e': 6,
  usdt: 6,
  wavax: 18,
} as { [x: string]: number };
function Whitelist({}: AppProps) {
  const { activateBrowserWallet, account } = useEthers();
  let whitelisted = useWhitelistStatus(account);

  const whitelistAddress = '0x463791E15CcAe33de02C2B247aa75E8d4c2d9980';

  let [token, setToken] = useState('usdc');
  let [inputDisabled, setDisabled] = useState(false);

  let price = useWhitelistPrice(token);
  let allowance = useTokenAllowance(tokens[token], account, whitelistAddress);
  let balance = useTokenBalance(tokens[token], account);
  let [approveTxState, approve] = useApprove(tokens[token]);

  let whitelistSpots = useWhitelistSpotsTaken();
  let formattedWhitelistSpots =
    whitelistSpots != undefined
      ? ethers.BigNumber.from(whitelistSpots).toNumber()
      : 0;

  let [whitelistTxState, buy] = useBuyWhitelist(tokens[token]);
  // can't find the right type for the synthetic event
  let updateToken = (event: any) => {
    if (event.target == null) {
    } else {
      setToken(event.target.value);
    }
  };

  let buyWhitelist = () => {
    console.log('buy whitelist');
    buy();
  };
  let approveToken = () => {
    approve(whitelistAddress);
  };

  return (
    <div className="flex flex-col p-2">
      <div className="flex flex-row justify-center text-center">
        <Card className="min-w-[1/2] max-w-[2/3]">
          <h1 className="text-2xl font-bold text-center">iKeen Whitelist</h1>
          <p className="mb-2 text-sm font-bold text-center">
            This whitelist spot will allow you to enter the iKeen genesis pools
            when they launch.
          </p>
          <div className="flex flex-row justify-items-stretch">
            {!account && (
              <Button onClick={activateBrowserWallet} className="w-full">
                Connect Wallet
              </Button>
            )}
          </div>
          {account && (
            <>
              {whitelisted == undefined && (
                <p>Loading data... (this shouldn't take more than 5 seconds).Please make sure your wallet is connected on Avalanche Network</p>
              )}
              {whitelisted !== undefined && (
                <>
                  {formattedWhitelistSpots == undefined && (
                    <p>Loading whitelist spots...</p>
                  )}

                  {/* If you already bought */}
                  {whitelisted >= 1 && (
                    <p>
                      {formattedWhitelistSpots}/200 spots taken. You are already
                      whitelisted for the genesis pools.
                    </p>
                  )}
                  {whitelisted == 0 && (
                    <>
                      {/* If unsold */}
                      {formattedWhitelistSpots < 200 && (
                        <p>
                          {formattedWhitelistSpots}/200 spots taken. You can buy
                          a whitelist spot!
                        </p>
                      )}
                    </>
                  )}

                  {/* If sold out */}
                  {formattedWhitelistSpots >= 200 && (
                    <p>
                      {formattedWhitelistSpots}/200 spots: The whitelist's all
                      sold out! (Wow!)
                    </p>
                  )}
                  <p className="text-sm">
                    Logged in as{' '}
                    <a
                      className="text-blue-400 underline"
                      href={'https://snowtrace.io/address/' + account}
                    >
                      {account}
                    </a>
                  </p>
                  {token == 'wavax' && (
                    <p className="text-sm">
                      You can buy using normal AVAX by sending it directly to{' '}
                      <a
                        href="https://snowtrace.io/address" 
                        className="text-blue-300 underline"
                      >
                        the smart contract
                      </a>
                      . DO NOT SEND TOKENS (WAVAX/MIM/USDC/etc.) DIRECTLY
                      THROUGH YOUR WALLET.
                    </p>
                  )}
                  <div className="flex flex-row gap-x-2 justify-center items-center">
                    <p>{price}</p>
                    <select
                      onChange={updateToken}
                      value={token}
                      className="text-white bg-gray-700 rounded-xl"
                    >
                      <option value="wavax">WAVAX</option>
                      <option value="usdc">USDC</option>
                      <option value="usdc.e">USDC.e</option>
                      <option value="usdt">USDT</option>
                      <option value="usdt.e">USDT.e</option>
                      <option value="mim">MIM</option>
                    </select>

                    {formattedWhitelistSpots <= 200 && whitelisted == 0 && (
                      <>
                        {allowance == undefined && (
                          <DisabledLinkButton>Loading...</DisabledLinkButton>
                        )}
                        {allowance?.eq(0) && (
                          <>
                            {approveTxState.status == 'None' && (
                              <Button onClick={approveToken}>Approve</Button>
                            )}
                            {approveTxState.status == 'PendingSignature' ||
                              (approveTxState.status == 'Mining' && (
                                <DisabledLinkButton>
                                  Approving...
                                </DisabledLinkButton>
                              ))}
                          </>
                        )}
                        {allowance?.gt(0) && (
                          <>
                            {balance?.lt(
                              convert(String(price), tokenDecimals[token]),
                            ) && (
                              <DisabledLinkButton>
                                Not enough
                              </DisabledLinkButton>
                            )}

                            {balance?.gt(
                              convert(String(price), tokenDecimals[token]),
                            ) && (
                              <>
                                {whitelistTxState.status == 'None' && (
                                  <Button onClick={buyWhitelist}>
                                    Purchase
                                  </Button>
                                )}
                                {whitelistTxState.status ==
                                  'PendingSignature' ||
                                  (whitelistTxState.status == 'Mining' && (
                                    <DisabledLinkButton>
                                      Purchasing...
                                    </DisabledLinkButton>
                                  ))}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                    {/* If sold out */}
                    {formattedWhitelistSpots >= 200 && (
                      <DisabledLinkButton>Can't Purchase</DisabledLinkButton>
                    )}
                    {/* If you already bought */}
                    {whitelisted >= 1 && (
                      <DisabledLinkButton>Can't Purchase</DisabledLinkButton>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Whitelist;
