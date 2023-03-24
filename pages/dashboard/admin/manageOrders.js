import React from "react";
import LayoutMain from "@/components/layout/layoutMain";
import LayoutAdmin from "@/components/layout/layoutAdmin";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { list, updateStatus } from "@/libs/clientRequest/order";
import CardUserOrders from "@/components/card/cardUserOrders";
import moment from "moment";
import { Select } from "antd";
import { toast } from "react-hot-toast";

const options = [
  { label: "Not processed", value: "Not processed" },
  { label: "Processing", value: "Processing" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Canceled", value: "Canceled" },
];

export default function Order() {

  // hook
  const { data: orders } = useQuery("listOrder", list);

  return (
    <LayoutMain>
      <LayoutAdmin page={"order"} headText={"Manage Orders"}>
        <div>
          {/* <pre>{JSON.stringify(orders, null, 4)}</pre> */}
          {orders?.length > 0 && orders.map((o) => <Card o={o} key={o._id} />)}
        </div>
      </LayoutAdmin>
    </LayoutMain>
  );
}

const Card = ({ o }) => {

  // hook
  const queryClient = useQueryClient()
  const updateStatusMutation = useMutation(updateStatus, {
    onSuccess: (response) => {
      if(response?.error){
        toast.error(response.error)
      }else{
        // console.log(response)
        toast.success(`update status from ${o.status} to ${response.status}`)
        queryClient.prefetchQuery("listOrder", list)
      }
    }
  })

  // function
  const handleStatusChange = (value) => {
    const payload = {
      orderId: o._id, status: value
    }
    updateStatusMutation.mutate(payload)
  };

  return (
    <div key={o._id} className="border shadow-md my-3 rounded-md">
      <div className="flex justify-between items-center bg-slate-200 rounded-t-md p-3">
        <div>
          <label>Status: </label>
          <Select
            options={options}
            defaultValue={o.status}
            className="w-36"
            onChange={handleStatusChange}
          />
        </div>

        <div>Buyer: {o.buyer.name}</div>
        <div>Payment: {o.payment ? "True" : "False"}</div>
      </div>
      {o.products.map((p) => (
        <CardUserOrders p={p} key={p._id} />
      ))}
      <div className="flex justify-between p-3">
        <div>Total price: {o.totalPrice}</div>
        <div>Date: {moment(o.createdAt).fromNow()}</div>
        <div>View order details</div>
      </div>
    </div>
  );
};
