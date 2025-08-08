import jsonwebtoken from "jsonwebtoken";
export const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send("your token is invalid");
  }
  const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  req.user = data.user;
  next();
};
