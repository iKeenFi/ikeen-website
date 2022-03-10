import {
  ERC20Interface,
  TransactionStatus,
  useContractFunction,
} from '@usedapp/core';
import { utils, Contract, BigNumber } from 'ethers';
import { WhitelistABI } from '../abi';

let tokens = {
  'usdc.e': '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
  usdc: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
  mim: '0x130966628846BFd36ff31a822705796e8cb8C18D',
  'usdt.e': '0xc7198437980c041c805a1edcba50c1ce5db95118',
  usdt: '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
  wavax: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
};
export function useApprove(token: string) {
  const contract = new Contract(token, ERC20Interface);

  const { state, send } = useContractFunction(contract, 'approve', {
    transactionName: 'Approve',
  });

  return [
    state,
    (address: string) => {
      // @ts-ignore
      send(
        address,
        BigNumber.from(
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
        ),
      );
    },
  ] as [TransactionStatus, Function];
}
