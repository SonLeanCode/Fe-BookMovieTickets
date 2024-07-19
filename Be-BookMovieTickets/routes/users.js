var express = require('express');
var router = express.Router();
var modelUser = require("../modal/userModal");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authen = require('../routes/authen');

// Đăng kí
router.post("/dangki", async function(req, res, next) {
  try {
    const { useremail, password } = req.body;
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
    const data = await modelUser.create({ useremail, password:hashedPassword });
 
    res.json({ status: 200, message: "Thêm thành công" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Thêm thất bại" });
  }
});
module.exports = router;

// đăng nhập

router.post('/dangnhap', async function (req, res, next) {
  try {
  const { useremail, password } = req.body;
  console.log(useremail,password);

  const user = await modelUser.findOne({ useremail:useremail });

  // kiểm tra password đã mã hóa
  if (user && bcrypt.compareSync(password, user.password)) {
    console.log(user);
  const access_token = jwt.sign({ user }, 'shhhhh', { expiresIn: 1 * 60 });
  const refresh_token = jwt.sign({ user }, 'shhhhh', { expiresIn: 90 * 24 * 60 * 60 });
  // access token là chuỗi ngẫu nhiên, dùng để xác thực người dùng
  // refresh token là chuỗi ngẫu nhiên, dùng để lấy lại access token
  res.status(200).json({ user, access_token, refresh_token });
  }
  else {
  res.status(401).json({ error: 'Sai email hoặc mật khẩu' });
  }
  } catch (error) {
  res.status(401).json({ error: error.message });
  }
  });

  router.post('/api/refresh-token', async function (req, res, next) {
  try {
  let { refresh_token } = req.body;
  const data = jwt.verify(refresh_token, 'shhhhh');
  const access_token = jwt.sign({ user: data.user }, 'shhhhh', 	{ expiresIn: 1 * 60 });
  refresh_token = jwt.sign({ user: data.user }, 'shhhhh', 	{ expiresIn: 90 * 24 * 60 * 60 });
  res.status(200).json({ user: data.user, access_token, refresh_token });
  } catch (error) {
  res.status(414).json({ error: error.message });
  }
  });
module.exports = router;


