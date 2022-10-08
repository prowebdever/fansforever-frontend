import styled, { useTheme } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { RootState } from 'store';
import { showOwnerChatModal } from 'actions/userActions';
import useGetChatDataQuery from 'hooks/chat/useGetChatData'
import { useState, useEffect } from 'react';
import { addMessagehandler } from 'apis/chatAPI';
const OwnerChatModalWrapper = styled.div`
  h3 {
    font-size: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.textColors.tertiary};
    padding: 20px;
  }

  .container {
    height: 450px;
    display: grid;
    grid-template-columns: 30% auto;
  }
  .buyer {
        // display: flex;
        background: rgba(34,43,56,0.5);
        border-right: solid 2px black ;
        box-shadow: 12px rgba(0,0,0,0.5);
        padding: 10px;
        overflow: auto;
   }
  .message {
        display: flex;
        background: rgba(34,43,56,0.5);
   }
   .input {
       position: absolute;
       bottom: 0px;
       height: 40px;
       width: 70%
   }
   .selectedbuyer {
     padding: 5px;
     background: rgb(210,200,100);
     margin-bottom: 10px;
     align-items: center;
     border-radius: 8px;
     color: white;
     font-weight: 700;
     font-size: 20px;
   }
   .selected {
    padding: 5px;
    background: #47525d;
    margin-bottom: 10px;
    align-items: center;
    border-radius: 8px;
    color: white;
    font-weight: 700;
    font-size: 20px
  }
  .selectedbuyer:hover {
     background: #47525d;
   }
`;

const OwnerChatModal: React.VFC = () => {
  const {profile, isOpenOwnerChatModal, selectedAuctionId } = useSelector(
    (state: RootState) => state.user
  );
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedBuyer, setBuyer] = useState("")
  
  const chatHistory = useGetChatDataQuery({
    from:selectedBuyer,
    to: window?.tronWeb?.defaultAddress.base58,
    auctionId: selectedAuctionId
  });
  const [inputdata , setInputData ]= useState("")

  const [chatdata, setChatData] = useState([]);

  useEffect(()=>{
      setChatData(chatHistory.data?.data.chat);
      
  }, [chatHistory]);

  const onKeyDownHandler = async (e) =>{
    if(e.key === "Enter" || e.keyCode === 13 ){
      let _temp = {};
      _temp['fromHandle']="@"+profile.userAccountHandle;
      _temp['date'] = new Date().toUTCString()
      _temp['message'] = inputdata;
      chatdata.push(_temp)
      await addMessagehandler({
        from : profile.userCryptoAddress,
        fromHandle: profile.userAccountHandle,
        to: selectedBuyer,
        auctionId: selectedAuctionId,
        message: inputdata,
        date: new Date().toUTCString()
      })
      setChatData(chatdata);
      setInputData('')
    }
  }
  return (
    <Modal
      open={isOpenOwnerChatModal}
      onClose={() => dispatch(showOwnerChatModal({show: false, selectedAuctionId: null}))}
      center
      styles={{
        modalContainer: {
          background: 'rgba(255, 255, 255, 0.1)',
        },
        modal: {
          padding: 0,
          background: theme.backgroundColors.secondary,
          color: theme.textColors.primary,
          width: '80%',
          maxWidth: '500px',
          borderRadius: '10px',
        },
        closeButton: {
          background: theme.backgroundColors.secondary,
          borderRadius: '50%',
        },
      }}
    >
      <OwnerChatModalWrapper>
        <h3>Chating with Buyers</h3>
        <div className="container">
            <div className="buyer">
              {
                chatHistory.data?.data.buyerList.map((buyer, index)=>(
                  <div key={"buyer_" + index} className={selectedBuyer===buyer._id?"selected":"selectedbuyer"} onClick={()=>setBuyer(buyer._id)}>
                    {"@" + buyer.fromHandle }
                  </div>
                ))
              }
            </div>
            <div className="message">
                <div style={{ overflow:'auto',overflowX:'clip', overflowWrap:'break-word', height: '400px',width:'100%'}}>
                  {chatdata?.map((history, index)=>{
                    return (
                    <div  key = {index} style={{background:'rgba(230,220,230,0.5)', margin: '10px', borderRadius:'10px'}}>
                      <div style={{fontSize: "20px", fontWeight: 300, color: 'blue'}} >
                        <div style={{float :'left'}}>{history.fromHandle} </div>:<div style = {{float: 'right', fontSize: 12}}> {history.date} </div>
                      </div>
                      <div style={{textIndent: 20, fontSize: '18px'}}>
                        {history.message}
                      </div>
                    </div>)
                  })}
                </div>

                <input 
                    className="input" 
                    onChange = {(e)=>setInputData(e.target.value)}
                    onKeyDown = {onKeyDownHandler}
                    value = {inputdata}
                />
            </div>
        </div>
      </OwnerChatModalWrapper>
    </Modal>
  );
};

export default OwnerChatModal;
