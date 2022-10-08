import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

import { RootState } from 'store';

import useOutsideClick from 'hooks/useOutsideClick';
import { getProfileActionAsync } from 'actions/userActions';

import FlexRowWrapper from 'components/common/FlexRowWrapper';
import NavProfileElementDropdown from './NavProfileElementDropdown';

import { ReactComponent as CaretDown } from 'assets/icons/caret-down.svg';

const NavProfileElementWrapper = styled.div`
  position: relative;
  cursor: pointer;

  ${FlexRowWrapper} {
    width: auto;
    align-items: center;
    padding: 10px 15px;

    .profile-image {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 16px;
      color: ${({ theme }) => theme.textColors.secondary};
    }

    & > div {
      margin-right: 10px;

      .username,
      .crypto-address {
        min-width: 66px;
        max-width: 100px;
      }

      .username {
        font-family: IBM Plex Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 16px;
        text-transform: uppercase;
        color: ${({ theme }) => theme.textColors.primary};
        margin-bottom: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .crypto-address {
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 10px;
        line-height: 12px;
        color: ${({ theme }) => theme.textColors.secondary};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .caret-down {
      color: ${({ theme }) => theme.textColors.primary};
    }
  }
`;

const NavProfileElement: React.VFC<{ dropdownEnabled?: boolean }> = ({
  dropdownEnabled = true,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const wallet = useSelector((state: RootState) => state.wallet);
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setShowDropdown(false);
  });

  useEffect(() => {
    if (wallet.isWalletConnected) {
      dispatch(getProfileActionAsync());
    }
  }, [wallet, dispatch]);

  useEffect(() => {
    if (!user.profile && user.error) {
      history.push('/profile/create');
    }
  }, [user, history]);

  return wallet.isWalletConnected ? (
    <NavProfileElementWrapper
      ref={ref}
      onClick={() =>
        dropdownEnabled ? setShowDropdown((prevState) => !prevState) : null
      }
    >
      <FlexRowWrapper>
        {Boolean(user?.profile?.userProfileImageUrl) ? (
          <img
            src={user?.profile?.userProfileImageUrl?.replace(
              'ipfs.io',
              'fansforever.mypinata.cloud'
            )}
            alt=""
            className="profile-image"
          />
        ) : (
          <FaUserCircle className="profile-image" />
        )}
        <div>
          <h4 className="username">
            {user?.profile?.username || window?.tronWeb?.defaultAddress?.name}
          </h4>
          <p className="crypto-address">
            {user?.profile?.userCryptoAddress ||
              window?.tronWeb?.defaultAddress?.base58}
          </p>
        </div>
        {dropdownEnabled ? <CaretDown className="caret-down" /> : null}
      </FlexRowWrapper>
      {showDropdown && <NavProfileElementDropdown user={user} />}
    </NavProfileElementWrapper>
  ) : null;
};

export default NavProfileElement;
