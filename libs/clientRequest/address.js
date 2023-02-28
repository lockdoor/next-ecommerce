import axios from "axios";

export const filterAddress = async(type, keyword) => {
  const {data} = await axios.get(`/api/user/filter_address?type=${type}&keyword=${keyword}`)
  return data
}

export const create = async(payload) => {
  // console.log(payload)
  const {data} = await axios.post(`/api/user/address/${payload?.userId}`, payload)
  return data
}

export const update = async(payload) => {
  // console.log(payload)
  const {data} = await axios.put(`/api/user/address/${payload?.userId}`, payload)
  return data
}

export const list = async(userId) => {
  if(!userId) return
  const {data} = await axios.get(`/api/user/address/${userId}`)
  return data
}

export const remove = async({userId, addressId}) => {
  const {data} = await axios.delete(`/api/user/address/${userId}?addressId=${addressId}`)
  return data
}

export const updateMain = async({addressId, userId}) => {
  const {data} = await axios.put(
    `/api/user/address/main?addressId=${addressId}&userId=${userId}`)
  return data
}
