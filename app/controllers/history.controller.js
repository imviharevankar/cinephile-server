const jwtDecode = require("jwt-decode");
const db = require("../models");
const History = db.history;
const User = db.user;

exports.create = (req, res) => {
  if (!req.body.media) {
    return res.status(400).send({ message: "No media." });
  }

  const history = new History({
    uid: req.body.user_id,
    media: req.body.media,
  });

  history
    .save(history)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while creating history",
      });
    });
};

exports.findAll = (req, res) => {
  let token = req.headers["x-access-token"];
  const id = jwtDecode(token);

  History.find({ uid: id?._id })
    .then((data) => {
      if (!data) {
        return res.status(200).send("No Watch History");
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while creating history",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(id);
  History.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Movie not found" });
      } else {
        res.send({ id });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete",
      });
    });
};
