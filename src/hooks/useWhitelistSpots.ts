import { useContractCall } from '@usedapp/core';
import { ethers } from 'ethers';
import { WhitelistABI } from '../abi';

let whitelistAddress = '0x463791e15ccae33de02c2b247aa75e8d4c2d9980';
export function useWhitelistSpotsTaken() {
  const [whitelistSpotsTaken] =
    useContractCall({
      abi: new ethers.utils.Interface(WhitelistABI), // ABI interface of the called contract
      address: whitelistAddress, // On-chain address of the deployed contract
      method: 'totalSupply', // Method to be called
      args: [],
    }) ?? [];
  return whitelistSpotsTaken;
}

export function useWhitelistSpotsTotal() {
  return 200;
}
