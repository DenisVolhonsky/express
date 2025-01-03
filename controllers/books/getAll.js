const { Book } = require("../../models/book");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Book.find({ owner }, "-createdAt, -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(result); // {}, "-author" without this field
};

module.exports = getAll;
