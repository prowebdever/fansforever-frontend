import { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import BigNumber from 'bignumber.js';

import BuyNowButton from './BuyNowButton';

import { auctionEngineContractInstance } from 'contract-interactions/instances/auctionEngineContractInstance';
import { claimTokens } from 'contract-interactions/claimTokens';
import { buyNowWithTRX } from 'contract-interactions/buyNowWithTRX';

const BuyNowTrxButton = ({
  auctionId,
  tokenId,
  instantSalePrice,
  creatorWalletAddress,
  buyInfo
}) => {
  const [isBuyingNow, setBuyingNow] = useState(false);

  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleConfirmDialogOpen = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  const handleBuyNow = useCallback(async () => {
    try {
      setConfirmDialogOpen(false);
      setBuyingNow(true);
      let _instantSalePrice = new BigNumber(instantSalePrice).multipliedBy('1e+6');
      const contractInstance = await auctionEngineContractInstance();
      await claimTokens(contractInstance, auctionId);
      await buyNowWithTRX({
        contractInstance,
        auctionId,
        instantSalePrice: _instantSalePrice.toFixed()
      });
      alert('Succeeded to buy now.');
      setBuyingNow(false);
    } catch (error) {
      setBuyingNow(false);
      console.error(error);
    }
  }, [auctionId, instantSalePrice]);

  return (
    <>
    <Dialog
      open={isConfirmDialogOpen}
      onClose={handleConfirmDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure to buy now?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This auction's instant sale price is {instantSalePrice} TRX.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmDialogClose}>Disagree</Button>
        <Button onClick={handleBuyNow} autoFocus>Agree</Button>
      </DialogActions>
    </Dialog>
    <BuyNowButton isLoading={isBuyingNow} onPlaceBid={handleConfirmDialogOpen} />
    </>
  );
};

export default BuyNowTrxButton;
