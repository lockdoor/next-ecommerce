import React from "react";
import { useQueryClient, useMutation } from "react-query";
import {remove, list, updateMain} from '@/libs/clientRequest/address'
import { toast } from "react-hot-toast";

export default function CardAddress({ a, userId, setShowForm, setSelect }) {

  // hook
  const queryClient = useQueryClient()
  const deleteMutation = useMutation(remove, {
    onSuccess: (response) => {
      if(response?.error){
        toast.error(response.error)
      }else{
        toast.success('delete address success')
        queryClient.prefetchQuery(["list", userId], () => list(userId))
      }
    }
  })
  const updateMainMutation = useMutation(updateMain, {
    onSuccess: (response) => {
      if(response?.error){
        toast.error(response.error)
      }else{
        toast.success('update main address success')
        queryClient.prefetchQuery(["list", userId], () => list(userId))
      }
    }
  })

  // function
  const handleDelete = () => {
    const payload = {userId, addressId: a._id}
    deleteMutation.mutate(payload)
  }
  const handleEdit = () => {
    setShowForm(true)
    setSelect(a)
  }
  const handleIsMainChange = (e) => {
    e.preventDefault()
    if(e.target.checked){
      updateMainMutation.mutate({addressId: a._id, userId})
    }
  }
  // console.log(a._id)
  return (
    <div className="border border-green-400 rounded-md py-2 px-5 max-w-md mx-auto">
      <div>
        <input type={"checkbox"} checked={a.isMain} disabled={a.isMain ? true : false} onChange={handleIsMainChange}/>
        <label>Set to main</label>
      </div>
      <div className="flex ">
        <div className="w-1/4">Name:</div>
        <div className="w-3/4">{a.name}</div>
      </div>
      <div className="flex ">
        <div className="w-1/4">Zipcode:</div>
        <div className="w-3/4">{a.zipcode}</div>
      </div>
      <div className="flex ">
        <div className="w-1/4">Province:</div>
        <div className="w-3/4">{a.province}</div>
      </div>
      <div className="flex ">
        <div className="w-1/4">Amphoe:</div>
        <div className="w-3/4">{a.amphoe}</div>
      </div>
      <div className="flex ">
        <div className="w-1/4">District:</div>
        <div className="w-3/4">{a.district}</div>
      </div>
      <div className="flex ">
        <div className="w-1/4">Etc:</div>
        <div className="w-3/4">{a.etc}</div>
      </div>
      <div className="flex ">
        <div className="w-1/4">Phone:</div>
        <div className="w-3/4">{a.phone}</div>
      </div>
      <div className="flex justify-between gap-5 mt-5">
        <button
        onClick={handleDelete}
        className="bg-red-500 w-20 rounded-md text-white py-2 hover:bg-red-600">Delete</button>
        <button
        onClick={handleEdit}
        className="bg-orange-500 w-20 rounded-md text-white py-2 hover:bg-orange-600"
        >Update</button>
      </div>
    </div>
  );
}

// {
//   name: 'พิษณุ นามนิล',
//   province: 'กรุงเทพมหานคร',
//   amphoe: 'คลองเตย',
//   district: 'คลองเตย',
//   etc: '100/822 ชุมชนพัฒนา 70 ไร่ ซอย 30',
//   phone: '0909401271',
//   zipcode: 10110,
//   isMain: false,
//   _id: new ObjectId("63fd5de212fae79532805d4b")
// }
