var createError = require("http-errors");
var express = require("express");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var proRouter = require("./routes/product");
var cateRouter = require("./routes/categories");
// var usersRouter = require("./routes/users");
// var searchRouter = require("./routes/search");

var cors = require("cors");

var app = express();
app.set("view engine", "ejs");
//  khai bao thu vien
const mongoose = require("mongoose");
require("./modal/categoryModal");
require("./modal/productModal");
require("./modal/userModal");

// ket noi db
mongoose
  .connect("mongodb://localhost:27017/duAn", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(">>>>>>>>>> DB Connected!!!!!!"))
  .catch((err) => console.log(">>>>>>>>> DB Error: ", err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// app.use(cors({
//   origin: '*', // Wildcard is NOT for Production
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//  cau hình cors

// khai bao router
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/pro", proRouter);
app.use("/cate", cateRouter);

// app.use("/user", usersRouter);
// app.use("/search", searchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
//

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
