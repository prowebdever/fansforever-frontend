import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';

import Container from 'components/layout/Container';
import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/FlexRowWrapper';
// import ProfileCard from 'components/profile/ProfileCard';
import UserProfileData from 'components/profile/UserProfileData';
import NFTSection from 'components/NFTSection';
// import Banner from 'components/Banner';
import AnimatedSphere from 'components/AnimatedSphere';

import profileBanner from 'assets/banner/banner.png';
// import FollowButton from 'components/profile/FollowButton';
// import Footer from 'components/layout/Footer';
import useAccountHandleProfileQuery from 'hooks/profile/useAccountHandleProfileQuery';
import config from 'config';

const ProfilePageWrapper = styled.div`
  min-height: calc(100vh - 50px);
  background: ${({ theme }) => theme.backgroundColors.primary};
  padding-bottom: 68px;

  .profile-banner {
    width: 100%;
    height: 326px;
    background-image: url('${profileBanner}');

    justify-content: center;
    position: relative;

    @media screen and (max-width: 991.99px) {
      height: 306px;
    }
  }

  .grid-layout {
    display: grid;
    grid-template-columns: auto;
    grid-column-gap: 30px;

    @media screen and (max-width: 1280px) {
      margin: 0 15px;
    }

    @media screen and (max-width: 767.99px) {
      grid-template-columns: auto;
    }

    .grid-column-1 {
      @media screen and (max-width: 767.99px) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      & > div {
        margin-top: -150px;
      }
    }

    .grid-column-2 {
      .tabs-row {
        padding: 32px 12px 18px 12px;
        margin-bottom: 32px;
        border-bottom: 1px solid ${({ theme }) => theme.borderColors.tertiary};
        justify-content: space-between;
        flex-flow: row wrap;

        @media screen and (max-width: 1280px) {
          padding: 32px 0 18px 0;
        }

        ${FlexRowWrapper} {
          width: auto;
          align-items: center;
          justify-content: flex-start;
          flex-flow: row wrap;

          @media screen and (max-width: 991.99px) {
            width: 100%;
            justify-content: space-evenly;
          }

          &:first-of-type {
            @media screen and (max-width: 991.99px) {
              margin-bottom: 12px;
            }
          }

          &:last-of-type {
            @media screen and (max-width: 991.99px) {
              justify-content: flex-end;
            }
          }
        }

        .tab {
          font-family: Inter;
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          line-height: 22px;

          @media screen and (max-width: 991.99px) {
            margin-bottom: 12px;
          }

          letter-spacing: -0.21px;
          color: ${({ theme }) => theme.textColors.primary};
          cursor: pointer;
          margin-right: 32px;
        }

        .tab.tab-blocked {
          color: ${({ theme }) => theme.textColors.tertiary};
        }
      }
    }
  }
`;

const ProfilePage: React.VFC = () => {
  const { handle: userAccountHandle } = useParams<{ handle: string }>();
  const history = useHistory();
  const { isIdle, data, isLoading, isFetched, isError } =
    useAccountHandleProfileQuery({ userAccountHandle });

  const userProfile = useMemo(() => (data?.data ? data.data : null), [data]);
  useEffect(() => {
    if (isError) {
      history.replace('/');
    }
  }, [isError, history]);
  const [nftstate, setNftState] = useState(0);
  useEffect(() => {
    if (!isIdle && isFetched && !data?.data) {
      history.replace('/');
    }
  }, [isIdle, isFetched, data, history]);

  if (isLoading || !isFetched || !userProfile) return <AnimatedSphere />;

  const viewNft = (_t) =>{
    setNftState(_t)
  }
  return (
    <ProfilePageWrapper>
      <div className="profile-banner" />
      <Container>
        <main className="grid-layout">
          {/* <aside className="grid-column-1"> */}
            <UserProfileData
              profileImg={userProfile.userProfileImageUrl}
              profileName={userProfile.username}
              walletAddress={userProfile.userCryptoAddress}
              bio={userProfile.userDescription}
              facebookUrl={userProfile.userSocials.facebook}
              twitterUrl={userProfile.userSocials.twitter}
              instagramUrl={userProfile.userSocials.instagram}
              youtubeUrl={userProfile.userSocials.youtube}
              spotifyUrl={userProfile.userSocials.spotify}
              isVerified={userProfile.isVerified}
              profile={userProfile}
            />
          {/* </aside> */}
          <article className="grid-column-2">
            <FlexColumnWrapper>
              <FlexRowWrapper className="tabs-row">
                <FlexRowWrapper>
                  <div className={nftstate ===0?"tab":"tab tab-blocked"} onClick={(e)=>viewNft(0)} >ALL</div>
                  <div className={nftstate ===1?"tab":"tab tab-blocked"} onClick={(e)=>viewNft(1)} >MINTED</div>
                  <div className={nftstate ===2?"tab":"tab tab-blocked"} onClick={(e)=>viewNft(2)} >ON SALE</div>
                </FlexRowWrapper>
                <FlexRowWrapper>
                  {/* <FollowButton onFollow={() => console.log('clicked')} /> */}
                </FlexRowWrapper>
              </FlexRowWrapper>
              <NFTSection
                walletAddr={userProfile.userCryptoAddress}
                contractAddr={
                  userProfile.userContractAddress ??
                  config.justFanCollectionContractAddress
                }
                nftstate = {nftstate}
              />
            </FlexColumnWrapper>
          </article>
        </main>
      </Container>
      {/* <Banner /> */}
      {/* <Footer /> */}
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
