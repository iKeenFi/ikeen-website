import { TransactionStatus, useContractFunction } from '@usedapp/core';
import { utils, Contract } from 'ethers';
import { WhitelistABI } from '../abi';

const ctrInterface = new utils.Interface(WhitelistABI);
const contractAddr = '0x463791e15ccae33de02c2b247aa75e8d4c2d9980';

const contract = new Contract(contractAddr, ctrInterface);

let tokens = {
  'usdc.e': '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
  usdc: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
  mim: '0x130966628846BFd36ff31a822705796e8cb8C18D',
  'usdt.e': '0xc7198437980c041c805a1edcba50c1ce5db95118',
  usdt: '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
  wavax: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
};
export function useBuyWhitelist(token: string) {
  const { state, send } = useContractFunction(contract, 'buyWhitelistSpot', {
    transactionName: 'Buy Whitelist',
  });

  return [
    state,
    () => {
      send(token);
    },
  ] as [TransactionStatus, Function];
}
