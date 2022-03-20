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
import { convert } from '../lib/convertHelper';
import { useWhitelistSpotsTaken } from '../hooks/useWhitelistSpots';
import { BigNumberish, ethers } from 'ethers';
import { useBuyICO } from '../hooks/useBuyICO';
import { useICOTokensTaken } from '../hooks/useICOTokensTaken';

interface AppProps {}

let mim = '0x130966628846BFd36ff31a822705796e8cb8C18D';
let decimals = 18;
const icoAddress = '0xdca15a602eaad78addff14bcd8fcc70d28bf0a35';

async function getNet(provider: ethers.providers.BaseProvider) {
  return await (
    await provider.getNetwork()
  ).chainId;
}

function ICO({}: AppProps) {
  const { activateBrowserWallet, account } = useEthers();

  let cost = 10;
  let [amountMIM, setAmountMIM] = useState('0');

  let allowance = useTokenAllowance(mim, account, icoAddress);
  let balanceMIM = useTokenBalance(mim, account);
  let [approveTxState, approve] = useApprove(mim);

  let icoTokensTaken = useICOTokensTaken();
  let formattedICOTokensTaken =
    icoTokensTaken != undefined
      ? Number(ethers.utils.formatUnits(icoTokensTaken, 18))
      : 0;

  let [whitelistTxState, buy] = useBuyICO(mim);

  let buyICO = (amount: BigNumberish) => {
    console.log('buy ico');
    buy(account, amount);
  };

  let setMax = () => {
    if (balanceMIM !== undefined) {
      setNewAmount({
        target: { value: ethers.utils.formatEther(balanceMIM) },
      });
    }
  };

  let setNewAmount = (event: any) => {
    if (event.target.value == '') {
      setAmountMIM('0');
    }
    if (isNaN(Number(event.target.value)) || Number(event.target.value) <= 0) {
    } else {
      if (Number(event.target.value) > 10000) {
        setAmountMIM('10000');
      } else {
        // SPAGHETTI BOLOGNESE RIGHT HERE
        let regex = /^0*(\d+(?:\.(?:(?!0+$)\d)+)?)/;
        if (String(event.target.value).endsWith('.')) {
          setAmountMIM(event.target.value);
        } else {
          setAmountMIM(
            // @ts-ignore
            String(parseFloat(Number(event.target.value).toFixed(18))).match(
              regex,
            )[1],
          );
        }
      }
    }
  };
  let approveToken = () => {
    approve(icoAddress);
  };

  return (
    <div className="flex flex-col p-2">
      <div className="flex flex-row justify-center text-center">
        <Card className="min-w-[1/2] max-w-[2/3]">
          <h1 className="text-2xl font-bold text-center">iKeen ICO</h1>
          <p className="mb-2 text-sm font-bold text-center">
            Buy some iSKEEN Shares! Staking them (in the future) in the GALAXY
            will earn you rewards.
          </p>
          <div className="flex flex-row gap-x-4">
            <img src="" className="" />
          </div>
          <div className="flex flex-row justify-items-stretch">
            {!account && (
              <Button onClick={activateBrowserWallet} className="w-full">
                Connect Wallet
              </Button>
            )}
          </div>
          {account && (
            <>
              {icoTokensTaken == undefined && (
                <>
                  <p>
                    Loading data... (this shouldn't take more than 5 seconds).
                  </p>
                  <p>
                    Please make sure your wallet is connected to the Avalanche
                    C-Chain. If you're experiencing trouble, please{' '}
                    <a
                      className="text-blue-200 underline"
                      href="https://discord.gg/RFf6h7JaNz"
                    >
                      talk with us on our Discord server.
                    </a>
                  </p>
                </>
              )}
              {icoTokensTaken !== undefined && (
                <>
                  {formattedICOTokensTaken >= 0 && (
                    <p>{formattedICOTokensTaken}/10000 tokens claimed!</p>
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
                  <div className="flex flex-row justify-center items-center">
                    <div className="flex flex-col gap-y-2 p-2 bg-gray-700 rounded-xl">
                      <label>
                        <p className="text-sm font-light text-left">MIM</p>
                        <input
                          type="text"
                          value={amountMIM}
                          onChange={setNewAmount}
                          className="bg-gray-600 rounded-xl"
                        ></input>
                        <Button onClick={setMax} className="ml-2">
                          Max
                        </Button>
                      </label>

                      {formattedICOTokensTaken < 10000 && (
                        <>
                          {allowance == undefined && (
                            <DisabledLinkButton>Loading...</DisabledLinkButton>
                          )}
                          {allowance?.lte(
                            convert(
                              String((cost * Number(amountMIM)).toFixed(18)),
                              18,
                            ),
                          ) && (
                            <>
                              {(approveTxState.status == 'None' ||
                                approveTxState.status == 'Exception') && (
                                <Button onClick={approveToken}>Approve</Button>
                              )}
                              {(approveTxState.status == 'PendingSignature' ||
                                approveTxState.status == 'Mining') && (
                                <DisabledLinkButton>
                                  Approving...
                                </DisabledLinkButton>
                              )}
                            </>
                          )}
                          {allowance?.gte(
                            convert(
                              String(
                                Math.min(
                                  (cost * Number(amountMIM), 10),
                                ).toFixed(18),
                              ),
                              18,
                            ),
                          ) && (
                            <>
                              {/* balance is lower than amount of MIM or 1*/}
                              {balanceMIM?.lte(
                                convert(
                                  String(Math.min(Number(amountMIM), 1)),
                                  18,
                                ),
                              ) && (
                                <DisabledLinkButton>
                                  Not enough
                                </DisabledLinkButton>
                              )}

                              {balanceMIM?.gt(
                                convert(
                                  String(Math.min(Number(amountMIM), 1)),
                                  18,
                                ),
                              ) && (
                                <>
                                  {(whitelistTxState.status == 'None' ||
                                    whitelistTxState.status == 'Success' ||
                                    whitelistTxState.status == 'Fail' ||
                                    whitelistTxState.status == 'Exception') && (
                                    <Button
                                      onClick={() =>
                                        buyICO(
                                          convert(
                                            Number(amountMIM).toString(),
                                            18,
                                          ),
                                        )
                                      }
                                    >
                                      Purchase
                                    </Button>
                                  )}
                                  {(whitelistTxState.status ==
                                    'PendingSignature' ||
                                    whitelistTxState.status == 'Mining') && (
                                    <DisabledLinkButton>
                                      Purchasing...
                                    </DisabledLinkButton>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* If sold out */}
                  {formattedICOTokensTaken >= 10000 && (
                    <DisabledLinkButton>Can't Purchase</DisabledLinkButton>
                  )}
                </>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

export default ICO;
