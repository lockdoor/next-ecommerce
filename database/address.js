import connectDB from "./connectDB";
import User from "@/models/user";
import { Types } from "mongoose";

export const create = async (req, res) => {
  try {
    const {
      zipcode,
      province,
      amphoe,
      district,
      name,
      etc,
      phone,
      userId,
      isMain,
    } = req.body;

    const address = {
      zipcode,
      province,
      amphoe,
      district,
      name,
      etc,
      phone,
      isMain,
    };
    await connectDB();
    const countAddresses = await User.aggregate([
      { $match: { $expr: { $eq: ["$_id", { $toObjectId: userId }] } } },
      { $addFields: { size: { $size: "$addresses" } } },
      { $limit: 1 },
      { $project: { size: 1 } },
    ]);
    if (countAddresses[0].size === 0) address.isMain = true;
    const user = await User.findByIdAndUpdate(userId, {
      $push: { addresses: address },
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.json({ error: "error by create address" });
  }
};

export const list = async (req, res) => {
  try {
    const { userId } = req.query;
    await connectDB();
    const list = await User.findById(userId).select("addresses");
    res.json(list);
  } catch (err) {
    console.log(err);
    res.json({ error: "error by create address" });
  }
};

export const remove = async (req, res) => {
  try {
    const { userId, addressId } = req.query;
    await connectDB();
    const address = await User.findOne(
      { "addresses._id": addressId },
      { addresses: { $elemMatch: { _id: addressId } } }
    );
    if (address?.addresses[0]?.isMain)
      return res.json({ error: "can not delete main address" });
    const response = await User.updateOne(
      { _id: userId },
      { $pull: { addresses: { _id: addressId } } }
    );
    res.json(response);
  } catch (err) {
    console.log(err);
    res.json({ error: "error by create address" });
  }
};

export const update = async (req, res) => {
  try {
    const address = Object.assign(req.body);
    const { _id, userId } = address;
    delete address._id;
    delete address.userId;
    await connectDB();
    const response = await User.updateOne(
      { "addresses._id": _id },
      { "addresses.$": address }
    );
    res.json(response);
  } catch (err) {
    console.log(err);
    res.json({ error: "error by update address" });
  }
};

export const updateMain = async (req, res) => {
  try {
    const { addressId, userId } = req.query;
    await connectDB();
    const response = await User.bulkWrite([     
      {
        updateOne: {
          filter: { _id: userId },
          update: {
            $set: { 'addresses.$[address].isMain': false },
          },
          arrayFilters: [{"address.isMain": true}],
        },
      },
      {
        updateOne: {
          filter: { _id: userId },
          update: {
            $set: { 'addresses.$[address].isMain': true },
          },
          arrayFilters: [{"address._id": new Types.ObjectId(addressId) }],
        },
      },
      
    ]);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.json({ error: "error by updateMain address" });
  }
};
