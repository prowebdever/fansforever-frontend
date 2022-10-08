import styled, { useTheme } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { RootState } from 'store';
import { hideSelectWalletModal } from 'actions/walletActions';
import { hideSelectWalletModalandshowprogressModal } from 'actions/walletActions';


const SelectWalletWrapper = styled.div`
  h3 {
    font-size: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.textColors.tertiary};
    padding: 20px;
  }

  .wallet {
    font-size: 20px;
    padding: 20px 20px;
    border-bottom: 1px solid ${({ theme }) => theme.textColors.tertiary};
    cursor: pointer;
  }
`;

const SelectWalletModal: React.VFC = () => {
  const { showSelectWalletModal } = useSelector(
    (state: RootState) => state.wallet
  );
  const theme = useTheme();
  const dispatch = useDispatch();

  const onTonlinkClickHandler = () =>{
    dispatch(hideSelectWalletModalandshowprogressModal(true))
  }
  return (
    <Modal
      open={showSelectWalletModal}
      onClose={() => dispatch(hideSelectWalletModal(false))}
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
      <SelectWalletWrapper>
        <h3>Select the Wallet</h3>
        <div className="wallet" onClick={onTonlinkClickHandler}>TronLink wallet</div>
        <div className="wallet"  onClick={()=>{alert("comming soon!")}} >Klever wallet</div>
      </SelectWalletWrapper>
    </Modal>
  );
};

export default SelectWalletModal;
