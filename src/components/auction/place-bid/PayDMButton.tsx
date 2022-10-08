import styled from 'styled-components';


const PayDMButtonWrapper = styled.div`
  button {
    width: 108px;
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

    @media screen and (max-width: 767.99px) {
      width: 100%;
    }

    @media screen and (max-width: 594.99px) {
      margin-top: 20px !important;
    }
  }
`;

const PayDMButton: React.VFC<{
  auctionId: number;
  ownerAddress:string;
}> = ({ auctionId, ownerAddress }) => {
  return (
    <PayDMButtonWrapper>
      <button>
       PAY&DM
      </button>
    </PayDMButtonWrapper>
  );
};

export default PayDMButton;
