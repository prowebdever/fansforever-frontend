import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import NFTCard from './nft-card/NFTCard';
import NoNFTsAdded from './NoNFTsAdded';
import { RootState } from 'store';
import config from 'config';
import BurnTokenModal from './profile/BurnTokenModal';
import {burnNft} from 'contract-interactions/burnNft';
import {justFanCollectionContractInstance} from 'contract-interactions/instances/justFanCollectionContractInstance'
import TronGrid from 'trongrid/dist/trongrid';

import { getNftsByuser } from 'actions/nftActions'

const NFTSectionWrapper = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(288px, 1fr));
  grid-column-gap: 24px;
  grid-row-gap: 45px;
  position: relative;

  /* .load-more-wrapper {
    margin-top: 15px;
    width: 100%;
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    align-items: center;

    .load-more {
      width: 209px;
      height: 50px;
      left: 616px;
      top: 2727px;

      border: 1px solid ${({ theme }) => theme.textColors.primary};
      box-sizing: border-box;
      border-radius: 4px;

      display: grid;
      place-items: center;

      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      text-align: center;
      letter-spacing: -0.21px;

      color: ${({ theme }) => theme.textColors.primary};
      cursor: pointer;
     }
  } */
`;

const NFTSection = ({ contractAddr, walletAddr, nftstate }) => {
  const { nfts } = useSelector(
    (state: RootState) => state.nft
  );

  // const [nfts, setNfts] = useState([]);
  const [showBurnTokenModal, setShowBurnTokenModal] = useState(false);
  const [burnTokenInfo, setBurnTokenInfo] = useState(null);
  const [isBurningToken, setIsBurningToken] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      try {
        if (contractAddr && walletAddr) {
          dispatch(getNftsByuser({contractAddr:contractAddr, walletAddr: walletAddr}))
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [contractAddr, walletAddr, dispatch]);

  const onBurnTokenClick = ({ tokenId, tokenName }) => {
    setBurnTokenInfo({ tokenId, tokenName });
    setShowBurnTokenModal(true);
  };

  const handleBurnToken = async () => {
    try {
      setIsBurningToken(true);
      // TODO Add Burn Logic Here.
      const contractInstance = await justFanCollectionContractInstance();
      const transactionid = await burnNft({contractInstance, tokenId:burnTokenInfo.tokenId});
      const tronGrid = new TronGrid(window.tronWeb);
      const events = await tronGrid.transaction.getEvents(
        transactionid
      );
      setTimeout(async () => {
        if(!events.success){
          alert("failed burn token!");
          setShowBurnTokenModal(false);
          return;
        }
        await fetch(`${config.apiBaseUrl}/nft/delete`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            tokenId: burnTokenInfo.tokenId,
          }),
        });
        let new_nfts = nfts.filter((nft)=>nft?.mintEventResult?.result?.tokenId !== burnTokenInfo.tokenId);
        // setNfts(new_nfts)
        dispatch(getNftsByuser(new_nfts))
        alert("success burning token!")
        setShowBurnTokenModal(false);
        setIsBurningToken(false);
      }, 2000);
    } catch (error) {
      alert("failed burning token!")
      console.log(error);
      setIsBurningToken(false);
    }
  };

  return (
    <>
      {nfts?.length > 0 ? (
        <NFTSectionWrapper>
          {
            nfts.map((nft) => {
              if (nftstate ===0){
                return (
                  <NFTCard
                    key={nft?.nftIpfsHash}
                    idx={nft?.mintEventResult?.result?.tokenId}
                    image={`https://fansforever.mypinata.cloud/ipfs/${nft?.assetIpfsHash}`}
                    title={nft?.assetName}
                    nftDetails={nft}
                    onBurnTokenClick={onBurnTokenClick}
                    auctionIndex={nft?.auctionIndex}
                  />
                )
              } else if(nftstate === 1 && !nft.isMovedToAuction){
                  return (<NFTCard
                      key={nft?.nftIpfsHash}
                      idx={nft?.mintEventResult?.result?.tokenId}
                      image={`https://fansforever.mypinata.cloud/ipfs/${nft?.assetIpfsHash}`}
                      title={nft?.assetName}
                      nftDetails={nft}
                      onBurnTokenClick={onBurnTokenClick}
                      auctionIndex={nft?.auctionIndex}
                  />)
              } else if (nftstate === 2 && nft.isMovedToAuction ){
                  return (<NFTCard
                      key={nft?.nftIpfsHash}
                      idx={nft?.mintEventResult?.result?.tokenId}
                      image={`https://fansforever.mypinata.cloud/ipfs/${nft?.assetIpfsHash}`}
                      title={nft?.assetName}
                      nftDetails={nft}
                      onBurnTokenClick={onBurnTokenClick}
                      auctionIndex={nft?.auctionIndex}
                />)
              }else{
                return <></>
              }
            })
          }
          {/* <div className="load-more-wrapper">
            <div className="load-more">View More</div>
          </div> */}
        </NFTSectionWrapper>
      ) : (
        <NoNFTsAdded />
      )}
      <BurnTokenModal
        key={burnTokenInfo?.tokenId || 'abc'}
        open={showBurnTokenModal}
        onClose={() => setShowBurnTokenModal(false)}
        onBurnToken={handleBurnToken}
        isBurningToken={isBurningToken}
        tokenName={burnTokenInfo?.tokenName}
      />
    </>
  );
};

export default NFTSection;
