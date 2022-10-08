import { axiosInstance } from './axiosInstance';

interface addMessage {
  from: string;
  fromHandle: string,
  to: string;
  auctionId: number;
  message: string;
  date: string;
}

export const addMessagehandler = async ({
    from,fromHandle, to,  auctionId, message, date
}: addMessage) => {
  return axiosInstance.post('/chat/addMessage', {
    from, fromHandle, to, auctionId, message, date
  });
};


interface getMessage {
    from: string;
    to: string;
    auctionId: number;
}
export const getMessageHandler = async ({
    from, to, auctionId
}: getMessage) => {
  return axiosInstance.post('/chat/getMessage', {
    from, to, auctionId
  });
};
