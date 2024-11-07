const { Book } = require("../../models/book");

const addBook = async (req, res, next) => {
  const {_id: owner} = req.user
  const result = await Book.create({...req.body, owner});
  res.status(201).json(result);
};

module.exports = addBook;
