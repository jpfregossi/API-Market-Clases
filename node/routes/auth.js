const router = require("express").Router();
const User = require("../models/User");
const Clase = require("../models/Clase")
const Newsletter = require("../models/Newsletter");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { generateRecoveryLink } = require("./verifyToken");
const { enviarMail } = require("./common");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    role: req.body.role,
    birthDate: req.body.birthDate
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    !user && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json();
  }
});


//checkpass

router.post("/checkpassword", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.id });

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (OriginalPassword == req.body.currentPassword) {

      res.status(200).json(true)
    } else { res.status(200).json(false) }

  } catch (err) {
    res.status(500).json(err);
  }
});


// updateUsername
router.put("/updateUsername", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      {
        username: req.body.username,
      },
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// updateEmail
router.put("/updateEmail", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      {
        email: req.body.email,
      },
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
// updatePassword
router.put("/updatePassword", async (req, res) => {
  try {
    const encryptedPassword = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString()
    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      {
        password: encryptedPassword,
      },
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});



//NEWSLETTER
router.post("/newsletterregister", async (req, res) => {
  const newUser = new Newsletter({
    email: req.body.email
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  const email = req.body.email;

  try {
    const oldUser = await User.findOne({ email: email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }

    const link = generateRecoveryLink(oldUser._id, email, oldUser.password);

    await enviarMail("FORGOT", email, link);

    console.log("link: ", link);

    res.status(200).json({ status: "OK", link: link });
  } catch (err) {
    res.status(500).json(err);
    console.log("Error: ", err);
  }
});

//RECOVER PASSWORD
router.post("/reset-password", async (req, res) => {
  const { id, token, password } = req.body;

  const oldUser = await User.findById(id);
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  
  const secret = process.env.JWT_SEC + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);

    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.PASS_SEC
    ).toString()

    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      {
        password: encryptedPassword,
      },
      { new: true }
    );

    let cleanUser = updatedUser._doc;
    delete cleanUser.password;
    delete cleanUser.__v;
    delete cleanUser.isAdmin;

    res.status(200).json(cleanUser);
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});



module.exports = router;