var express = require("express");
var router = express.Router();
const multer = require("multer");

multer;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "E:/nodeJs/BanNhacCu/webshop03-demo-master/webshop03-demo-master/assets/img/container/slide1/icon category"
    );
    // cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// upload 1 file
router.get("/profile", upload.array("avatar"), function (req, res, next) {
  var text = req.query.p;
  res.json({ status: 200, message: "upload thành công" });
});

//upload thành công
router.post("/profile", upload.array("files"), function (req, res, next) {
  console.log(req.files);
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.json({ status: 200, message: "upload thành côngs" });
});

module.exports = router;
