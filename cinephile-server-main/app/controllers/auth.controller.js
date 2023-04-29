const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: "Saving Error" });
      return;
    }

    const token = jwt.sign(
      {
        _id: user._id,
        username: user?.username,
        email: user?.email,
        createdAt: user?.createdAt,
      },
      config.secret,
      {
        expiresIn: 86400,
      }
    );

    res.status(200).send({
      token,
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    console.log("user", user);
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (!user) {
      return res.status(404).send({ message: "Invalid User" });
    }

    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        username: user?.username,
        email: user?.email,
        createdAt: user?.createdAt,
      },
      config.secret,
      {
        expiresIn: 86400,
      }
    );

    res.status(200).send({
      token,
    });
  });
};
