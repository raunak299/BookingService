const { StatusCodes } = require("http-status-codes");
const { Booking } = require("../models");
const { ValidationError, AppError } = require("../utils/errors");

class BookingRepository {
  async create(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (err) {
      console.log("Something went wrong in service layer");
      if (err.name === "SequelizeValidationError") {
        throw new ValidationError(err);
      }
      throw new AppError(
        "RepositoryError",
        "cannot create booking",
        "There was some issue creating issue creating a booking , please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(bookingId, data) {
    try {
      const booking = await Booking.findByPk(bookingId);
      if (data.status) {
        booking.status = data.status;
      }
      await booking.save();
      return booking;
    } catch (err) {
      console.log("Something went wrong in repository layer");
      if (err.name === "SequelizeValidationError") {
        throw new ValidationError(err);
      }
      throw new AppError(
        "RepositoryError",
        "cannot update booking",
        "There was some issue in updating the booking , please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;
