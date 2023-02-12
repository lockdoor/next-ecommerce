import slugify from "slugify";
import connectDB from "./connectDB";
import Product from "@/models/product";
import validator from "validator";
import Category from "@/models/category";
import fs from "fs";

export const create = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name || validator.isEmpty(name):
        return res.json({ error: "name is required" });
      case !description || validator.isEmpty(description):
        return res.json({ error: "description is required" });
      case !price || !validator.isNumeric(price):
        return res.json({ error: "price is required" });
      case !category || !validator.isMongoId(category):
        return res.json({ error: "category is required" });
      case !quantity || !validator.isNumeric(quantity):
        return res.json({ error: "quantity is required" });
      case photo && photo.size > 1000000:
        return res.json({ error: "image should be less than 1mb in size" });
      default:
        break;
    }

    await connectDB();
    const existCategory = await Category.findById(category);
    if (!existCategory) return res.json({ error: "category not found" });

    const product = new Product({ ...req.fields, slug: slugify(name.trim()) });
    if (photo) {
      // console.log(photo)
      product.photo.data = fs.readFileSync(photo.filepath);
      product.photo.contentType = photo.mimetype;
    }

    await product.save();
    const response = product.toObject();
    delete response.photo;
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    if (err.code === 11000)
      return res.json({
        error: `slug ${err.keyValue.slug} is existed try other name`,
      });
    res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    await connectDB();
    const products = await Product.find({})
      .populate({ path: "category" })
      .limit(10)
      .select("-photo")
      .sort({ updatedAt: -1 });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

export const photo = async (req, res) => {
  try {
    const { productId } = req.query;
    // console.log(productId)
    if (!productId || !validator.isMongoId(productId))
      return res.json({ error: "file not found" });
    await connectDB();
    const photo = await Product.findById(productId).select("photo");
    if (photo?.photo.data) {
      res.setHeader("Content-Type", photo.photo.contentType);
      res.send(photo.photo.data);
    } else {
      res.json({ error: "file not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

export const update = async (req, res) => {
  try {
    const { productId } = req.query;
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name || validator.isEmpty(name):
        return res.json({ error: "name is required" });
      case !description || validator.isEmpty(description):
        return res.json({ error: "description is required" });
      case !price || !validator.isNumeric(price):
        return res.json({ error: "price is required" });
      case !category || !validator.isMongoId(category):
        return res.json({ error: "category is required" });
      case !quantity || !validator.isNumeric(quantity):
        return res.json({ error: "quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(400)
          .json({ error: "image should be less than 1mb in size" });
      default:
        break;
    }

    await connectDB();

    // const product = new Product({...req.fields, slug: slugify(name.trim())})
    const product = await Product.findByIdAndUpdate(
      productId,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      // console.log(photo)
      product.photo.data = fs.readFileSync(photo.filepath);
      product.photo.contentType = photo.mimetype;
    }

    await product.save();
    const response = product.toObject();
    delete response.photo;
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    if (err.code === 11000)
      return res.json({
        error: `slug ${err.keyValue.slug} is existed try other name`,
      });
    res.status(400).json(err.message);
  }
};

export const remove = async (req, res) => {
  try {
    const { productId } = req.query;
    const filter = validator.isMongoId(productId)
    ? { _id: productId }
    : { slug: productId };
    await connectDB();
    const product = await Product.findOneAndRemove(filter).select('-photo')
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

export const read = async (req, res) => {
  try {
    const { productId } = req.query;
    const filter = validator.isMongoId(productId)
      ? { _id: productId }
      : { slug: productId };
    await connectDB();
    const product = await Product.findOne(filter)
      .populate({ path: "category" })
      .select("-photo");
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};
