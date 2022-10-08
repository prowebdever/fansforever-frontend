import config from 'config';
import { showConnectWalletModal } from './walletActions';

export const FETCHING_PROFILE = 'FETCHING_PROFILE';
export const FETCHED_PROFILE = 'FETCHED_PROFILE';
export const SET_PROFILE = 'SET_PROFILE';
export const FETCHING_PROFILE_FAILED = 'FETCHING_PROFILE_FAILED';

export const setProfileAction = (payload) => ({
  type: SET_PROFILE,
  payload,
});

export const getProfileActionAsync = () => async (dispatch, getState) => {
  try {
    const { isWalletConnected } = getState().wallet;
    if (isWalletConnected && window?.tronWeb?.ready) {
      dispatch({
        type: FETCHING_PROFILE,
      });
      const response = await fetch(
        `${config.apiBaseUrl}/profile?userCryptoAddress=${window?.tronWeb?.defaultAddress?.base58}`
      );
      const ok = response.ok;
      const result = await response.json();
      if (ok) {
        dispatch({
          type: SET_PROFILE,
          payload: result,
        });
      } else {
        dispatch({
          type: FETCHING_PROFILE_FAILED,
          payload: 'Not Found',
        });
      }
    } else {
      dispatch(showConnectWalletModal());
    }
  } catch (error) {
    dispatch({
      type: FETCHING_PROFILE_FAILED,
      payload: 'Failed to fetch Profile',
    });
  }
};
