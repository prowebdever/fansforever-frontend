import { useState } from 'react';
import styled from 'styled-components';

import Spinner from 'components/Spinner';

import { auctionEngineContractInstance } from 'contract-interactions/instances/auctionEngineContractInstance';
// import { cancelAuction } from 'apis/updateAuction'
const AcceptBidButtonWrapper = styled.div`
  button {
    width: 208px;
    height: 47px;
    background: ${(props) => props.theme.accentColors.primary};
    border-radius: 5px;
    border: none;
    outline: none;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: IBM Plex Sans;
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    text-transform: uppercase;

    color: #ffffff;

    ${Spinner} {
      width: 20px;
      height: 20px;
      margin-right: 12px;
    }

    @media screen and (max-width: 767.99px) {
      width: 150px;
    }

    @media screen and (max-width: 594.99px) {
      margin-top: 20px !important;
    }
  }
  button:hover {
    box-shadow: 3px 3px 3px black;
  }
  button:disabled {
    background: rgba(10,10,10,.3);
  }
`;

const AcceptBidButton: React.VFC<{
  bidCount : number | string;
  auctionId: number | string;
  tokenId: number| string;
  currentAuctionStatus : number;
}> = ({ bidCount, auctionId, tokenId, currentAuctionStatus}) => {
  const [isAccepting, setAccepting]= useState(false);
  const acceptBidHandler = async () =>{
    setAccepting(true);
    try{
      const contractInstance = await auctionEngineContractInstance();
      const transaction = await contractInstance.acceptBid(auctionId).send({
        feeLimit: 100_000_000,
        callValue: 0,
        shouldPollResponse: true,
      });
      if(transaction) {
        setAccepting(false);
        alert("Acceptance Success!")
      }
    }catch(error){
      // alert("failed Accept!")
      setAccepting(false);
    }
  }
  return (
    <AcceptBidButtonWrapper>
      <button disabled={bidCount===0 || currentAuctionStatus === 2 } onClick={acceptBidHandler}>
        {isAccepting ? (
          <>
            <Spinner />
            &nbsp;&nbsp;
          </>
        ) : null}
        Accept Bid
      </button>
    </AcceptBidButtonWrapper>
  );
};

export default AcceptBidButton;
