import styled from 'styled-components';

import Spinner from 'components/Spinner';

const BuyNowButtonWrapper = styled.div`
  button {
    width: 150px;
    height: 47px;
    background: ${(props) => props.theme.accentColors.primary};
    border-radius: 5px;
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: IBM Plex Sans;
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    text-transform: uppercase;

    color: #ffffff;

    ${Spinner} {
      width: 20px;
      height: 20px;
      margin-right: 12px;
    }

    @media screen and (max-width: 767.99px) {
      width: 150px;
    }

    @media screen and (max-width: 594.99px) {
      margin-top: 20px !important;
    }
  }
`;

const BuyNowButton: React.VFC<{
  isLoading: boolean;
  onPlaceBid: React.MouseEventHandler;
}> = ({ isLoading, onPlaceBid }) => {
  return (
    <BuyNowButtonWrapper>
      <button onClick={onPlaceBid}>
        {isLoading ? (
          <>
            <Spinner />
            &nbsp;&nbsp;
          </>
        ) : null}
        Buy Now
      </button>
    </BuyNowButtonWrapper>
  );
};

export default BuyNowButton;
