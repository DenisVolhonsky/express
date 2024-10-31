const { Book } = require("../../models/book");

const addBook = async (req, res, next) => {
  const result = await Book.create(req.body);
  res.status(201).json(result);
};

module.exports = addBook;
