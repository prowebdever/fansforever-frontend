import { axiosInstance } from './axiosInstance';

interface CreateNftProps {
  tokenId: number;
  assetName: string;
  assetDescription: string;
  assetIpfsHash: string;
  assetMimetype: string;
  userContractAddress: string;
  justFanCollectionContractAddress: string;
  userWalletAddress: string;
  nftIpfsHash: string;
  mintTransactionId: string;
  mintEventResult: {};
}

export const createNft = async ({
  tokenId,
  assetName,
  assetDescription,
  assetIpfsHash,
  assetMimetype,
  userContractAddress,
  justFanCollectionContractAddress,
  userWalletAddress,
  nftIpfsHash,
  mintTransactionId,
  mintEventResult,
}: CreateNftProps) => {
  return axiosInstance.post('/nft', {
    tokenId,
    assetName,
    assetDescription,
    assetIpfsHash,
    assetMimetype,
    userContractAddress,
    justFanCollectionContractAddress,
    userWalletAddress,
    nftIpfsHash,
    mintTransactionId,
    mintEventResult,
  });
};
