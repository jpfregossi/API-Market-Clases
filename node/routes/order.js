const Order = require("../models/Order");
const Clase = require("../models/Clase");
const User = require("../models/User");
const Feedback = require("../models/Feedback");
const Contratacion = require("../models/Contratacion");
const { getTutorClases } = require("./common");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    for (const product of req.body.products) {
      const newContratacion = new Contratacion({
        order_id: newOrder._id,
        alumno_id: req.user.id,
        teacher_id: product.teacher_id,
        clase_id: product.clase_id,
        tipo: product.tipo,
        frecuencia: product.frecuencia,
        contacto: product.contacto,
        horario: product.horario,
        mensaje: product.mensaje,
      });
      await newContratacion.save();
      newOrder.contratacion_id = newContratacion._id;
      const savedOrder = await newOrder.save();
    };


    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
    console.log("Err: ", err);
  }
});

//UPDATE CONTRATACION
router.put("/update", verifyToken, async (req, res) => {
  if (req.user) {
    try {
      const updatedOrder = await Contratacion.findByIdAndUpdate(
        req.body.id,
        {
          estado: req.body.estado,
        },
        { new: true }
      );

      const response = await getTutorClases(req.user.id);

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
      console.log("Error: ", err);
    }
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.body._id,
      {
        status: req.body.status,
      },
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find", verifyToken, async (req, res) => {
  if (req.user) {
    
    try {
      let orders = await Order.find({ teacher_id: req.user.id });

      let response = [];

      for (let order of orders) {
        let { __v, ...orderLimpia } = order._doc;
        
        let feedbacks = await Feedback.find({ user_id: order.userId });
        let contratacionesAll = await Contratacion.find({ _id: order.contratacion_id });

        let contrataciones = []
        for (let contratacion of contratacionesAll) {

          let feedback = feedbacks.find(f => f.user_id.toString() === contratacion.alumno_id.toString());
          if(feedback === undefined){
            feedback = new Feedback()
            feedback.user_id = order.userId;
            feedback.message = "";
          }
          console.log("ESTADO DEL FEEDBACK: " + feedback)

          let { __v, ...contratacionLimpia} = contratacion._doc;
          let nuevaContratacion = { ...contratacionLimpia, feedback };
          contrataciones.push(nuevaContratacion);
        }

        let nuevaOrder = {
            ...orderLimpia, contrataciones };
        response.push(JSON.parse(JSON.stringify(nuevaOrder)));
      } 

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
      console.log("Error: ", err);
    }
  }
})


module.exports = router;