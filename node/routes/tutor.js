const User = require("../models/User");
const Clase = require("../models/Clase");
const Feedback = require("../models/Feedback");
const Contratacion = require("../models/Contratacion");
const {
  verifyToken,
} = require("./verifyToken");

const router = require("express").Router();

//UPDATE
router.get("/clases", verifyToken, async (req, res) => {
  if (req.user) {
    try {
      let clases = await Clase.find({ teacher_id: req.user.id });

      let response = [];

      for (let clase of clases) {
        let { __v, ...claseLimpia } = clase._doc;
        
        let feedbacks = await Feedback.find({ clase_id: clase._id });
        let contratacionesAll = await Contratacion.find({ clase_id: clase._id });

        let contrataciones = [];
        for (let contratacion of contratacionesAll) {
          console.log("feddbacks: ", feedbacks);
          console.log("Contratacion clase_id: " + contratacion.clase_id + " alumno_id: " + contratacion.alumno_id);
          let feedback = feedbacks.find(f => f.user_id.toString() === contratacion.alumno_id.toString());
          console.log("feddback:  ", feedback);
          let nuevaContratacion = { contratacion, feedback };
          contrataciones.push(nuevaContratacion);
        }

        let nuevaClase = { claseLimpia, ...contrataciones };
        response.push(JSON.parse(JSON.stringify(nuevaClase)));
      } 

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
      console.log("Error: ", err);
    }
  }
});

module.exports = router;