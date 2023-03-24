import connectDB from "./connectDB";
import Order from "@/models/order";
import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENGRID_KEY)

export const listByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    await connectDB();
    const list = await Order.aggregate([
      {
        $match: { $expr: { $eq: ["$buyer", { $toObjectId: userId }] } },
      },
      {
        $lookup: {
          from: "users",
          localField: "buyer",
          foreignField: "_id",
          let: { address: "$address" },
          as: "buyer",
          pipeline: [
            {
              $unwind: "$addresses",
            },
            { $match: { $expr: { $eq: ["$addresses._id", "$$address"] } } },
            { $addFields: { address: "$addresses" } },

            {
              $project: {
                name: 1,
                email: 1,
                role: 1,
                address: 1,
              },
            },
          ],
        },
      },
      { $addFields: { buyer: { $first: "$buyer" } } },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          
          as: "product",
          pipeline: [
            
            { $project: { description: 0, photo: 0, createdAt: 0, updatedAt: 0 } },
           
          ],
        },
      },
      { $set: { "products.product": { $first: "$product" } } },
      {
        $group: {
          _id: "$_id",
          products: { $push: "$products" },
          totalPrice: {$sum: {$multiply: ['$products.amount', '$products.product.price']}},
          buyer: { $first: "$buyer" },
          status: { $first: "$status" },
          payment: { $first: "$payment.success" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
      {$sort: {createdAt: -1}},
    ]);
    res.json(list);
  } catch (error) {
    console.log(error);
    res.json({ error: "error on listOrderByUser" });
  }
};

export const list = async (req, res) => {
  try {
    await connectDB();
    const list = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "buyer",
          foreignField: "_id",
          let: { address: "$address" },
          as: "buyer",
          pipeline: [
            {
              $unwind: "$addresses",
            },
            { $match: { $expr: { $eq: ["$addresses._id", "$$address"] } } },
            { $addFields: { address: "$addresses" } },

            {
              $project: {
                name: 1,
                email: 1,
                role: 1,
                address: 1,
              },
            },
          ],
        },
      },
      { $addFields: { buyer: { $first: "$buyer" } } },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          
          as: "product",
          pipeline: [
            
            { $project: { description: 0, photo: 0, createdAt: 0, updatedAt: 0 } },
           
          ],
        },
      },
      { $set: { "products.product": { $first: "$product" } } },
      {
        $group: {
          _id: "$_id",
          products: { $push: "$products" },
          totalPrice: {$sum: {$multiply: ['$products.amount', '$products.product.price']}},
          buyer: { $first: "$buyer" },
          status: { $first: "$status" },
          payment: { $first: "$payment.success" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
      {$sort: {createdAt: -1}}
    ]);
    res.json(list);
  } catch (error) {
    console.log(error);
    res.json({ error: "error on list" });
  }
};

export const updateStatus = async (req, res) => {
  try{
    const {orderId, status} = req.body
    console.log({orderId, status})
    await connectDB()
    const response = await Order.findByIdAndUpdate(orderId, {status}, {new: true})
      .populate("buyer", "email name")

    // send email
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: response.buyer.email,
      // to: 'lockdoor@gmail.com',
      subject: "Order status",
      html: `
        <h1>Hi ${response.buyer.name}, Your order's status is: <span style={color: red;}>${response.status}</span></h1>
        <p>Visit <a href="${process.env.NEXTAUTH_URL}">your dashboard</a> for more detail.</p>
      `
    }

    await sgMail.send(emailData)

    res.json(response)
  }
  catch(error){
    console.log(error);
    res.json({ error: "error on list" });
  }
}


