const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.user = require("./user.model");
db.history = require("./history.model");
db.watchlist = require("./watchlist.model");

module.exports = db;
