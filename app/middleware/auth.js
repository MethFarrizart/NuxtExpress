// export default defineNuxtRouteMiddleware((to, from) => {});

import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // attach decoded payload to req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
