import styled from 'styled-components';

const BidsPlacedWrapper = styled.div`
  width: auto;

  p {
    font-family: Inter;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.21px;
    color: ${({ theme }) => theme.textColors.tertiary};
    text-transform: capitalize;

    span {
      color: ${({ theme }) => theme.textColors.primary};
    }

    @media screen and (max-width: 594.99px) {
      margin-top: 20px;
    }
  }
`;

const BidsPlaced: React.VFC<{ bidCount: number }> = ({ bidCount }) => {
  return (
    <BidsPlacedWrapper>
      <p>
        <span>{bidCount}</span>&nbsp;
        {bidCount === 1 ? 'bid' : 'bids'} placed
      </p>
    </BidsPlacedWrapper>
  );
};

export default BidsPlaced;
