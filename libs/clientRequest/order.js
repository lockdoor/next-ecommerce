import axios from "axios";

export const listByUserId = async(userId) => {
  const {data} = await axios.get(`/api/order/userId/${userId}`)
  return data
}

export const list = async() => {
  const {data} = await axios.get(`/api/order`)
  return data
}

export const updateStatus = async(payload) => {
  const {data} = await axios.put(`/api/order/updateStatus`, payload)
  return data
}