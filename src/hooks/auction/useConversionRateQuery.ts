// import { useQuery } from 'react-query';

// import { fetchCryptoToCurrencyConversionRate } from 'apis/fetchCryptoToCurrencyConversionRate';

const useConversionRateQuery = ({
  coingeckoCryptoId,
  coingeckoCurrency,
}: {
  coingeckoCryptoId: string;
  coingeckoCurrency: string;
}) => {
  // const conversionRateQuery = useQuery('conversion-rate',async () =>
  //   await fetchCryptoToCurrencyConversionRate({
  //     coingeckoCryptoId,
  //     coingeckoCurrency,
  //   }),
  //   {retry:10, retryDelay: 1000, refetchOnMount: false}
  // );
  //   console.log(conversionRateQuery)
  const conversionRateQuery = {
    data : {
      data:{
        tether : {
          usd: 1
        },
        tron : {
          usd : 0.11
        }
      }
    }
  }
  return conversionRateQuery;
};

export default useConversionRateQuery;
