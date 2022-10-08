import { AppConfig } from 'types/app-config';
import {
  shastaTrc20TokenOptions,
  // mainnetTrc20TokenOptions,
} from './utils/trc20TokenOptions';

// const prodConfig: AppConfig = {
//   apiBaseUrl: 'http://173.212.212.111:8000',
//   masterAuctionContractAddress: 'TWqbN6pjUTcuVrRyoDybuN625CUvApa7Av',
//   justFanCollectionContractAddress: 'TCL1p5CtgaMBukUsuXDotrVWHd4fgEeAzN',
//   trc20TokenOptions: mainnetTrc20TokenOptions,
//   fullhost: 'https://api.trongrid.io',
//   trxTokenAddress: 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
//   tronscan: {
//     transactionBaseUrl: 'https://tronscan.org/#/transaction/',
//   },
// };

const stagingConfig: AppConfig = {
  apiBaseUrl: 'https://staging.fan.ocg.technology',
  masterAuctionContractAddress: 'TPwehu45wHBvxEwtfXYF3CYLrTETJQYPNB',
  justFanCollectionContractAddress: 'TM5AUVBjxy92nCJxj2ujkJrctiqycyz7gG',
  trc20TokenOptions: shastaTrc20TokenOptions,
  isMainNet: true,
  fullhost: 'https://api.shasta.trongrid.io',
  trxTokenAddress: 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
  tronscan: {
    transactionBaseUrl: 'https://shasta.tronscan.org/#/transaction/',
  },
};

const localConfig: AppConfig = {
  apiBaseUrl: 'https://fanstest.herokuapp.com',
  //apiBaseUrl: 'http://localhost:8000',
  masterAuctionContractAddress: 'TPwehu45wHBvxEwtfXYF3CYLrTETJQYPNB',
  justFanCollectionContractAddress: 'TM5AUVBjxy92nCJxj2ujkJrctiqycyz7gG',
  trc20TokenOptions: shastaTrc20TokenOptions,
  isMainNet: false,
  fullhost: 'https://api.shasta.trongrid.io',
  trxTokenAddress: 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
  tronscan: {
    transactionBaseUrl: 'https://shasta.tronscan.org/#/transaction/',
  },
};

export default (function () {
  switch (process.env.REACT_APP_ENV) {
    case 'production':
      // return prodConfig;
      return localConfig

    case 'staging':
      return stagingConfig;

    case 'local':
    default:
      return localConfig;
  }
})();
