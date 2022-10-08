import { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import BigNumber from 'bignumber.js';
import TronGrid from 'trongrid/dist/trongrid';

import BuyNowButton from './BuyNowButton';

import config from 'config';

import { auctionEngineContractInstance } from 'contract-interactions/instances/auctionEngineContractInstance';
import { claimTokens } from 'contract-interactions/claimTokens';
import { buyNowWithTRC20 } from 'contract-interactions/buyNowWithTRC20';
import { trc20TokenContractInstance } from 'contract-interactions/instances/trc20TokenContractInstance';
import { approveTrc20Spender } from 'contract-interactions/approveTrc20Spender';

const BuyNowTrc20Button = ({
  auctionId,
  currentBuyer,
  instantSalePrice,
  trc20TokenAddress,
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
      const contractInstance = await auctionEngineContractInstance();
      /* if (currentBuyer === window?.tronWeb?.defaultAddress.hex) {
        setBuyingNow(false);
        return alert('You are already the highest bidder');
      } */

      alert('Claim your previous TRC20 Tokens prior to placing new bid.');
      await claimTokens(contractInstance, auctionId);

      const trc20ContractInstance = await trc20TokenContractInstance(trc20TokenAddress);

      alert('Approve Auction to receive TRC20 Token transfer');
      await approveTrc20Spender({
        contractInstance: trc20ContractInstance,
        spenderAddress: config.masterAuctionContractAddress,
        amount: instantSalePrice.toFixed(),
      });
      alert('Approve your account to transfer TRC20 Tokens');
      await approveTrc20Spender({
        contractInstance: trc20ContractInstance,
        spenderAddress: window?.tronWeb?.defaultAddress?.base58,
        amount: instantSalePrice.toFixed(),
      });
      const buyTransactionId = await buyNowWithTRC20({
        contractInstance,
        auctionId,
        instantSalePrice: instantSalePrice.toFixed(),
      });
      const tronGrid = new TronGrid(window?.tronWeb);
      setTimeout(async () => {
        const events = await tronGrid.transaction.getEvents(buyTransactionId);
        if (events?.data?.length) {
          alert('Succeed to buy now.');
          setBuyingNow(false);
        } else {
          alert('Failed to buy now');
          setBuyingNow(false);
        }
      }, 20000);
    } catch (error) {
      console.log(error);
    }
  }, [
    auctionId,
    instantSalePrice,
    trc20TokenAddress,
  ]);

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
            This auction's instant sale price is {instantSalePrice} USDT.
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

export default BuyNowTrc20Button;
