const Clase = require("../models/Clase");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newClase = new Clase(req.body);

  try {
    const savedClase = await newClase.save();
    res.status(200).json(savedClase);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedClase = await Clase.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedClase);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Clase.findByIdAndDelete(req.params.id);
    res.status(200).json("Clase has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CLASE
router.get("/find/:id", async (req, res) => {
  try {
    const clase = await Clase.findById(req.params.id);
    res.status(200).json(clase);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL CLASES
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let clases;

    if (qNew) {
      clases = await Clase.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      clases = await Clase.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      clases = await Clase.find();
    }

    res.status(200).json(clases);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;