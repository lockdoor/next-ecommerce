import connectDB from "./connectDB";
import Cart from "@/models/cart";

export async function create(req, res){
  try{
    const {productId, userId} = req.body
    // console.log({productId, userId, amount})
    await connectDB()
    const cart = await Cart.create({product: productId, user: userId})
    console.log(cart)
    res.json(cart)
  }
  catch(err){
    if(err.code === 11000) return res.json({error: 'Product is already in Cart'})
    res.json({error: 'error on create cart item'})
    console.log(err)
  }
}

export async function listByUserId(req, res){
  try{
    // console.log(req.query)
    const {userId} = req.query
    await connectDB()
    const cartList = await Cart.find({user: userId})
      .populate({path: 'user', select: 'name email role'})
      .populate({
        path: 'product', 
        populate: {path: 'category'},
        select: "-photo"
      }).select('-user')
    res.json(cartList)
  }
  catch(err){
    res.json({error: 'error on listByUserId'})
    console.log(err)
  }
}

export async function removeProductInCart(req, res){
  try{
    // console.log(req.query, req.userId)
    const {cartId} = req.query
    const userId = req.userId
    await connectDB()
    const response = await Cart.findOneAndDelete({_id: cartId, user: userId}) 
    // console.log(response)
    res.json(response)
  }
  catch(err){
    res.json({error: 'error on removeProductInCart'})
    console.log(err)
  }
}