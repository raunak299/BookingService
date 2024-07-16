const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services");

const bookingService = new BookingService();

const create = async (req, res) => {
  try {
    const response = await bookingService.createBooking(req.body);
    return res.status(StatusCodes.OK).json({
      message: "Successfully created booking",
      success: true,
      err: {},
      data: response,
    });
  } catch (err) {
    return res.status(err.StatusCode).json({
      message: err.message,
      success: false,
      err: err.explanation,
      data: {},
    });
  }
};

module.exports = {
  create,
};
