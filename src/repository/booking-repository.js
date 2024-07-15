const { StatusCodes } = require("http-status-codes");
const { Booking } = require("../models");
const { ValidationError, AppError } = require("../utils/errors");

class BookingRepository {
  async create(data) {
    try {
      const booking = new Booking.create(data);
      return booking;
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        throw new ValidationError(err);
      }
      throw new AppError(
        "RepositoryError",
        "cannot create booking",
        "There was some issue creating issue creating a bookie , please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;
