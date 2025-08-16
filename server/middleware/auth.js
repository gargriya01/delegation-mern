import jwt from "jsonwebtoken";
export default function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // { id, role, name, email }
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
