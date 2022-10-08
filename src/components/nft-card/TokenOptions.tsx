import { useState } from 'react';
import styled from 'styled-components';

import { HiDotsVertical } from 'react-icons/hi';

import TokenOptionsDropdown from './TokenOptionsDropdown';

const TokenOptionsWrapper = styled.div<{ isDropdownShown: boolean }>`
  width: 30px;
  height: 20px;
  position: relative;
  float: right;
  cursor: pointer;

  .triple-dots {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    color: ${({ theme }) => theme.textColors.tertiary};
    background: ${({ isDropdownShown, theme }) =>
      isDropdownShown && theme.backgroundColors.secondary};
  }
`;

interface TokenOptionsProps {
  title: string;
  tokenId: number | string;
  nftDetails: any;
  onBurnTokenClick: (e: {
    tokenId: number | string;
    tokenName: string;
  }) => void;
}

const TokenOptions: React.VFC<TokenOptionsProps> = ({
  title,
  tokenId,
  nftDetails,
  onBurnTokenClick,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <TokenOptionsWrapper
      isDropdownShown={showDropdown}
      onClick={(e) => e.stopPropagation()}
    >
      <HiDotsVertical
        className="triple-dots"
        onClick={(e) => {
          e.stopPropagation();
          setShowDropdown((prevState) => !prevState);
        }}
      />
      {showDropdown && (
        <TokenOptionsDropdown
          title={title}
          tokenId={tokenId}
          nftDetails={nftDetails}
          onHideDropdown={() => setShowDropdown(false)}
          onBurnTokenClick={onBurnTokenClick}
        />
      )}
    </TokenOptionsWrapper>
  );
};

export default TokenOptions;
