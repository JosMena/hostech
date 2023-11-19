import { Op } from "sequelize";

import { Product } from "../models/Product";

export const getProducts = async (req, res) => {
  try {
    const product = await Product.findAll({
      attributes: ["id", "name", "description", "brandId", "userId"],
      where: { status: 1 },
    });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, brandId, userId } = req.body;
    let newProduct = await Product.create(
      {
        name,
        description,
        brandId,
        userId,
      },
      {
        fields: ["name", "description", "brandId", "userId"],
      }
    );

    await Record.create({
      userId,
      action: "createProduct",
      productId: newProduct.id,
    });

    res.status(200).send(newProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, brandId, userId } = req.body;

    const product = await Product.findByPk(id);
    if (!product || product.status !== 1) {
      return res.status(404).json({ message: "Product not found or inactive" });
    }

    product.name = name;
    product.description = description;
    product.brandId = brandId;
    product.userId = userId;

    await product.save();

    await Record.create({
      userId,
      action: "updateProduct",
      productId: product.id,
    });

    res.status(200).send(product);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product || product.status !== 1) {
      return res.status(404).json({ message: "Product not found or inactive" });
    }
    product.update({ status: 0 });

    await Record.create({
      userId,
      action: "deleteProduct",
      productId: product.id,
    });

    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { key, name, brand, createdAt, updatedAt } = req.query;

    const whereClause = {
      id,
      status: 1,
      [Op.or]: [
        { key: { [Op.like]: `%${key || ""}%` } },
        { name: { [Op.like]: `%${name || ""}%` } },
        { brand: { [Op.like]: `%${brand || ""}%` } },
        { createdAt: { [Op.like]: `%${createdAt || ""}%` } },
        { updatedAt: { [Op.like]: `%${updatedAt || ""}%` } },
      ],
    };

    const product = await Product.findOne({
      where: whereClause,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found or inactive" });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
