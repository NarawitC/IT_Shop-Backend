const { IN_CART, PENDING, CONFIRMED } = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      productPrice: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      paymentSlip: {
        type: DataTypes.STRING,
      },
      paymentAt: {
        type: DataTypes.DATE,
      },
      deliveryAddress: {
        type: DataTypes.STRING,
      },
      deliveryPrice: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM(IN_CART, PENDING, CONFIRMED),
        defaultValue: IN_CART,
        allowNull: false,
      },
    },
    { underscored: true }
  );

  Order.associate = (models) => {
    Order.hasMany(models.OrderItem, {
      foreignKey: {
        name: 'orderId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Order.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Order.belongsTo(models.Admin, {
      foreignKey: {
        name: 'confirmedAdminId',
        allowNull: true,
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Order;
};
