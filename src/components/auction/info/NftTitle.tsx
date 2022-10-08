import styled from 'styled-components';

const NftTitleWrapper = styled.div`
  max-width: 400px;
  border-bottom: solid 1px rgba(0,0,0,0.2);
  @media screen and (max-width: 575.99px) {
    width: 95%;
    max-width: 95%;
    border-bottom: solid 1px rgba(0,0,0,0.2);
  }

  h1 {
    width: 100%;
    font-family: Clash Grotesk;
    font-weight: 500;
    font-size: 48px;
    line-height: 100px;
    text-transform: capitalize;
    color: ${({ theme }) => theme.textColors.primary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const NftTitle: React.VFC<{ nftTitle: string }> = ({ nftTitle }) => {
  return (
    <NftTitleWrapper>
      <h1>{nftTitle}</h1>
    </NftTitleWrapper>
  );
};

export default NftTitle;
