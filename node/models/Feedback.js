const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.ObjectId, required: true },
        username: { type: String, required: true },
        clase_id: { type: mongoose.Schema.ObjectId, required: true },
        rating: { type: Number },
        message: { type: String },
        state: { type: String, default: "PENDIENTE" }, // [ PENDIENTE, APROBADO, BLOQUEADO ]
        disclaimer: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);