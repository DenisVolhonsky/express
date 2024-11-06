const { Schema, model } = require("mongoose");
const Joi = require("joi"); // schema

const { helperMongooseError } = require("../helpers");

const gernes = ["fantastic", "love"];
const isbnRegExp = /^\d{3}-\d{3}-\d-\d{5}-\d$/;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    gerne: {
      type: String,
      enum: gernes,
      required: true,
    },
    isbn: {
      // ISBN -> 123-456-7-89012-3
      type: String,
      match: isbnRegExp,
      unique: true, // TODO add unique field in DB
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  favourite: Joi.boolean(),
  gerne: Joi.string()
    .valid(...gernes)
    .required(),
  isbn: Joi.string().pattern(isbnRegExp).required(),
});

const updateFavouriteSchema = Joi.object({
  favourite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavouriteSchema,
};

bookSchema.post("save", helperMongooseError);

const Book = model("book", bookSchema);

module.exports = {
  Book,
  schemas,
};
