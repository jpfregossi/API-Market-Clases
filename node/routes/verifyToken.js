const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authentication;
  console.log("authHeader: ", authHeader);
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SEC, (err, user) => {
      console.log("err: ", err);
      console.log("token user: ", user);
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    console.log("headers: ", req.headers);
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const generateRecoveryLink = (id, email, pwd) => {
  const secret = process.env.JWT_SEC + pwd;
  const token = jwt.sign({ email: email, id: id }, secret, {
    expiresIn: "5m",
  });
  const link = `http://localhost:3000/reset-password/${id}/${token}`;

  return link;
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  generateRecoveryLink
};