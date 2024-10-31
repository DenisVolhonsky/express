const helperMongooseError = (error, data, next) => {
  // if error model throw error
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};

module.exports = helperMongooseError;
