const mongoose = require("mongoose");

const ContratacionSchema = new mongoose.Schema(
  {
    claseId: { type: String, required: true },
    teacherId: { type: String, required: true },
    alumnoId: { type: String, required: true },
    tipo: { type: String, required: true }, // [ GRUPAL, INDIVIDUAL ]
    frecuencia: { type: String, required: true }, // [ SEMANAL, MENSUAL ]
    calificacion: { type: Number },
    comentario: { type: String },
    estadoComentario: { type: String },  // [ PENDIENTE, APROBADO, BLOQUEADO ]
    descargo: { type: String },
    horario: { type: String, required: true },
    contacto: {type: Number, required: true },
    estado: {type: String, required: true, default: "SOLICITADA" }, // [ SOLICITADA, ACEPTADA, FINALIZADA, CANCELADA ]
    mensaje: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contratacion", ContratacionSchema);