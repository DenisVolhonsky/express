const { Book } = require("../../models/book");
const { HttpError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Book.findById(id); // or Book.findOne({ _id: id });

  if (!result) {
    return next(HttpError(404, "Not found"));
  }

  res.json(result);
};

module.exports = getById;
