module.exports = calculateTotalPrice = ({ orderItem }) => {
  const totalPrice = orderItem.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);
  return totalPrice;
};
