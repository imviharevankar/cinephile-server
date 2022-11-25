const { authJwt } = require("../middlewares");

module.exports = (app) => {
  const history = require("../controllers/history.controller");

  const router = require("express").Router();

  router.post("/", history.create);
  router.get("/", history.findAll);
  router.delete("/:id", history.delete);

  app.use("/api/history", [authJwt.verifyToken], router);
};
