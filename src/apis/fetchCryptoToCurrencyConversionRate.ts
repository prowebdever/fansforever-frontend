// import axios from 'axios';
import CoinGecko from 'coingecko-api';
const CoinGeckoClient = new CoinGecko();
export const fetchCryptoToCurrencyConversionRate =async ({
  coingeckoCryptoId,
  coingeckoCurrency,
}) => {
  let data = await CoinGeckoClient.simple.price({
    ids: coingeckoCryptoId,
    vs_currencies: ['usd'],
  });
  return data
  // return await axios.get(
  //   `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoCryptoId}&vs_currencies=${coingeckoCurrency}`
  // );
};
