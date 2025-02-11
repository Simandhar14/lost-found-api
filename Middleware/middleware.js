import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const middleware = (req, res, next) => {
  const authheader = req.headers.authorization;
  if (
    !authheader ||
    typeof authheader !== "string" ||
    !authheader.startsWith("Bearer ")
  ) {
    return res.status(403).json({ message: "Invalid auth header" });
  }

  const token = authheader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.userId) {
      req.userId = decoded.userId;
      return next();
    } else {
      return res.status(403).json({ message: "Invalid auth token" });
    }
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(400).json({ message: "Invalid token" });
  }
};

export default middleware;
