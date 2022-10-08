interface ApproveTrc20SpenderProps {
  contractInstance: any;
  spenderAddress: string;
  amount: number | string;
  shouldPollResponse?: boolean;
}

export const approveTrc20Spender = async ({
  contractInstance,
  spenderAddress,
  amount,
  shouldPollResponse = false,
}: ApproveTrc20SpenderProps) => {
  if (window?.tronWeb?.ready) {
    await contractInstance.approve(spenderAddress, amount).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse,
    });
  } else {
    throw new Error('Wallet not connected');
  }
};
