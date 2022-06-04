module.exports = calculateDeliveryPrice = () => {
  const random = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
  const deliveryPrice = random;
  return deliveryPrice;
};
