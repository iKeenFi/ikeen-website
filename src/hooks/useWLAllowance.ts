import { ERC20Interface, useContractCall } from '@usedapp/core';
import { ethers } from 'ethers';
import { WhitelistABI } from '../abi';

let whitelistAddress = '0x463791e15ccae33de02c2b247aa75e8d4c2d9980';
export function useWLAllowance(address: string | false | null | undefined) {
  const [allowance] =
    useContractCall(
      address && {
        abi: ERC20Interface, // ABI interface of the called contract
        address: address, // On-chain address of the deployed contract
        method: 'allowance', // Method to be called
        args: [address], // Method arguments - address to be checked for balance
      },
    ) ?? [];
  return allowance;
}
