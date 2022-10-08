import { useEffect, useState } from 'react';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { addMessagehandler } from 'apis/chatAPI';
import useGetChatDataQuery from 'hooks/chat/useGetChatData';

interface chatBoxProps {
  classname: string;
  isOpen: boolean;
  nftTitle: string;
  auctionId: number;
  creatorAddress: string;
}

const ChatBox: React.VFC<chatBoxProps> = ({ classname, isOpen,nftTitle, auctionId, creatorAddress }) => {
  const [inputdata, setInputData ] = useState('');
  const { profile } = useSelector((state: RootState) => state.user);
  const chatHistory = useGetChatDataQuery({
    from:profile?.userCryptoAddress,
    to: creatorAddress,
    auctionId: auctionId
  });
  const [chatdata, setChatData] = useState([]);

  useEffect(()=>{
    setChatData(chatHistory.data?.data.chat)
  }, [chatHistory])

  const keyDownHandler = async (e) =>{
    if(e.key === "Enter" || e.keyCode === 13 ){
      if(!profile?.userAccountHandle){
        alert("please connect to your wallet")
        return
      }
      let _temp = {};
      _temp['fromHandle']="@"+profile.userAccountHandle;
      _temp['date'] = new Date().toUTCString()
      _temp['message'] = inputdata;
      chatdata.push(_temp)
      console.log(profile)
      await addMessagehandler({
        from : profile.userCryptoAddress,
        fromHandle: "@" + profile.userAccountHandle,
        to: creatorAddress,
        auctionId: auctionId,
        message: inputdata,
        date: new Date().toUTCString()
      })
      setChatData(chatdata);
      setInputData('')
    }
  }

  return (
    <div className = {classname}>
      <div 
          style={{
              width: '100%', 
              height: '35px', 
              background: 'white', 
              borderBottom: 'solid 3px',
              fontSize: '22px',
              fontWeight: 400,
              textIndent: 30,
              fontFamily:'clash Grotesk',
              borderRadius: 5,
          }}
        >
          About {nftTitle}
      </div>

      <div style={{ overflowY:'auto',overflowX:'clip', overflowWrap:'break-word', height: '50vh'}}>
        {chatdata?.map((history, index)=>{
          return (
          <div  key = {index} style={{background:'rgba(23,12,23,0.5)', margin: '10px', borderRadius:'10px'}}>
            <div style={{fontSize: "20px", fontWeight: 300, color: 'blue'}} >
              <div style={{float :'left'}}>{history.fromHandle} </div>:<div style = {{float: 'right', fontSize: 12}}> {history.date} </div>
            </div>
            <div style={{textIndent: 20}}>
              {history.message}
            </div>
          </div>)
        })}
      </div>
      {isOpen&&<input 
          onKeyDown = {keyDownHandler} 
          onChange={(e) => setInputData(e.target.value)} 
          style={{ 
              position:'absolute', 
              bottom:0, 
              width: '100%', 
              height:'40px',
              background: 'white',
              borderRadius: '5px',
            }} 
          value={inputdata}
        />}
    </div>
  );
};

export default ChatBox;
