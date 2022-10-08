import config from "config"
export const SET_WALLET_CONNECTING = 'SET_WALLET_CONNECTING';
export const SET_WALLET_CONNECTED = 'SET_WALLET_CONNECTED';
export const DISCONNECT_WALLET = 'DISCONNECT_WALLET';
export const SHOW_CONNECT_WALLET_MODAL = 'SHOW_CONNECT_WALLET_MODAL';
export const HIDE_CONNECT_WALLET_MODAL = 'HIDE_CONNECT_WALLET_MODAL';
export const SHOW_SELECT_WALLET_MODAL = 'SHOW_SELECT_WALLET_MODAL';
export const HIDE_SELECT_WALLET_MODAL = 'HIDE_SELECT_WALLET_MODAL';
export const HIDE_SELECT_SHOW_PROGRESS_MODAL = "HIDE_SELECT_SHOW_PROGRESS_MODAL"


export const setWalletConnecting = () => ({
  type: SET_WALLET_CONNECTING,
});

export const setWalletConnected = (payload) => ({
  type: SET_WALLET_CONNECTED,
  payload,
});

export const disconnectWallet = () => {
  localStorage.clear();
  return {
    type: DISCONNECT_WALLET,
  };
};

export const showConnectWalletModal = () => ({
  type: SHOW_CONNECT_WALLET_MODAL,
});

export const hideConnectWalletModal = () => ({
  type: HIDE_CONNECT_WALLET_MODAL,
});


export const showSelectWalletModal = (payload) => ({
  type: SHOW_SELECT_WALLET_MODAL,
  payload
});

export const hideSelectWalletModal = (payload) => ({
  type: HIDE_SELECT_WALLET_MODAL,
  payload
});
export const hideSelectWalletModalandshowprogressModal = (payload) => ({
  type: HIDE_SELECT_SHOW_PROGRESS_MODAL,
  payload
});


export const setWalletConnectedAsync = () => (dispatch) => {
  if (!window?.tronWeb?.ready) {
    return dispatch(showConnectWalletModal());
  }
  console.log(window.tronWeb?.fullNode.host)
  if(config.isMainNet&&window.tronWeb?.fullNode.host !== "https://api.trongrid.io") {
    alert("Please connect your account to Tron MainNet.")
    return dispatch(disconnectWallet());
  }
  if(!config.isMainNet&&window.tronWeb?.fullNode.host !== "https://api.shasta.trongrid.io") {
    alert("Please connect your account to Tron shasta TestNet.");
    return dispatch(disconnectWallet());
  } 
  localStorage.setItem('isWalletConnected', 'true');
  localStorage.setItem('accountAddress', window.tronWeb.defaultAddress.base58);
  return dispatch(
    setWalletConnected({ accountAddress: window.tronWeb.defaultAddress })
  );
};
