import { ethers } from 'ethers';

export function convert(amount: string, decimals: number) {
  return ethers.utils.parseUnits(amount, decimals);
}
