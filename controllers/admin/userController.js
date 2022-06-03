const {
  User,
  Order,
  OrderItem,
  Product,
  Category,
  SubCategory,
} = require('../../models/index');
const createError = require('../../utils/createError');

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Order,
        include: [
          {
            model: OrderItem,
            include: [
              {
                model: Product,
                include: [
                  {
                    model: Category,
                    include: [
                      {
                        model: SubCategory,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  if (!users) {
    createError('Users not found', 404);
  }

  res.status(200).send({ users });
};

exports.getUserById = async (req, res) => {
  const user = await User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.userId,
    },
    include: [
      {
        model: Order,
        include: [
          {
            model: OrderItem,
            include: [
              {
                model: Product,
                include: [
                  {
                    model: Category,
                    include: [
                      {
                        model: SubCategory,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  if (!user) {
    createError('User not found', 404);
  }
  res.status(200).send({ user });
};
