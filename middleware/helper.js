const mongoose = require("mongoose");
const { environment } = require("../config/config.env");
module.exports = {
  isValidId: (id) => {
    return mongoose.isValidObjectId(id);
  },
  exp: () => {
    return environment === "production" ? "1 day" : "7 days";
  },
};
