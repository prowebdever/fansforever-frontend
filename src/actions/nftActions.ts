import { fetchNftsList } from 'apis/fetchNftsList'

export const FETCH_NFTS_BY_USERWALLETADDRESS = 'FETCH_NFTS_BY_USERWALLETADDRESS';

export const getNftsByuser =(payload)=> async (dispatch) =>{
  const response = await fetchNftsList({userCryptoAddress: payload.walletAddr, userContractAddress: payload.contractAddr});
  const result = await response.data;
  dispatch({
    type: FETCH_NFTS_BY_USERWALLETADDRESS,
    payload:result,
  });
} 
