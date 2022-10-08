import {
  SET_WALLET_CONNECTING,
  SET_WALLET_CONNECTED,
  DISCONNECT_WALLET,
  SHOW_CONNECT_WALLET_MODAL,
  HIDE_CONNECT_WALLET_MODAL,
  SHOW_SELECT_WALLET_MODAL,
  HIDE_SELECT_WALLET_MODAL,
  HIDE_SELECT_SHOW_PROGRESS_MODAL
} from '../actions/walletActions';

const initialState = {
  isWalletConnecting: false,
  isWalletConnected: false,
  accountAddress: '',
  showConnectWalletModal: false,
  showSelectWalletModal:false,
  mintNftDetails: {},
  isminting: false,
  showProgressModal: false,
};

const connectWalletReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLET_CONNECTING:
      return Object.assign({}, state, {
        isWalletConnecting: true,
        isWalletConnected: false,
        accountAddress: '',
      });

    case SET_WALLET_CONNECTED:
      return {
        ...state,
        ...{
          isWalletConnecting: false,
          isWalletConnected: true,
          accountAddress: action.payload.accountAddress,
        },
      };

    case DISCONNECT_WALLET:
      return { ...initialState };

    case SHOW_CONNECT_WALLET_MODAL:
      return {
        ...state,
        ...{
          showConnectWalletModal: true
        },
      };

      case SHOW_SELECT_WALLET_MODAL:
        return {
          ...state,
          ...{
            showSelectWalletModal: true,
            mintNftDetails: action.payload
          },
        };
  
    case HIDE_CONNECT_WALLET_MODAL:
      return {
        ...state,
        ...{
          showConnectWalletModal: false,
        },
      };

      case HIDE_SELECT_WALLET_MODAL:
        return {
          ...state,
          ...{
            showSelectWalletModal: false,
          },
        };

        case HIDE_SELECT_SHOW_PROGRESS_MODAL:
          return {
            ...state,
            ...{
              showSelectWalletModal: false,
              showProgressModal: action.payload,
            },
          };
  
      default:
      return state;
  }
};

export default connectWalletReducer;
