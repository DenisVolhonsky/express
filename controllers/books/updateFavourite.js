const { Book } = require("../../models/book");
const { HttpError } = require("../../helpers");

const updateFavourite = async (req, res) => {
  const { id } = req.params;
  const result = await Book.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, error.message);
  }
  res.json(result);
};

module.exports = updateFavourite;
