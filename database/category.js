import slugify from "slugify";
import connectDB from "./connectDB";
import Category from "@/models/category";

export const create = async (req, res) => {
  try {
    await connectDB();
    const { name } = req.body;
    const category = await Category.create({ name, slug: slugify(name) });
    res.json(category);
  } catch (err) {
    console.log(err);
    if (err.code === 11000)
      return res.json({ error: "name is already" });
    res.status(400).json(err);
  }
};

export const update = async (req, res) => {
  try {
    await connectDB();
    const { categoryId } = req.query;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(category);
  } catch (err) {
    console.log(err);
    if (err.code === 11000)
      return res.json({ error: "name is already" });
    res.status(400).json(err);
  }
};

export const remove = async (req, res) => {
  try {
    await connectDB();
    const { categoryId } = req.query;
    const category = await Category.findByIdAndRemove(categoryId);
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const list = async (req, res) => {
  try {
    await connectDB();
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

export const read = async (req, res) => {
  try {
    await connectDB();
    const { categoryId } = req.query;
    const category = await Category.findById(categoryId);
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

