import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RiUserFill, RiPencilFill, RiLogoutBoxRLine } from 'react-icons/ri';

import { disconnectWallet } from 'actions/walletActions';

import FlexColumnWrapper from 'components/common/FlexColumnWrapper';

const NavProfileElementDropdownWrapper = styled.div`
  width: 150px;
  height: auto;
  padding: 10px 0;
  margin-top: 5px;
  position: absolute;
  display: block;
  right: 0;
  background: ${({ theme }) => theme.backgroundColors.secondary};
  border: 1px solid ${({ theme }) => theme.borderColors.tertiary}77;
  box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.03);
  border-radius: 4px;
  z-index: 10;

  div {
    margin-bottom: 12px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  div > a {
    width: 100%;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;

    display: flex;
    align-items: center;

    color: ${({ theme }) => theme.textColors.primary};
    text-transform: uppercase;
    text-decoration: none;

    svg {
      width: 16px;
      height: 16px;
      margin: 0 16px;
      color: ${({ theme }) => theme.accentColors.primary};
    }
  }
`;

interface NavProfileElementDropdownProps {
  user:
    | {
        isFetchingProfile: boolean;
        profile: any;
        error: null;
      }
    | {
        error: any;
        isFetchingProfile: boolean;
        profile: null;
      };
}

const NavProfileElementDropdown: React.VFC<NavProfileElementDropdownProps> = ({
  user,
}) => {
  const dispatch = useDispatch();

  return (
    <NavProfileElementDropdownWrapper>
      <FlexColumnWrapper>
        {Boolean(user?.profile) && (
          <>
            <div>
              <Link to={`/profile/${user?.profile?.userAccountHandle}`}>
                <RiUserFill />
                My Profile
              </Link>
            </div>
            <div>
              <Link to={`/profile/${user?.profile?.userAccountHandle}/edit`}>
                <RiPencilFill />
                Edit Profile
              </Link>
            </div>
          </>
        )}
        <div
          onClick={(e) => {
            e.stopPropagation();
            dispatch(disconnectWallet());
          }}
        >
          <Link to={`/`}>
            <RiLogoutBoxRLine />
            Logout
          </Link>
        </div>
      </FlexColumnWrapper>
    </NavProfileElementDropdownWrapper>
  );
};

export default NavProfileElementDropdown;
