import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'store';

import Container from 'components/layout/Container';
import FlexColumnContainer from 'components/common/FlexColumnWrapper';

import addMessage from 'assets/icons/add-message.svg';

const NoNFTsAddedWrapper = styled.div`
  width: 100%;

  ${FlexColumnContainer} {
    width: 100%;
    padding: 50px 0 116px 0;
    justify-content: center;
    align-items: center;
  }

  .img {
    margin-bottom: 38px;
  }

  h2 {
    font-family: 'Space Grotesk';
    font-style: normal;
    font-weight: bold;
    font-size: 35px;
    line-height: 45px;
    color: ${({ theme }) => theme.textColors.secondary};
    margin-bottom: 24px;
  }

  .link-button {
    width: 152.76px;
    height: 49px;
    cursor: pointer;

    background: ${({ theme }) => theme.accentColors.primary};
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    border-radius: 67px;
    margin-bottom: 30px;

    display: grid;
    place-items: center;
  }

  a {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 150%;
    color: ${({ theme }) => theme.textColors.primary};
    text-transform: uppercase;
    text-decoration: none;
  }
`;

const NoNFTsAdded: React.VFC = () => {
  const { isWalletConnected } = useSelector((state: RootState) => state.wallet);
  const user = useSelector((state: RootState) => state.user);

  const location = useLocation();

  return (
    <NoNFTsAddedWrapper>
      <Container>
        <FlexColumnContainer>
          <img src={addMessage} alt="" />
          <h2>No NFTs Added</h2>
          {isWalletConnected &&
            location.pathname ===
              `/profile/${user?.profile?.userAccountHandle}` && (
              <Link className="link-button" to="/nft/create">
                Mint NFT
              </Link>
            )}
          <Link to="/">Buy NFT</Link>
        </FlexColumnContainer>
      </Container>
    </NoNFTsAddedWrapper>
  );
};

export default NoNFTsAdded;
