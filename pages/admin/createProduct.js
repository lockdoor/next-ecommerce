import React, { useState } from "react";
import LayoutMain from "@/components/layout/layoutMain";
import LayoutAdmin from "@/components/layout/layoutAdmin";
import FormProduct from "@/components/form/formProduct";
import {create} from '@/libs/clientRequest/product'
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
// const data = {name: 'iphone 14', description: 'this is description', price: 5672, quantity: 59}

export default function CreateProduct() {

  // state
  const [formData, setFormData] = useState({})

  // hook
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const productData = new FormData();
      formData.photo && productData.append("photo", formData.photo);
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("category", formData.category);
      productData.append("quantity", formData.quantity);
      productData.append("shipping", formData.shipping);
    const response = await create(productData)
    if(response?.error){
      toast.error(response.error)
    }else{
      setFormData({})
      router.push('/admin/products')
    }
  }

  return (
    <LayoutMain>
      <LayoutAdmin headText={"Create Product"} page="createProduct">
        <FormProduct formData={formData} setFormData={setFormData} handleSubmit={handleSubmit}/>
      </LayoutAdmin>
    </LayoutMain>
  );
}
