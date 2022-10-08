import { combineReducers } from 'redux';

import walletReducer from './walletReducer';
import userReducer from './userReducer';
import nftReducer from './nftReducer'
// import auctionReducer from './auctionReducer'

export default combineReducers({
  wallet: walletReducer,
  user: userReducer,
  nft: nftReducer,
  // auction: auctionReducer
});
