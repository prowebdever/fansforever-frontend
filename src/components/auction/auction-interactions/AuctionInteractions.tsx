import ClaimTokensInteraction from './ClaimTokensInteraction';
import ClaimWonBidInteraction from './ClaimWonBidInteraction';
import ClaimAssetInteraction from './ClaimAssetInteraction';

interface AuctionInteractionsProps {
  auctionId: number;
  currentAuctionStatus: number;
  currentBidOwner: string;
  showClaimAsset: boolean;
  ownerWalletAddress: string;
  instantSalePrice: number| string;
  buyInfo: any;
  tokenId: number | string;
  isAssetClaimed: boolean;
  isTokenClaimed: boolean;
}

const AuctionInteractions: React.VFC<AuctionInteractionsProps> = ({
  auctionId,
  currentAuctionStatus,
  currentBidOwner,
  showClaimAsset,
  ownerWalletAddress,
  instantSalePrice,
  buyInfo,
  tokenId,
  isAssetClaimed,
  isTokenClaimed,
}) => {
  return (
    <>
      {!showClaimAsset &&
        [1, 2].includes(currentAuctionStatus) &&
        currentBidOwner !== window?.tronWeb?.defaultAddress?.base58 && (
          <ClaimTokensInteraction auctionId={auctionId} />
        )}
      {currentAuctionStatus === 2 &&
        ownerWalletAddress === window?.tronWeb?.defaultAddress?.base58 && !isTokenClaimed&& (
          <ClaimWonBidInteraction auctionId={auctionId} />
        )}
      {showClaimAsset && !isAssetClaimed &&
        <ClaimAssetInteraction 
            auctionId={auctionId} 
            ownerWalletAddress = {ownerWalletAddress} 
            tokenId = {tokenId}
            buyInfo = {buyInfo}
            instantSalePrice={instantSalePrice}
        />}
    </>
  );
};

export default AuctionInteractions;
