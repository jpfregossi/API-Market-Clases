const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fechaNac: {type: Date, required: true},
    primario: {type: Array}, //Son 2 boolenos en el array, 1) Curso el primario? true or false ---- 2) Lo termino? true or false
    secundario: {type: Array},
    terciario: {type: Array},
    universitario: {type: Array},
    isAdmin: { type: Boolean, default: false,},
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);