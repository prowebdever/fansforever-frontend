import styled, { useTheme } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { RootState } from 'store';
import { hideConnectWalletModal } from 'actions/walletActions';

const ModalContentWrapper = styled.div`
  h3 {
    font-size: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.textColors.tertiary};
    padding: 20px;
  }

  p {
    padding: 20px;

    &:first-of-type {
      font-size: 20px;
      padding: 50px 20px;
      border-bottom: 1px solid ${({ theme }) => theme.textColors.tertiary};
    }
  }

  a {
    color: ${({ theme }) => theme.accentColors.primary};
    text-decoration: underline;
  }
`;

const ConnectWalletModal: React.VFC = () => {
  const { isWalletConnected, showConnectWalletModal } = useSelector(
    (state: RootState) => state.wallet
  );

  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Modal
      open={!isWalletConnected && showConnectWalletModal}
      onClose={() => dispatch(hideConnectWalletModal())}
      center
      styles={{
        modalContainer: {
          background: 'rgba(255, 255, 255, 0.1)',
        },
        modal: {
          padding: 0,
          background: theme.backgroundColors.secondary,
          color: theme.textColors.primary,
          width: '80%',
          maxWidth: '500px',
          borderRadius: '10px',
        },
        closeButton: {
          background: theme.backgroundColors.secondary,
          borderRadius: '50%',
        },
      }}
    >
      <ModalContentWrapper>
        <h3>TronLink Account Required!</h3>
        <p>Log into your TronLink Wallet to continue.</p>
        <p>
          Or download the extension from{' '}
          <a
            href="https://www.tronlink.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.tronlink.org/
          </a>
        </p>
      </ModalContentWrapper>
    </Modal>
  );
};

export default ConnectWalletModal;
