import { Brand } from "../models/Brand";
import { Record } from "../models/Record";

export const getBrands = async (req, res) => {
  try {
    const brand = await Brand.findAll({
      attributes: ["id", "name", "userId"],
      where: { status: 1 },
    });
    res.status(200).send(brand);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createBrand = async (req, res) => {
  try {
    const { name, userId } = req.body;
    let newBrand = await Brand.create(
      {
        name,
        userId,
      },
      {
        fields: ["name", "userId"],
      }
    );

    await Record.create({ userId, action: "createBrand" });

    res.status(200).send(newBrand);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, userId } = req.body;

    const brand = await Brand.findByPk(id);
    if (!brand || brand.status !== 1) {
      return res.status(404).json({ message: "Brand not found or inactive" });
    }

    brand.name = name;
    brand.userId = userId;

    await brand.save();

    await Record.create({ userId, action: "updateBrand" });

    res.status(200).send(brand);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByPk(id);
    if (!brand || brand.status !== 1) {
      return res.status(404).json({ message: "Brand not found or inactive" });
    }
    brand.update({ status: 0 });

    await Record.create({ userId: brand.userId, action: "deleteBrand" });

    res.status(200).send(brand);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findOne({
      where: {
        id,
        status: 1,
      },
    });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found or inactive" });
    }

    res.status(200).send(brand);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
