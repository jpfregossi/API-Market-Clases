const CommentsRatings = require("../models/CommentsRatings");

const router = require("express").Router();


// get comments & ratings for product

router.get("/find/:productid", async (req, res) => {
  try {
    const cmrt = await CommentsRatings.find({ productid: req.params.productid });
    res.status(200).json(cmrt);
  } catch (err) {
    res.status(500).json(err);
  }
});
  



module.exports = router;