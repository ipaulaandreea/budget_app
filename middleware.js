const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const accessToken = req.headers["authorization"];
  const refreshToken = req.cookies["refreshToken"];

  if (!accessToken && !refreshToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(401).send("Access Denied. No refresh token provided.");
    }

    try {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      next();
    } catch (error) {
      return res.status(400).send("Invalid Token.");
    }
  }
};

module.exports = authenticate;
