import { axiosInstance } from './axiosInstance';

export const addJSONToIpfs = (values: {}) => {
  return axiosInstance.post('/ipfs/json', values);
};
