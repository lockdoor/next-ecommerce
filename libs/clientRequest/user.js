import axios from "axios";

export const changeName = async(userId, name) => {
  const {data} = await axios.post('/api/user/change_name', {userId, name})
  return data
}

export const changePassword = async(userId, oldPassword, newPassword) => {
  const {data} = await axios.post('/api/user/change_password', {userId, oldPassword, newPassword})
  return data
}