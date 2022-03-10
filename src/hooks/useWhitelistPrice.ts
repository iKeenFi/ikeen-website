export function useWhitelistPrice(
  token:
    | 'usdt'
    | 'usdt.e'
    | 'usdc'
    | 'usdc.e'
    | 'mim'
    | 'dai.e'
    | 'avax'
    | 'wavax'
    | string
    | undefined
    | null,
) {
  if (token == null || token == undefined) {
    return 0;
  }
  if (token == 'avax' || token == 'wavax') {
    return 0.27;
  } else {
    return 20;
  }
}
