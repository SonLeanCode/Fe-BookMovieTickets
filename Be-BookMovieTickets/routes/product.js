var express = require("express");
const cors = require("cors");

var router = express.Router();
var modelProduct = require("../modal/productModal");
//  lay id  sua
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;
  var data = await modelProduct.find({ _id: id });

  res.json(data);
  console.log(res);
});
router.get("/", async function (req, res, next) {
  var data = await modelProduct.find({});

  res.json(data);
  console.log(res);
});

//them moi
//post :localhost:3000/product
router.post("/", async function (req, res, next) {
  // get thì su dụng find
  try {
    console.log("body:" + res.body);
    const { name, price, category, hinh, sale, description, hotdeal } =
      req.body;
    console.log({ name, price, category, hinh, sale, description, hotdeal });
    const data = await modelProduct.create({
      name,
      price,
      category,
      hinh,
      sale,
      description,
      hotdeal,
    });

    res.json({ status: 200, message: "Thêm thành công" });
    // await data.save()
  } catch (error) {
    res.json({ status: error, message: "Thêm thất bại" });
  }
});

// put
router.put("/:id", async function (req, res, next) {
  // get thì su dụng find
  try {
    const { id } = req.params;
    const { name, price, category, sale } = req.body;
    const item = await modelProduct.findByIdAndUpdate(id);
    if (item) {
      item.name = name ? name : item.name;
      item.price = price ? price : item.price;
      item.category = category ? category : item.category;
      item.sale = sale ? sale : item.sale;
    }
    console.log(item);
    await item.save();
    res.json({ status: 200, message: "Thêm thành công" });
  } catch (error) {
    res.json({ status: err, message: "Thêm thất bại" });
  }
});

//xoa
router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params; // Assuming you pass the ID of the item to be deleted in the request body

    console.log({ id });

    // Perform the deletion using the ID
    await modelProduct.findByIdAndDelete(id);

    res.json({ status: 200, message: "Xóa thành công" });
  } catch (error) {
    res.json({ status: error, message: "Xóa thất bại" });
  }
});

//
router.get("/cate/:id", async function (req, res, next) {
  // get thì su dụng find
  try {
    const { id } = req.params;
    const data = await modelProduct.find({ category: id });

    console.log(data);
    res.json(data);
  } catch (error) {
    res.json({ status: false });
  }
});
module.exports = router;
//  user
