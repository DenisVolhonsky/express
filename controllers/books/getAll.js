const { Book } = require("../../models/book");

const getAll = async (req, res, next) => {
  const result = await Book.find(); // {}, "author title" --> if only this fields
  res.json(result); // {}, "-author" without this field
};

module.exports = getAll;
