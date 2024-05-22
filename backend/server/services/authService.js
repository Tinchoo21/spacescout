const jwt = require('jsonwebtoken');
const path = require('path');
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyAdmToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return sendErrorPage(res);
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    if (decoded.role === 'Admin') {
      return next();
    } else {
      return sendErrorPage(res);
    }
  } catch (error) {
    return sendErrorPage(res);
  }
};

const sendErrorPage = (res) => {
  const location = path.join(__dirname, '..', 'error.html');
  res.sendFile(location);
};

module.exports = {
  verifyAdmToken,
};
