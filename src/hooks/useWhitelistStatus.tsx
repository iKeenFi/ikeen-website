import { useContractCall } from '@usedapp/core';
import { ethers } from 'ethers';
import { WhitelistABI } from '../abi';

let whitelistAddress = '0x463791e15ccae33de02c2b247aa75e8d4c2d9980';
export function useWhitelistStatus(address: string | false | null | undefined) {
  const [whitelistStatus] =
    useContractCall(
      address && {
        abi: new ethers.utils.Interface(WhitelistABI), // ABI interface of the called contract
        address: whitelistAddress, // On-chain address of the deployed contract
        method: 'balanceOf', // Method to be called
        args: [address], // Method arguments - address to be checked for balance
      },
    ) ?? [];
  return whitelistStatus;
}
