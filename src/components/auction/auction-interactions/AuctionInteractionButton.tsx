import styled from 'styled-components';
import Spiner from 'components/Spinner'
const AuctionInteractionButtonWrapper = styled.div`
  width: 304px;
  height: 36px;
  margin-top: 36px;

  border: 2px solid #4085d9;
  box-sizing: border-box;
  border-radius: 4px;

  display: grid;
  place-items: center;
  position: relative;
  cursor: pointer;

  @media screen and (max-width: 399.99px) {
    width: 95%;
  }

  .label {
    min-width: 116px;
    height: 28px;
    background: ${({ theme }) => theme.backgroundColors.primary};

    display: grid;
    place-items: center;

    position: absolute;
    top: -26px;
    left: 22px;

    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.21px;
    color: ${({ theme }) => theme.textColors.primary};
  }

  .text {
    font-family: Inter;
    font-style: normal;
    font-weight: 60;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.21px;
    color: #4085d9;
    display:flex;
  }
`;

interface AuctionInteractionButtonProps {
  label: string;
  buttonText: string;
  isLoading?: boolean;
  loadingText?: string;
  onButtonClick: () => void;
}

const AuctionInteractionButton: React.VFC<AuctionInteractionButtonProps> = ({
  label,
  buttonText,
  isLoading = false,
  loadingText = '',
  onButtonClick,
}) => {
  return (
    <AuctionInteractionButtonWrapper onClick={onButtonClick}>
      {/* <div className="label">{label}</div> */}
      <div className="text">
        {
          !isLoading ? buttonText : 
          <><Spiner style={{width: 20, height: 20, marginRight:20}}/>{loadingText}</>
        }
      </div>
    </AuctionInteractionButtonWrapper>
  );
};

export default AuctionInteractionButton;
