import { useState } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { FaTelegramPlane, FaDiscord, FaMedium, FaYoutube, FaInstagram } from 'react-icons/fa';
import { SiTwitter } from 'react-icons/si';
import { GiHamburgerMenu } from 'react-icons/gi';

// import { RootState } from 'store';

import Container from './Container';
import FlexRowWrapper from 'components/common/FlexRowWrapper';
import ConnectTrxWallet from 'components/navbar/NavConnectTrxWallet';
import NavProfileElement from 'components/navbar/NavProfileElement';
import NavSlider from './NavSlider';

import { ReactComponent as FanLogo } from 'assets/logos/fan_logo.svg';
// import { ReactComponent as CoinMarketCapLogo } from 'assets/icons/coinmarketcap.svg';
// import ThemeToggle from 'components/ThemeToggle';
import ThemeToggle1 from 'components/ThemeToggle1';
import SearchForm from 'components/common/SearchBar'
const NavbarWrapper = styled.nav`
  width: 100%;
  height: 50px;
  left: 0px;
  top: 0px;
  z-index: 150;

  background: ${({ theme }) => theme.backgroundColors.primary};
  border-bottom: 2px solid ${({ theme }) => theme.borderColors.tertiary};

  @media screen and (max-width: 767.99px) {
    position: sticky;
  }

  ${Container} {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > ${FlexRowWrapper}:nth-of-type(1) {
      width: auto;
      align-items: center;

      svg {
        margin-right: 56px;
        margin-left: 20px;
        color: ${({ theme }) => theme.accentColors.primary};

        @media screen and (max-width: 767.99px) {
          margin: 0 auto;
        }
      }

      @media screen and (max-width: 767.99px) {
        padding: 0 24px;
      }
    }
    & > ${FlexRowWrapper}:nth-of-type(2) {
      width: auto;
      align-items: center;
    }

    ul {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-flow: row wrap;

      @media screen and (max-width: 767.99px) {
        display: none;
      }

      li {
        list-style: none;
        margin-right: 36px;
        a {
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
        }

        a.active {
          color: ${({ theme }) => theme.textColors.primary};
        }
      }
    }
  }

  .connect-wallet-button {
    @media screen and (max-width: 767.99px) {
      display: none;
    }
  }

  .menu-icon {
    display: none;
    position: absolute;
    right: 32px;
    color: ${({ theme }) => theme.textColors.primary} !important;
    width: 24px;
    height: 24px;
    cursor: pointer;

    @media screen and (max-width: 767.99px) {
      display: block;
    }
  }

  .create-nft {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 16px;
    color: ${({ theme }) => theme.accentColors.primary};
    text-transform: uppercase;
    text-decoration: none;
    margin-right: 20px;

    @media screen and (max-width: 767.99px) {
      display: none;
    }
  }

  .social-links-row {
    width: auto;
    align-items: center;
    margin-left: 20px;

    @media screen and (max-width: 767.99px) {
      display: none;
    }

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

  .toggle-theme-wrapper {
    @media screen and (max-width: 767.99px) {
      position: absolute;
      right: 150px;
    }
    @media screen and (max-width: 575.99px) {
      position: absolute;
      right: 60px;
    }
  }
  .profile-element-wrapper {
    @media screen and (max-width: 767.99px) {
      display: none;
    }
  }
`;

const Navbar: React.VFC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
  const [sliderOpen, setSliderOpen] = useState(false);

  // const user = useSelector((state: RootState) => state.user);

  return (
    <NavbarWrapper>
      <Container>
        <FlexRowWrapper>
          <Link to="/">
            <FanLogo />
          </Link>
          <div>
            <ul>
              <li>
                <NavLink exact to="/">
                  Explore
                </NavLink>
              </li>
              {/* <li>
                <a href="https://fansforever.io/creators/">Creators</a>
              </li> */}
            </ul>
          </div>
          <SearchForm />
          <GiHamburgerMenu
            className="menu-icon"
            onClick={() => setSliderOpen((prevState) => !prevState)}
          />
        </FlexRowWrapper>
        <FlexRowWrapper>
          {/* <div className="toggle-theme-wrapper">
            <ThemeToggle toggleTheme={toggleTheme} />
          </div> */}
          <FlexRowWrapper className="social-links-row">
              <FaDiscord className="sociallink" onClick={(e)=>{e.preventDefault();window.open("https://discord.com/", '_blank')}}/>
              <SiTwitter className="sociallink" onClick={(e)=>{e.preventDefault();window.open("https://twitter.com/thefandao", '_blank')}}/>
              <FaTelegramPlane className="sociallink" onClick={(e)=>{e.preventDefault();window.open("https://t.me/thefandiscussion", '_blank')}}/>
              <FaMedium className="sociallink" onClick={(e)=>{e.preventDefault();window.open("https://Medium.com/", '_blank')}}/>
              <FaYoutube className="sociallink" onClick={(e)=>{e.preventDefault();window.open("https://www.youtube.com/", '_blank')}}/>
              <FaInstagram className="sociallink" onClick={(e)=>{e.preventDefault();window.open("https://www.instagram.com", '_blank')}}/>

          </FlexRowWrapper>
          {/* {Boolean(user?.profile) && isWalletConnected && ( */}
            <NavLink className="create-nft" to="/nft/create">
              Create NFT
            </NavLink>
          {/* )} */}
          <ConnectTrxWallet className="connect-wallet-button" />
          <div className="profile-element-wrapper">
            <NavProfileElement />
          </div>
          <div className="toggle-theme-wrapper">
            <ThemeToggle1 toggleTheme={toggleTheme} />
          </div>
        </FlexRowWrapper>
      </Container>
      <NavSlider isOpen={sliderOpen} onClose={() => setSliderOpen(false)} />
    </NavbarWrapper>
  );
};

export default Navbar;
