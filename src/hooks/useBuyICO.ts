import { TransactionStatus, useContractFunction } from '@usedapp/core';
import { utils, Contract, BigNumber, ethers } from 'ethers';
import { ICOABI, WhitelistABI } from '../abi';

const ctrInterface = new utils.Interface(ICOABI);
const contractAddr = '0xdca15a602eaad78addff14bcd8fcc70d28bf0a35';

const contract = new Contract(contractAddr, ctrInterface);

let mim = '0x130966628846BFd36ff31a822705796e8cb8C18D';
let decimals = 6;

export function useBuyICO(token: string) {
  const { state, send } = useContractFunction(contract, 'buyTokens', {
    transactionName: 'Buy tokens from ICO',
  });

  return [
    state,
    (address: string, amount: string) => {
      let bigNumberAmount = ethers.utils.formatUnits(amount, 18);
      send(address, amount);
    },
  ] as [TransactionStatus, Function];
}
