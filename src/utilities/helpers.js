module.exports.numberWithCommas = (num) => {
  if (num !== undefined) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};