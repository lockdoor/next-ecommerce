import axios from "axios";

export const verifyRegister = async(token)=>{
  const {data} = await axios.get(`/api/auth/register?token=${token}`)
  return data
}

export const recovery = async(payload) => {
  const {data} = await axios.post('/api/auth/recovery', payload)
  return data
}

export const verifyRecovery = async(payload) => {
  const {data} = await axios.put('/api/auth/recovery', payload)
  return data
}

export const changeName = async(userId, name) => {
  const {data} = await axios.post('/api/user/change_name', {userId, name})
  return data
}

export const changePassword = async(userId, oldPassword, newPassword) => {
  const {data} = await axios.post('/api/user/change_password', {userId, oldPassword, newPassword})
  return data
}