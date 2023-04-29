const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./app/models");
const dbURI =
  "mongodb+srv://imviharevankar:2F8XLiFfTA2z6Pvn@cluster0.i0mmn.mongodb.net/db_bluffzone";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Successfully connected to mongoDB");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bluffzone" });
});
require("./app/routes/auth.routes")(app);
require("./app/routes/history.routes")(app);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
