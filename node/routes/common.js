const Clase = require("../models/Clase");
const Feedback = require("../models/Feedback");
const Contratacion = require("../models/Contratacion");


const getTutorClases = async (id) => {
    console.log("ID: ", id);
    try {
        let clases = await Clase.find({ teacher_id: id });

        let response = [];

        for (let clase of clases) {
            let { __v, ...claseLimpia } = clase._doc;

            let feedbacks = await Feedback.find({ clase_id: clase._id });
            let contratacionesAll = await Contratacion.find({ clase_id: clase._id });

            let contrataciones = [];
            for (let contratacion of contratacionesAll) {
                let feedback = feedbacks.find(f => f.user_id.toString() === contratacion.alumno_id.toString());
                let { __v, ...contratacionLimpia } = contratacion._doc;
                let nuevaContratacion = { ...contratacionLimpia, feedback };
                contrataciones.push(nuevaContratacion);
            }

            let nuevaClase = {
                ...claseLimpia, contrataciones
            };
            response.push(JSON.parse(JSON.stringify(nuevaClase)));
        }

        return response;
    } catch (err) {
        console.log("Error: ", err);
        return null;
    }
}

module.exports = {
    getTutorClases
};