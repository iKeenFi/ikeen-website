import { useContractCall, useTokenBalance } from '@usedapp/core';
import { ethers } from 'ethers';
import { convert } from '../lib/convertHelper';
import { WhitelistABI } from '../abi';

let iskeen = '0xAC53b3dFB93CCcEaE015E7B5C1Cef4681a2D3d9e';
let decimals = 6;

let icoAddress = '0x5A71DC16476fb31Ff9C9fE5Bb35D6D02fCd6ee62';
export function useICOTokensTaken() {
  const balance = useTokenBalance(iskeen, icoAddress);
  return balance ? convert('10000', 18).sub(balance) : 0;
}

export function useWhitelistSpotsTotal() {
  return 10000;
}
