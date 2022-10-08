import { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'react-responsive-modal';

import FlexColumnWrapper from '../common/FlexColumnWrapper';
import FlexRowWrapper from '../common/FlexRowWrapper';

import Spinner from '../Spinner';

const ModalContentWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: column nowrap;

  input {
    width: 100%;
    padding-bottom: 18px;
    margin-top: 30px;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 1);
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.16);

    &:active,
    &:focus {
      background: none;
    }

    ::placeholder {
      color: rgba(255, 255, 255, 0.46);
      opacity: 1;
    }
    :-ms-input-placeholder {
      color: rgba(255, 255, 255, 0.46);
    }
    ::-ms-input-placeholder {
      color: rgba(255, 255, 255, 0.46);
    }
  }

  .action {
    width: 90%;

    .title {
      font-family: Space Grotesk;
      font-style: normal;
      font-weight: 600;
      font-size: 25px;
      line-height: 32px;
      color: #ffffff;
    }

    .description {
      width: 100%;
      font-family: Space Grotesk;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.45);
      margin-top: 4px;
    }
  }
`;

const ModalButton = styled.button<{ isComplete: boolean }>`
  width: 80%;
  height: 50px;
  background: ${(props) => (props.isComplete ? '#FFA6BB' : '#ff3465')};
  border-radius: 54px;
  font-family: Space Grotesk;
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  color: ${(props) => (props.isComplete ? ' #A6475E' : '#ffffff')};
  border: none;
  outline: none;
  cursor: pointer;
  margin: 22px auto 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    cursor: not-allowed;
    background-color: #ffa6bb;
  }

  ${Spinner} {
    width: 30px;
    height: 30px;
  }
`;

interface BurnTokenModalProps {
  open: boolean;
  onClose: () => void;
  onBurnToken: () => void;
  isBurningToken: boolean;
  tokenName: string;
}

const BurnTokenModal: React.VFC<BurnTokenModalProps> = ({
  open,
  onClose,
  onBurnToken,
  isBurningToken,
  tokenName,
}) => {
  const [input, setInput] = useState('');

  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      closeOnEsc={!isBurningToken}
      closeOnOverlayClick={!isBurningToken}
      showCloseIcon={!isBurningToken}
      styles={{
        modal: {
          width: '100%',
          maxWidth: '425px',
          height: '306px',

          background: '#405067',
          borderRadius: '8px',
        },
      }}
    >
      <ModalContentWrapper>
        <FlexColumnWrapper className="action">
          <div className="title">Burn `{tokenName}`</div>
          <div className="description">
            Enter `<em>burn</em>` down below to confirm your action.
          </div>
          <FlexRowWrapper>
            <input
              type="text"
              placeholder="burn"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
            />
          </FlexRowWrapper>
          <FlexRowWrapper>
            <ModalButton
              onClick={onBurnToken}
              isComplete={false}
              disabled={input !== 'burn' || isBurningToken}
            >
              {isBurningToken ? (
                <>
                  <Spinner />
                  &nbsp;&nbsp;Burning Token...
                </>
              ) : (
                <>Burn Token</>
              )}
            </ModalButton>
          </FlexRowWrapper>
        </FlexColumnWrapper>
      </ModalContentWrapper>
    </Modal>
  );
};

export default BurnTokenModal;
