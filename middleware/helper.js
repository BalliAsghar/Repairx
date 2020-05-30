const mongoose = require("mongoose");
module.exports = {
  isValidId: (id) => {
    return mongoose.isValidObjectId(id);
  },
};
