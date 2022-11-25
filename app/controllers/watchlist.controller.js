const jwtDecode = require("jwt-decode");
const db = require("../models");
const Watchlist = db.watchlist;
const User = db.user;

exports.create = (req, res) => {
  if (!req.body.media) {
    return res.status(400).send({ message: "No media." });
  }

  const watchlist = new Watchlist({
    uid: req.body.user_id,
    media: req.body.media,
  });

  watchlist
    .save(watchlist)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while creating watchlist",
      });
    });
};

exports.findAll = (req, res) => {
  let token = req.headers["x-access-token"];
  const id = jwtDecode(token);

  Watchlist.find({ uid: id?._id })
    .then((data) => {
      if (!data) {
        return res.status(200).send("No  Watchlist");
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while creating watchlist",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Watchlist.findByIdAndRemove(id)
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
