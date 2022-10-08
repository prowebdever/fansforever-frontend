import { AxiosRequestConfig } from 'axios';

import { axiosInstance } from './axiosInstance';

interface AddFileToIpfsProps {
  file: File;
  uploadProgressHandler?: (progressEvent: ProgressEvent) => void | undefined;
}

export const addFileToIpfs = ({
  file,
  uploadProgressHandler,
}: AddFileToIpfsProps) => {
  const formData = new FormData();
  formData.append('file', file);
  const axiosConfig: AxiosRequestConfig = {
    ...(uploadProgressHandler && { onUploadProgress: uploadProgressHandler }),
  };
  return axiosInstance.post('/ipfs/file', formData, axiosConfig);
};
