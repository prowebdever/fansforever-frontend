const numberWithCommas = (number: string | number) => {
  return typeof number === 'number'
    ? number.toLocaleString()
    : parseFloat(number).toLocaleString();
};

export default numberWithCommas;
