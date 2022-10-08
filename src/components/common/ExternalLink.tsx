import styled from 'styled-components';

const AuctionExternalLink = styled.a`
  width: 304px;
  height: 36px;
  position: relative;
  text-decoration: none;
  margin-top: 22px;

  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.21px;
  color: ${({ theme }) => theme.textColors.primary};
  border: 1px solid ${({ theme }) => theme.textColors.primary};
  border-radius: 6px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;

  svg {
    position: absolute;
    left: 22px;
    color: ${({ theme }) => theme.textColors.primary};
  }

  @media screen and (max-width: 399.99px) {
    width: 95%;
  }
`;

export default AuctionExternalLink;
