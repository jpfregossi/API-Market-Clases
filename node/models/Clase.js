const mongoose = require("mongoose");

const ClaseSchema = new mongoose.Schema(
  {
    teacherId: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    materia: { type: String },
    tipo: { type: Array },
    frecuencia: { type: Array },
    calificacion: { type: Array},
    price: {type: Number},
    duracion: {type: Number},
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clase", ClaseSchema);