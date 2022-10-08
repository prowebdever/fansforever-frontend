import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RiLogoutBoxRLine, RiPencilFill, RiUserFill } from 'react-icons/ri';
import { FaTelegramPlane, FaDiscord, FaMedium, FaYoutube, FaInstagram } from 'react-icons/fa';
import { SiTwitter } from 'react-icons/si';

import { RootState } from 'store';
import { disconnectWallet } from 'actions/walletActions';

import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/FlexRowWrapper';
import ConnectTrxWallet from 'components/navbar/NavConnectTrxWallet';
import NavProfileElement from 'components/navbar/NavProfileElement';

const NavSliderWrapper = styled.div<{ isOpen: boolean }>`
  background: ${({ theme }) => theme.backgroundColors.secondary};
  width: 70vw;
  min-width: 200px;
  height: calc(100vh - 50px);
  transition: all 0.45s ease-in-out;

  position: fixed;
  bottom: 0;
  right: ${(props) => (props.isOpen ? '0px' : '-200vw')};
  z-index: 110;

  display: none;

  @media screen and (max-width: 767.99px) {
    display: block;
  }

  & > ${FlexColumnWrapper} {
    width: auto;
    align-items: center;
    justify-content: center;

    img {
      margin-right: 56px;
      margin-left: 20px;
    }
    @media screen and (max-width: 767.99px) {
      margin: 0 auto;
    }
  }

  ul {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-flow: column wrap;

    margin: 20px 0;

    li {
      list-style: none;

      a {
        height: 50px;
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        font-family: IBM Plex Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        line-height: 19px;

        text-transform: uppercase;
        color: ${({ theme }) => theme.textColors.secondary};

        & > svg {
          margin-right: 24px;
        }
      }

      a.active {
        color: ${({ theme }) => theme.textColors.primary};
      }
    }
  }

  .create-nft-link {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    color: ${({ theme }) => theme.accentColors.primary} !important;
    text-transform: uppercase;
    text-decoration: none;
  }

  .connect-wallet-nav-slider {
    margin: 0 auto;
  }

  .social-links-slider {
    align-items: center;
    justify-content: center;

    .sociallink {
      display: grid;
      place-items: center;
      margin-right: 20px;
      cursor: pointer;
      color: rgba(0,0,0,0.3);
      svg {
        width: 22px;
        height: 22px;
        color: ${({ theme }) => theme.textColors.secondary};
      }
    }

    .sociallink:hover {
      display: grid;
      place-items: center;
      margin-right: 20px;
      cursor: pointer;
      color: red;
      svg {
        width: 22px;
        height: 22px;
        color: ${({ theme }) => theme.textColors.secondary};
      }
    }
  }
`;

interface NavSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavSlider: React.VFC<NavSliderProps> = ({ isOpen, onClose }) => {
  const user = useSelector((state: RootState) => state.user);
  const { isWalletConnected } = useSelector((state: RootState) => state.wallet);
  const dispatch = useDispatch();

  return (
    <NavSliderWrapper isOpen={isOpen}>
      <FlexColumnWrapper>
        <div>
          <ul>
            <li>
              <NavLink exact to="/" onClick={onClose}>
                Explore
              </NavLink>
            </li>
            {/* <li>
              <a href="https://fansforever.io/creators/" onClick={onClose}>
                Creators
              </a>
            </li> */}
            <li style={{ width: '100%' }}>
              <FlexRowWrapper className="social-links-slider">
                <FaDiscord className="sociallink" onClick={(e)=>{e.preventDefault();window.open("https://discord.com/", '_blank')}}/>
                <SiTwitter className="sociallink" onClick={(e)=>{e.preventDefault();window.open("https://twitter.com/thefandao", '_blank')}}/>
                <FaTelegramPlane className="sociallink" onClick={(e)=>{e.preventDefault();window.open("https://t.me/thefandiscussion", '_blank')}}/>
                <FaMedium className="sociallink" onClick={(e)=>{e.preventDefault();window.open("https://Medium.com/", '_blank')}}/>
                <FaYoutube className="sociallink" onClick={(e)=>{e.preventDefault();window.open("https://www.youtube.com/", '_blank')}}/>
                <FaInstagram className="sociallink" onClick={(e)=>{e.preventDefault();window.open("https://www.instagram.com", '_blank')}}/>
              </FlexRowWrapper>
            </li>
          </ul>
          <NavProfileElement dropdownEnabled={false} />
          {Boolean(user?.profile) ? (
            <ul>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                {Boolean(user?.profile) && isWalletConnected && (
                  <NavLink className="create-nft-link" to="/nft/create" exact>
                    Create NFT
                  </NavLink>
                )}
              </li>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                <NavLink
                  to={`/profile/${user?.profile?.userAccountHandle}`}
                  exact
                >
                  <RiUserFill />
                  My Profile
                </NavLink>
              </li>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                <NavLink
                  to={`/profile/${user?.profile?.userAccountHandle}/edit`}
                  exact
                >
                  <RiPencilFill />
                  Edit Profile
                </NavLink>
              </li>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(disconnectWallet());
                  onClose();
                }}
              >
                <Link to={`/`}>
                  <RiLogoutBoxRLine />
                  Logout
                </Link>
              </li>
            </ul>
          ) : null}
        </div>
      </FlexColumnWrapper>
      <ConnectTrxWallet
        className="connect-wallet-nav-slider"
        onClick={onClose}
      />
    </NavSliderWrapper>
  );
};

export default NavSlider;
