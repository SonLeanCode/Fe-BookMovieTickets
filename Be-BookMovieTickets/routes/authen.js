const jwt = require('jsonwebtoken');


const authen = async (req, res, next) => {
try {
if (req.headers.authorization) {
const token = req.headers.authorization.split(' ')[1];
const data = jwt.verify(token, 'shhhhh');
req.user = data.user;
next();
} 
res.status(401).json({ error: 'Not authoried!!' });
} catch (error) {
res.status(401).json({ error: error.message });
}
}

module.exports = authen;