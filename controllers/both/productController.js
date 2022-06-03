exports.getAllProductInfo = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['name'],
        },
        {
          model: SubCategory,
          attributes: ['name'],
        },
      ],
    });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
}