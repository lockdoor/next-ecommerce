import axios from "axios";

export const create = async(payload) => {
  const {data} = await axios.post("/api/product/create", payload)
  return data
}

export const list = async() => {
  const {data} = await axios.get('/api/product/list')
  return data
}

export const update = async(payload) => {
  const {data} = await axios.put(`/api/product/${payload._id}`, payload.productData)
  return data
}

export const remove = async(slug) => {
  const {data} = await axios.delete(`/api/product/${slug}`)
  return data
}

