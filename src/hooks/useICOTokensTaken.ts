import { useContractCall, useTokenBalance } from '@usedapp/core';
import { ethers } from 'ethers';
import { convert } from '../lib/convertHelper';
import { WhitelistABI } from '../abi';

let iskeen = '0xAC53b3dFB93CCcEaE015E7B5C1Cef4681a2D3d9e';
let decimals = 6;

let icoAddress = '0xdca15a602eaad78addff14bcd8fcc70d28bf0a35';
export function useICOTokensTaken() {
  const balance = useTokenBalance(iskeen, icoAddress);
  return balance ? convert('10000', 18).sub(balance) : 0;
}

export function useWhitelistSpotsTotal() {
  return 10000;
}
