var express = require("express");
const cors = require("cors");

var router = express.Router();
var modelCategory = require("../modal/categoryModal");

router.use(cors()); // Thêm cors middleware

//  Lấy id và name từ query string
router.get("/", async function (req, res, next) {
  try {
    // Sử dụng findOne nếu chỉ muốn tìm một đối tượng
    var data = await modelCategory.find({});

    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
