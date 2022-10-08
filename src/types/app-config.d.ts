export interface AppConfig {
  apiBaseUrl: string;
  masterAuctionContractAddress: string;
  justFanCollectionContractAddress: string;
  trc20TokenOptions: any[];
  fullhost: string;
  isMainNet: Boolean;
  trxTokenAddress: string;
  tronscan: {
    transactionBaseUrl: string;
  };
}
