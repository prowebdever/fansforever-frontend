import {
  FETCH_NFTS_BY_USERWALLETADDRESS
} from '../actions/nftActions';

const initialState = {
  nfts: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_NFTS_BY_USERWALLETADDRESS:
      return {
        ...state,
        ...{
          nfts: action.payload,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
