const { StatusCodes } = require("http-status-codes");

class AppError extends Error {
  constructor(name, message, explanation, statusCode) {
    super();
    this.message = message;
    this.explanation = explanation;
    this.name = name;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
