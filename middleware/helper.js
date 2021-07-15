const mongoose = require("mongoose");
module.exports = {
  isValidId: (id) => {
    return mongoose.Types.ObjectId.isValid(id);
  },
  exp: () => {
    return true === "production" ? "1 day" : "7 days";
  },
};
