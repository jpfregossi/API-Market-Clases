const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    birthDate: {type: Date, required: true},
    studies: {type: String}, //TODO: hacerlo más sofisticado si queda tiempo
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);