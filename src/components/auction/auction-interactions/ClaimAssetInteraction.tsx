import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import AuctionInteractionButton from './AuctionInteractionButton';

import { auctionEngineContractInstance } from 'contract-interactions/instances/auctionEngineContractInstance';
import { claimAsset } from 'contract-interactions/claimAsset';
import { buyNft } from 'apis/updateNft';
import { claimNFT } from 'apis/updateAuction'

const ClaimAssetInteraction: React.VFC<{ 
  auctionId: number; 
  ownerWalletAddress: string; 
  instantSalePrice: number|string ;
  buyInfo: any;
  tokenId: number | string;
}> = ({
  auctionId,
  ownerWalletAddress,
  instantSalePrice,
  buyInfo,
  tokenId
}) => {
  const [isClaimingAsset, setIsClaimingAsset] = useState(false);
  const history=useHistory();
  const handleClaimAsset = useCallback(async () => {
    if(isClaimingAsset){
      return;
    }
    try {
      setIsClaimingAsset(true);
      const contractInstance = await auctionEngineContractInstance();
      const response = await claimAsset(contractInstance, auctionId);
      if (response) {
          let currentuserWalletAddress = ownerWalletAddress;
          let buyerWalletAddress = window?.tronWeb?.defaultAddress?.base58;
          let _buyInfotemp = {
            price: instantSalePrice,
            buyer: buyerWalletAddress
          };
          await buyNft({
            currentuserWalletAddress,
            buyerWalletAddress,
            tokenId,      
            buyInfo: _buyInfotemp
          })

          await claimNFT({isAssetClaimed: true, auctionId})
          setIsClaimingAsset(false);
          history.push('/')
      }
    } catch (error) {
      console.log('Handle Claim Asset Error: ', error);
      alert('Failed to claim asset - ' + error);
      setIsClaimingAsset(false);
    }
  }, [auctionId, ownerWalletAddress, tokenId, instantSalePrice, isClaimingAsset, history]);

  return (
    <AuctionInteractionButton
      label="Collect NFT"
      buttonText="You have won the AUCTION!"
      onButtonClick={handleClaimAsset}
      isLoading={isClaimingAsset}
      loadingText="Claiming your asset..."
    />
  );
};

export default ClaimAssetInteraction;
