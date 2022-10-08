import { useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { HiTrash } from 'react-icons/hi';
import { RiAuctionLine } from 'react-icons/ri';

import useOutsideClick from 'hooks/useOutsideClick';

import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/FlexRowWrapper';

const TokenOptionsDropdownWrapper = styled.div`
  display: block;
  position: absolute;
  width: 150px;
  background: ${({ theme }) => theme.backgroundColors.secondary};
  border: 1px solid ${({ theme }) => theme.borderColors.tertiary}77;
  box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.03);
  border-radius: 4px;
  margin-top: 4px;
  right: -30px;
  z-index: 100;
  padding: 12px;

  ${FlexRowWrapper} {
    align-items: center;
    margin-bottom: 12px;

    &:last-of-type {
      margin-bottom: 0;
    }

    svg {
      width: 16px;
      height: 16px;
      margin-right: 12px;
      color: ${({ theme }) => theme.accentColors.primary};
    }

    p {
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 10px;
      line-height: 12px;
      color: ${({ theme }) => theme.textColors.primary};
      text-transform: uppercase;
    }
  }
`;

interface TokenOptionsDropdownProps {
  title: string;
  tokenId: number | string;
  nftDetails: any;
  onHideDropdown: () => void;
  onBurnTokenClick: (e: {
    tokenId: number | string;
    tokenName: string;
  }) => void;
}

const TokenOptionsDropdown: React.VFC<TokenOptionsDropdownProps> = ({
  title,
  tokenId,
  nftDetails,
  onHideDropdown,
  onBurnTokenClick,
}) => {
  const history = useHistory();

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    onHideDropdown();
  });
  return (
    <TokenOptionsDropdownWrapper>
      <div className="dropdown" ref={ref}>
        <FlexColumnWrapper>
          {!nftDetails?.isMovedToAuction && (
            <FlexRowWrapper
              onClick={(e) => {
                e.stopPropagation();
                history.push({
                  pathname: `/auction/create/${tokenId}`,
                });
              }}
            >
              <RiAuctionLine />
              <p>Move to Auction</p>
            </FlexRowWrapper>
          )}
          {!nftDetails?.isMovedToAuction && (
            <FlexRowWrapper
              onClick={(e) => {
                e.stopPropagation();
                onBurnTokenClick({ tokenId, tokenName: title });
              }}
            >
              <HiTrash />
              <p>Delete</p>
            </FlexRowWrapper>
          )}
        </FlexColumnWrapper>
      </div>
    </TokenOptionsDropdownWrapper>
  );
};

export default TokenOptionsDropdown;
