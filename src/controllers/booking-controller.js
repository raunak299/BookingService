const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services");
const { createChannel, publishMessage } = require("../utils/messageQueue");

const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
class BookingController {
  constructor() {
    this.bookingService = new BookingService();
  }

  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const payload = {
      data: {
        subject: "this is a notification form queue",
        content: "some queue will subscribe this",
        recipientEmail: "raunakraj299@gmail.com",
        notification: "2024-07-28 22:45:00",
      },
      service: "CREATE_TICKET",
    };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
    return res.status(200).json({
      message: "published message successfully",
    });
  }

  create = async (req, res) => {
    try {
      const response = await this.bookingService.createBooking(req.body);
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
}

module.exports = BookingController;
