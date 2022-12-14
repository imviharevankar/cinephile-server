const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .send({ message: "Invalid Token. Please Log In Again" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: `Unauthorised User ${err?.message}`,
      });
    }

    req.userId = decoded.id;
    next(req.userId);
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
