const mongoose = require("mongoose");

const ContratacionSchema = new mongoose.Schema(
  {
    clase_id: { type: mongoose.Schema.ObjectId, required: true },
    teacher_id: { type: mongoose.Schema.ObjectId, required: true },
    alumno_id: { type: mongoose.Schema.ObjectId, required: true },
    tipo: { type: String, required: true }, // [ GRUPAL, INDIVIDUAL ]
    frecuencia: { type: String, required: true }, // [ SEMANAL, MENSUAL ]
    horario: { type: String, required: true },
    contacto: {type: Number, required: true },
    estado: {type: String, required: true, default: "SOLICITADA" }, // [ SOLICITADA, ACEPTADA, FINALIZADA, CANCELADA ]
    mensaje: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contratacion", ContratacionSchema);