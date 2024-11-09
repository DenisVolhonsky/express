const { Schema, model } = require("mongoose");
const Joi = require("joi"); // schema

const { helperMongooseError } = require("../helpers");

const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    token: {
      type: String,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", helperMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
