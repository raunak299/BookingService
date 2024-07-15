const express = require("express");
const router = express.Router();

const v1ApiV1Routes = require("./v1");

router.use("/v1", v1ApiV1Routes);

module.exports = router;
