import styled from 'styled-components';

const NftDescriptionWrapper = styled.div`
  max-width: 596px;
  height: 30vh;
  overflow: auto;
  font-family: Inter;
  font-size: 20px;
  line-height: 33px;
  letter-spacing: -0.21px;
  margin-top: 20px;
  border-bottom: solid 1px rgba(0,0,0,0.2);
  color: ${({ theme }) => theme.textColors.secondary};

  @media screen and (max-width: 594.99px) {
    font-size: 16px;
    line-height: 24px;
    border-bottom: solid 1px rgba(0,0,0,0.2);
  }
`;

const NftDescription: React.FC = ({ children }) => {
  return <NftDescriptionWrapper>{children}</NftDescriptionWrapper>;
};

export default NftDescription;
