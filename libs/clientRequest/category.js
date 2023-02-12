import axios from "axios";

export const create = async (payload) => {
  const {data} = await axios
    .post(`/api/category/create`, payload)
  return data  
}

export const list = async () => {
  const {data} = await axios.get(`/api/category/list`)
  return data
}

export const update = async (payload) => {
  const {_id, name} = payload
  const {data} = await axios.put(`/api/category/${_id}`, {name})
  return data
}

export const remove = async (_id) => {
  const {data} = await axios.delete(`/api/category/${_id}`)
  return data
}