import styled from 'styled-components';

import StatusPill from './StatusPill';

const ConditionalStatusPillWrapper = styled.div``;

interface ConditionalStatusPillProps {
  isMovedToAuction: boolean;
  isApprovedForAuction: boolean;
  userCryptoAddress: string;
  ownerWalletAddress: string;
}

const ConditionalStatusPill: React.VFC<ConditionalStatusPillProps> = ({
  isMovedToAuction,
  isApprovedForAuction,
  userCryptoAddress,
  ownerWalletAddress,
}) => {
  return (
    <ConditionalStatusPillWrapper>
      {isMovedToAuction && <StatusPill text="In Auction" />}
      {!isMovedToAuction && isApprovedForAuction && (
        <StatusPill text="Approved" />
      )}
      {ownerWalletAddress === userCryptoAddress &&
      !isMovedToAuction &&
      !isApprovedForAuction ? (
        <StatusPill text="Minted" />
      ) : null}
      {ownerWalletAddress !== userCryptoAddress &&
      !isMovedToAuction &&
      !isApprovedForAuction ? (
        <StatusPill text="Won in Auction" />
      ) : null}
    </ConditionalStatusPillWrapper>
  );
};

export default ConditionalStatusPill;
