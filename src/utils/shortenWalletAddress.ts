const shortenWalletAddress = (walletAddress: string, charLength: number) => {
  const addressLength = walletAddress.length;
  return `${walletAddress.substr(0, charLength)}....${walletAddress.substring(
    addressLength - charLength,
    addressLength
  )}`;
};

export default shortenWalletAddress;
