import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';

import Spinner from 'components/Spinner';

import { auctionEngineContractInstance } from 'contract-interactions/instances/auctionEngineContractInstance';
import { cancelAuction } from 'apis/updateAuction'
const CancelBidButtonWrapper = styled.div`
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

const CancelBidButton: React.VFC<{
  bidCount : number | string;
  auctionId: number | string;
  tokenId: number| string;
}> = ({ bidCount, auctionId, tokenId}) => {
  const [isCanceling, setCanceling]= useState(false);
  const history = useHistory();
  const cancelAuctionHandler = async () =>{
    setCanceling(true);
    try{
      const contractInstance = await auctionEngineContractInstance();
      let transaction = await contractInstance.cancelAuction(auctionId).send({
        feeLimit: 100_000_000,
        callValue: 0,
        shouldPollResponse: false,
      });

      if(transaction) {
        let _response = await cancelAuction({auctionId , tokenId});
        if(_response.data.result === "success"){
          setCanceling(false);
          history.push('/');
        }
      }
    }catch(error){
      console.log(error)
      alert("failed cancel")
      setCanceling(false);
    }
  }
  return (
    <CancelBidButtonWrapper>
      <button disabled={bidCount>0} onClick={cancelAuctionHandler}>
        {isCanceling ? (
          <>
            <Spinner />
            &nbsp;&nbsp;
          </>
        ) : null}
        Cancel Auction
      </button>
    </CancelBidButtonWrapper>
  );
};

export default CancelBidButton;
