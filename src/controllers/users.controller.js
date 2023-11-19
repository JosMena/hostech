import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "lastName", "email"],
      where: { status: 1 },
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    let newUser = await User.create(
      {
        name,
        lastName,
        email,
        password: hashPassword,
      },
      {
        fields: ["name", "lastName", "email", "password"],
      }
    );
    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, password } = req.body;

    const user = await User.findByPk(id);
    if (!user || user.status !== 1) {
      return res.status(404).json({ message: "User not found or inactive" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
    } else {
      user.password = password;
    }

    user.name = name;
    user.lastName = lastName;

    await user.save();

    res.status(200).send(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user || user.status !== 1) {
      return res.status(404).json({ message: "User not found or inactive" });
    }
    user.update({ status: 0 });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
        status: 1,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found or inactive" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProductsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userProducts = await User.findOne({
      where: {
        id,
        status: 1,
      },
      include: Product,
    });

    if (!userProducts) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).send(userProducts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
