import StickyFooter from 'react-sticky-footer';
import { CommentOutlined, ArrowForwardOutlined } from '@mui/icons-material';
import { useState } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from 'styled-components';

import ChatBox from './stickyChatBox'
const useStyles = makeStyles({
    chatButton: theme => ({
      color: theme.textColors.primary,
      height: 40,
      width: 40,
      zIndex:9999999
    }),
    fadeIn: theme => ({
        opacity:1,
        width:'35vw',
        position: 'relative',
        height:'60vh',
        background: 'rgba(255,255,255,0.9)',
        //background: theme.backgroundColors.secondary,
        border: 'solid',
        borderColor: theme.textColors.tertiary,
        borderRadius:'5px',
        transition: "width 0.5s, height 0.5s, opacity 0.5s 0.5s",
      }),
      fadeOut: {
        opacity:0,
        width:0,
        height:0,
        transition: 'width 0.5s 0.5s, height 0.5s 0.5s, opacity 0.5s',
      }       
  });
interface ToggleProps {
  auctionId: number;
  creatorAddress: string;
  nftTitle: string;
}

const PayDM: React.VFC<ToggleProps> = ({ auctionId, creatorAddress , nftTitle}) => {
    const [isOpen , setOpen] = useState(false);
    const openChatModal = () => {
        setOpen(!isOpen);
    }
    const theme = useTheme();
    const classes = useStyles(theme);
  return (
    <StickyFooter
        bottomThreshold={-10}
        normalStyles={{
            display: 'none',
            backgroundColor: "black",
            padding: "1rem"
        }}
        stickyStyles={{
            //backgroundColor: "rgba(255,255,255,.3)",
            padding: "0rem",
            //borderRadius: 13,
            //boxShadow: "5px 5px rgba(0,0,0,0.5)",
            right: 40, 
            marginBottom: 40,
            cursor: 'pointer'
        }}
    >
        <>
            <ChatBox
                classname = {isOpen?classes.fadeIn:classes.fadeOut} 
                isOpen={isOpen}
                nftTitle={nftTitle}
                auctionId = {auctionId}
                creatorAddress ={creatorAddress}
            />
            {isOpen ? <ArrowForwardOutlined className={classes.chatButton}  onClick = {()=>openChatModal()}/> :
            <CommentOutlined className={classes.chatButton}  onClick = {()=>openChatModal()}/>}
        </>
  </StickyFooter>
  );
};

export default PayDM;
