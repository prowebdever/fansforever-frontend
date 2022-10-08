import styled, { useTheme } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useCallback } from 'react'
import { RootState } from 'store';
import { hideSelectWalletModal } from 'actions/walletActions';
import { addJSONToIpfs } from 'apis/addJSONtoIPFS';
import { justFanCollectionContractInstance } from 'contract-interactions/instances/justFanCollectionContractInstance';
import { getTotalSupply } from 'contract-interactions/getTotalSupply';
import { mintNFT } from 'contract-interactions/mintNft';
import { createNft } from 'apis/createNft';
import { useHistory } from 'react-router-dom';
import TronGrid from 'trongrid/dist/trongrid';
import config from 'config';
import { useState , useMemo } from 'react';
import { hideSelectWalletModalandshowprogressModal } from 'actions/walletActions';
import { FaCheck } from 'react-icons/fa';
import Spiner from 'components/Spinner'
const CreateProgresstWrapper = styled.div`

  .button {
    font-size: 20px;
    text-align: center;
    width: 60%;
    height: 40px;
    padding-top: 6px;
    background-color: #ff3465;
    border-bottom: 1px solid ${({ theme }) => theme.textColors.tertiary};
    border-radius: 10px;
    cursor: pointer;
    margin: auto;
    justify-content: center;
    align-items: center;
    margin-top: 35px;
    display: flex;
  }
`;

const CreateProgressModal: React.VFC = () => {
  const { showProgressModal, mintNftDetails } = useSelector(
    (state: RootState) => state.wallet
  );
  const { details, assetIpfsResult, asset } = mintNftDetails
  const theme = useTheme();
  const history = useHistory();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [isMinted, setIsMInted] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [mintedTokenId, setTokenId] = useState(false)
  const handleMintToken = useCallback(
    async (
      formValues: {
        contractAddress: string;
        uuid: string;
        assetIpfsHash: string;
        name: string;
        description: string;
        royalties: string;
      },
      tokenIpfsResult: { ipfsHash: string; previewUrl: string }
    ) => {
      try {
        const contractInstance = await justFanCollectionContractInstance();
        const totalSupply = await getTotalSupply(contractInstance);
        const mintTransactionId = await mintNFT({
          contractInstance,
          userCryptoAddress: user?.profile?.userCryptoAddress,
          totalSupply,
          tokenIpfsHash: tokenIpfsResult.ipfsHash,
        });
        const tronGrid = new TronGrid(window.tronWeb);
        do {
          var events = await tronGrid.transaction.getEvents(
            mintTransactionId
          );
          if (events && events.data && events.data.length) {
            
            const tokenId = events?.data[0]?.result?.tokenId;
            const { data } = await createNft({
              tokenId,
              assetName: formValues.name,
              assetDescription: formValues.description,
              assetIpfsHash: assetIpfsResult?.ipfsHash || '',
              assetMimetype: asset?.type || '',
              userContractAddress: config.justFanCollectionContractAddress,
              userWalletAddress: user?.profile?.userCryptoAddress,
              nftIpfsHash: tokenIpfsResult.ipfsHash,
              mintTransactionId,
              mintEventResult: events?.data?.[0] || {},
              justFanCollectionContractAddress:
                config.justFanCollectionContractAddress,
            });
            if (data) {
                setIsMInted(true);
                setIsMinting(false);
                setTokenId(tokenId);
                history.push(`/profile/${user?.profile?.userAccountHandle}`);
            }
          }
        }while( events?.data?.length ===0);
      } catch (error) {
          alert("failed minting!")
          setIsMinting(false)
        console.log(error);
      }
    },
    [user?.profile, assetIpfsResult, asset, history]
  );
  
  const handleSubmit = useCallback(
    async (values: {
      contractAddress: string;
      uuid: string;
      assetIpfsHash: string;
      name: string;
      description: string;
      royalties: string;
    }) => {
      try {
        const { data } = await addJSONToIpfs(values);
        if (data) {
          handleMintToken(values, data);
        } else {
          dispatch(hideSelectWalletModal(false))
          setIsMinting(false)
          alert("failed uploading art.")
        }
      } catch (error) {
        console.log(error);
      }
    },
    [handleMintToken, dispatch]
  );
  useMemo(()=>{
    if(mintNftDetails){
        setIsMInted(false);
    }
  },[mintNftDetails])
  const onTonlinkClickHandler = () =>{
      setIsMinting(true);
    handleSubmit(details)
  }
  return (
    <Modal
      open={showProgressModal}
      onClose={() =>{ !isMinting&&dispatch(hideSelectWalletModalandshowprogressModal(false))}}
      center
      closeOnOverlayClick={false}
      closeOnEsc = {false}
      styles={{
        modalContainer: {
          background: 'rgba(255, 255, 255, 0.1)',
        },
        modal: {
          padding: 20,
          background: theme.backgroundColors.secondary,
          color: theme.textColors.primary,
          width: '80%',
          maxWidth: '425px',
          borderRadius: '10px',
        },
        closeButton: {
          background: theme.backgroundColors.secondary,
          borderRadius: '80%',
        },
      }}
    >
      <CreateProgresstWrapper>
        <div style={{fontSize: 24, marginTop: 30}}> Mint Token</div>
        <div>First of all, Please Create the NFT. </div>
        <button type="button" className="button" onClick={onTonlinkClickHandler} disabled = {isMinted || isMinting}>
            {isMinting?<><Spiner style={{ width: 30, height: 30, marginRight:20 }}/><div>minting...</div></> :
            
                !isMinted?
                    <div>Mint</div>
                :
                isMinted&&(
                    <div>
                        <FaCheck style={{float: 'left', marginRight: '30px', color: 'white'}} /> 
                        <div style={{float: 'right', marginLeft: '30px'}}> Minted</div>
                    </div>
                )
            }
        </button>
        
        <div style={{width : "100%", borderBottom:'solid 3px rgba(0,0,0,0.2)', marginTop: 20, marginBottom:20}}></div>

        <div style={{fontSize: 24, marginTop: 30}} >Sell Order</div>
        <div>Please create the Acution to sale. </div>
        <button 
            type="button" 
            className="button" 
            disabled = {!isMinted} 
            onClick = {
                ()=>{
                    history.push(`/auction/create/${mintedTokenId}`); 
                    dispatch(hideSelectWalletModalandshowprogressModal(false))
                }
            }>
                Sign Sell Order
        </button>
      </CreateProgresstWrapper>
    </Modal>
  );
};

export default CreateProgressModal;
