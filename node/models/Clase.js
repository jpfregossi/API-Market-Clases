const mongoose = require("mongoose");
const feedback = require("./Feedback");

const ClaseSchema = new mongoose.Schema(
  {
    teacher_id: { type: mongoose.Schema.ObjectId, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    tipo: { type: Array },
    frecuencia: { type: Array },
    calificacion: { type: Number },
    price: {type: Number},
    duracion: {type: Number},
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clase", ClaseSchema);