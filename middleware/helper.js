const mongoose = require("mongoose");
const { environment } = require("../config.env");
module.exports = {
  isValidId: (id) => {
    return mongoose.Types.ObjectId.isValid(id);
  },
  exp: () => {
    return environment === "production" ? "1 day" : "7 days";
  },
};
