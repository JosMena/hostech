import bcrypt from "bcrypt";

import { User } from "../models/User";

import { generateJWT } from "../helpers/generateJWT";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(403).json({
        message: "Invalid Email",
      });
    }

    if (user.status !== 1) {
      return res.status(400).json({
        message: "Inactive User",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    req.status(500).json({
      message: error.message,
    });
  }
};
