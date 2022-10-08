import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';

import { setWalletConnectedAsync } from 'actions/walletActions';

const ConnectTrxWalletButton = styled.button`
  border: none;
  outline: none;

  border: 1px solid ${({ theme }) => theme.textColors.secondary};
  box-sizing: border-box;
  border-radius: 56px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 135px;
  height: 28px;
  background-color: transparent;

  z-index: 100;

  text-transform: uppercase;
  font-family: IBM Plex Sans;
  font-weight: 600;
  font-size: 13px;
  line-height: 17px;

  text-transform: uppercase;
  color: ${({ theme }) => theme.textColors.primary};
  cursor: pointer;
`;

const NavConnectTrxWallet: React.VFC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ ...props }) => {
  const { isWalletConnected } = useSelector((state: RootState) => state.wallet);

  const dispatch = useDispatch();

  return !isWalletConnected ? (
    <ConnectTrxWalletButton
      {...props}
      onClick={() => dispatch(setWalletConnectedAsync())}
    >
      Connect Wallet
    </ConnectTrxWalletButton>
  ) : null;
};

export default NavConnectTrxWallet;
