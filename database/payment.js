import braintree from "braintree";
import Cart from "@/models/cart";
import Order from "@/models/order";
import Product from "@/models/product";
import connectDB from "./connectDB";

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const getToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const processPayment = async (req, res) => {
  try {
    // console.log(req.body);
    const { nonce, cart, userId } = req.body.payload;
    const amount = cart.reduce((a, b) => a + b.amount * b.product.price, 0);
    // console.log(amount);

    const result = await gateway.transaction
      .sale({
        amount: amount,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      })
      .then((result) => {
        if (result?.success) {
          return result;
        } else {
          return res.json({ error: "error on payment" });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.json({ error: "error on payment" });
      });

    await connectDB();

    // remove product from cart
    const cartIds = cart.map((c) => c._id);
    await Cart.deleteMany({ _id: { $in: cartIds } });

    // reduce quantity from product stocked
    const bulk = cart.map((e) => ({
      updateOne: {
        filter: { _id: e.product._id },
        update: {
          $inc: { quantity: -e.amount, sold: e.amount },
        },
      },
    }));
    await Product.bulkWrite(bulk);

    // create order
    const products = cart.map((c) => ({
      product: c.product,
      amount: c.amount,
    }));
    await Order.create({ user: userId, products, payment: result });

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};
