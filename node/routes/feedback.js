const Feedback = require("../models/Feedback");
const User = require("../models/User");
const { verifyToken } = require("./verifyToken");

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
      message: req.body.message != undefined ? req.body.message : null,
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
  }
});

// edit comment with rating 

router.put("/update/:id", verifyToken, async (req, res) => { 
    try {
      const updatedFeedback = await CommentsRatings.findByIdAndUpdate(
        req.params.id,
        {
          state: req.body.rating,
          disclaimer: req.body.disclaimer != undefined ? req.body.disclaimer : null
        },
      );
      res.status(200).json(updatedFeedback);
    } catch (err) {
      res.status(500).json(err);
    }
});


module.exports = router;