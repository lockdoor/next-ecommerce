import React, { useState, useEffect } from "react";
import LayoutMain from "@/components/layout/layoutMain";
import LayoutAdmin from "@/components/layout/layoutAdmin";
import FormProduct from "@/components/form/formProduct";
import axios from "axios";
import { toast } from "react-hot-toast";
import { update, remove } from "@/libs/clientRequest/product";
import { useRouter } from "next/router";

export default function ProductUpdate({ slug }) {
  const [formData, setFormData] = useState({});

  const router = useRouter();
  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/api/product/${slug}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        // console.log(data)
        const form = {
          name: data?.name,
          description: data?.description,
          price: data?.price,
          category: data?.category?._id,
          quantity: data?.quantity,
          shipping: data?.shipping,
          _id: data?._id,
          slug: data?.slug,
        };
        setFormData({ ...form });
      }
    } catch (err) {
      console.log(err);
      toast.error("load product failed, try again");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      formData.photo && productData.append("photo", formData.photo);
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("category", formData.category);
      productData.append("quantity", formData.quantity);
      productData.append("shipping", formData.shipping);
      const response = await update({ productData, _id: formData._id });
      if (response?.error) {
        toast.error(response.error);
      } else {
        setFormData({});
        toast.success("update success");
        router.push("/dashboard/admin/products");
      }
    } catch (err) {
      console.log(err);
      toast.error("Somethings wrong when update try again");
    }
  };

  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      const response = await remove(slug);
      if (response?.error) {
        toast.error(response.error);
      } else {
        setFormData({});
        toast.success(`delete ${response.name} success`);
        router.push("/dashboard/admin/products");
      }
    } catch (err) {
      console.log(err);
      toast.error("Somethings wrong when delete try again ");
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);
  return (
    <LayoutMain>
      <LayoutAdmin headText={"Update Product"}>
        {formData?.name && (
          <FormProduct
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleUpdate}
            handleRemove={handleRemove}
          />
        )}
      </LayoutAdmin>
    </LayoutMain>
  );
}

export async function getServerSideProps(context) {
  // console.log('query is =>' ,context.params)
  const { slug } = context.params;
  return {
    props: { slug },
  };
}
