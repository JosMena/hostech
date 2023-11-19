import jwt from "jsonwebtoken";

import { User } from "../models/User.js";

export const validateJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findByPk(uid);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    if (!user.status) {
      return res.status(403).json({
        message: "Inactive User",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};
