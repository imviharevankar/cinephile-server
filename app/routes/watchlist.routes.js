const { authJwt } = require("../middlewares");

module.exports = (app) => {
  const watchlist = require("../controllers/watchlist.controller");

  const router = require("express").Router();

  router.post("/", watchlist.create);
  router.get("/", watchlist.findAll);
  router.delete("/:id", watchlist.delete);

  app.use("/api/watchlist", [authJwt.verifyToken], router);
};
