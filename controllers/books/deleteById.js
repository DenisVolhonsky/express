const { Book } = require("../../models/book");
const { HttpError } = require("../../helpers");

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Book.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = deleteById;
