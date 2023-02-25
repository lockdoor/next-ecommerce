import axios from "axios";

export const create = async (payload) => {
  const {data} = await axios.post("/api/cart", payload)
  return data
}

export const listByUserId = async (userId) => {
  if(!userId) return
  const {data} = await axios.get(`/api/cart/${userId}`)
  return data
}

export const removeProductInCart = async (cartId) => {
  const {data} = await axios.delete(`/api/cart?cartId=${cartId}`)
  return data
}