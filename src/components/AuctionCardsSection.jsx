import * as React from 'react';
// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SortIcon from '@mui/icons-material/Sort';
// import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

import { Fragment, useState } from 'react';
import styled from 'styled-components';

import AuctionCard from './AuctionCard';
// import { FaBullseye } from 'react-icons/fa';

const AuctionCardsSectionTitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 45px;
  margin-bottom: 52px;

  h2 {
    flex: 0 1 auto;
    font-family: Clash Grotesk;
    font-style: normal;
    font-weight: bold;
    font-size: 37px;
    line-height: 46px;
    text-transform: uppercase;
    white-space: nowrap;
    color: ${({ theme }) => theme.textColors.tertiary};
  }

  .line {
    margin-left: 40px;
    flex: 0 1 90%;
    height: 0px;
    border: 1px solid ${({ theme }) => theme.textColors.tertiary};
  }
`;

const AuctionCardsSectionWrapper = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(288px, 1fr));
  grid-column-gap: 24px;
  grid-row-gap: 45px;
  position: relative;

  .load-more-wrapper {
    margin-top: 15px;
    width: 100%;
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    align-items: center;

    .load-more {
      width: 209px;
      height: 50px;
      left: 616px;
      top: 2727px;

      border: 1px solid ${({ theme }) => theme.textColors.primary};
      box-sizing: border-box;
      border-radius: 4px;

      display: grid;
      place-items: center;

      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      text-align: center;
      letter-spacing: -0.21px;

      color: ${({ theme }) => theme.textColors.primary};
      cursor: pointer;
    }
  }
`;

const AuctionCardsSection = ({ auctions = []}) => {
  const [item_count, setItemCount] = useState(12);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleSortMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOnSortBy = (cond) => {
    if(cond === 0){
      auctions?.length > 0 && auctions.sort((a, b)=>{
        if(a.startPrice > b.startPrice) return 1;
        if(a.startPrice < b.startPrice) return -1;
        return 0;
      })
    }
    if(cond === 1){
      auctions?.length > 0 && auctions.sort((a, b)=>{        
        if(a.startPrice > b.startPrice) return -1;
        if(a.startPrice < b.startPrice) return 1;
        return 0;
      })
    }
    if(cond === 2){
      auctions?.length > 0 && auctions.sort((a, b)=>{
        if(a.createdAt > b.createdAt) return -1;
        if(a.createdAt < b.createdAt) return 1;
        return 0;
      })
    }
  }

  return (
    <Fragment>
      <AuctionCardsSectionTitleWrapper>
        <h2>All Auctions</h2>
        <div className="line" />
        <Stack spacing={2} direction="row" mt={2} sx={{margin : 2}}>
          {/* <Button variant="outlined">Contained</Button>
          <Button variant="outlined" startIcon={<CategoryOutlinedIcon/>}>Category</Button> */}
          <Button variant="outlined" onClick={handleSortMenuClick} startIcon={<SortIcon/>} sx={{width: 100}}>SortBy</Button>
        </Stack>
      </AuctionCardsSectionTitleWrapper>
      <AuctionCardsSectionWrapper>
        {auctions?.length > 0 &&
          auctions.map((auction, itemIdx) => (
            itemIdx < item_count && <AuctionCard
              key={auction._id}
              idx={auction.auctionIndex}
              isTrxAuction={auction?.isTrxAuction}
              assetType={auction.nftDetails.assetMimetype}
              assetIpfsHash={auction.nftDetails.assetIpfsHash}
              title={auction.nftDetails.assetName}
              price={auction.startPrice}
              creator={auction.userAccountHandle}
              profileImage={auction.userProfileImage}
              startsAt={auction.startTime}
              endsIn={auction.endsAt || auction.startTime + auction.duration}
            /> 
          ))}
        {item_count < auctions.length && <div className="load-more-wrapper">
          <div className="load-more" onClick={() => setItemCount(item_count + 12)}>
            Load More Auctions
          </div>
        </div>}
      </AuctionCardsSectionWrapper>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleSortMenuClose}
        onClick={handleSortMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={(e) => {e.preventDefault();handleOnSortBy(0);}}>
          Price : Low to High
        </MenuItem>
        <MenuItem onClick={(e) => {e.preventDefault();handleOnSortBy(1);}}>
          Price : High to Low
        </MenuItem>
        <MenuItem onClick={(e) => {e.preventDefault();handleOnSortBy(2);}}>
          Recently Added
        </MenuItem>
        <Divider />
      </Menu>
    </Fragment>
  );
};

export default AuctionCardsSection;
