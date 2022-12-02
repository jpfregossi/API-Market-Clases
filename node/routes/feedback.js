const Feedback = require("../models/Feedback");
const User = require("../models/User");
const { verifyToken } = require("./verifyToken");
const { getTutorClases, enviarMail } = require("./common");

const router = require("express").Router();


// get comments & ratings for product

router.get("/find/:clase_id", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ clase_id: req.params.clase_id });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
// add comment & rating for product 

router.post("/", verifyToken, async (req, res) => {
  if (req.user) {
  try {
    const commitingUser = await User.findById( req.user.id );

    const newFeedback = new Feedback({
      user_id: req.user.id,
      username: commitingUser.username,
      clase_id: req.body.clase_id,
      rating: req.body.rating,
      message: req.body.message,
    });
  
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    res.status(500).json(err);
    console.log("Error: ", err);
  }
}});

// delete comment with rating 

router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedFeedback);
  } catch (err) {
    res.status(500).json(err);
    console.log("Error: ", err);
  }
});

// BLOCK FEEDBACK
router.put("/block", verifyToken, async (req, res) => { 
  if (req.user) {
    try {
      const updatedFeedback = await Feedback.findByIdAndUpdate(
        req.body.id,
        {
          state: "BLOQUEADO",
          disclaimer: req.body.message != undefined ? req.body.message : null
        },
        { new: true },
      );

      console.log("Feedback Update: ", updatedFeedback);

      const alumno = await User.findById(updatedFeedback.user_id);

      await enviarMail("RECHAZO", alumno.email, req.body.message != undefined ? req.body.message : null);

      const response = await getTutorClases(req.user.id);

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
      console.log("Error: ", err);
    }
  }
});

// ACCEPT FEEDBACK
router.put("/accept", verifyToken, async (req, res) => { 
  if (req.user) {
    try {
      const updatedFeedback = await Feedback.findByIdAndUpdate(
        req.body.id,
        {
          state: "ACEPTADO",
        },
        { new: true },
      );

      console.log("Feedback Update: ", updatedFeedback);

      await enviarMail("CANCELACION", alumno.email, req.body.message != undefined ? req.body.message : null);
      
      const response = await getTutorClases(req.user.id);

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
      console.log("Error: ", err);
    }
  }
});


module.exports = router;