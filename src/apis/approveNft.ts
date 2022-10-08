import { axiosInstance } from './axiosInstance';

interface ApproveNftProps {
  userContractAddress: string;
  userWalletAddress: string;
  nftIpfsHash: string;
  mintTransactionId: string;
  tokenId: number | string;
  approvedTransactionId: string;
  approvedEventResult: {};
}
export const approveNft = async ({
  userContractAddress,
  userWalletAddress,
  nftIpfsHash,
  mintTransactionId,
  tokenId,
  approvedTransactionId,
  approvedEventResult,
}: ApproveNftProps) => {
  return axiosInstance.put('/nft', {
    userContractAddress,
    userWalletAddress,
    nftIpfsHash,
    mintTransactionId,
    tokenId,
    approvedTransactionId,
    approvedEventResult,
  });
};
