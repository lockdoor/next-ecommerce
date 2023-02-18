import React from "react";
import { useQuery } from "react-query";
import { Select } from "antd";
import { list } from "@/libs/clientRequest/category";
import Image from "next/image";
export default function FormProduct({
  formData,
  setFormData,
  handleSubmit,
  handleRemove,
}) {
  //hook
  const { isLoading, isError, data, error } = useQuery("list", list);

  if (isLoading) return <div>Loading category</div>;
  if (isError) return <div>Has error {error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      {/* photo preview */}
      {formData?.photo ? (
        <Image
          className="block mx-auto"
          height={200}
          width={200}
          src={URL.createObjectURL(formData.photo)}
          alt="Product"
        />
      ) : (
        formData?._id && (
          <Image
            className=" block mx-auto"
            height={200}
            width={200}
            src={`/api/product/photo/${formData._id}?q=${new Date().getTime()}`}
            alt="Product"
          />
        )
      )}

      {/* input photo */}
      <label className="form-input my-3">
        <input
          type={"file"}
          name="photo"
          accept="image/*"
          hidden
          // required
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, photo: e.target.files[0] }))
          }
        />
        {formData?.photo
          ? formData.photo.name
          : formData?._id
          ? "Update photo"
          : "Upload photo"}
      </label>

      {/* input name */}
      <input
        type="text"
        placeholder="Write Product Name ..."
        className="form-input my-3"
        // required
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
        value={formData?.name}
      />

      {/* input description */}
      <textarea
        placeholder="Write Description ..."
        className="form-input my-3"
        // required
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, description: e.target.value }))
        }
        value={formData?.description}
      />

      {/* input price */}
      <input
        type="number"
        placeholder="Enter Price"
        className="form-input my-3"
        min={0}
        // required
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, price: e.target.value }))
        }
        value={formData?.price}
      />

      {/* input category */}
      <Select
        showSearch
        bordered={false}
        placeholder="Select a Category"
        className="form-input"
        size="small"
        // required
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, category: value }))
        }
        value={formData.category}
        options={data}
        fieldNames={{ label: "name", value: "_id", options: data }}
        filterOption={(input, option) =>
          (option?.name ?? "").toLowerCase().includes(input.toLowerCase())
        }
      />

      {/* input quantity */}
      <input
        type="number"
        placeholder="Enter quantity"
        className="form-input my-3"
        min={0}
        // required
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, quantity: e.target.value }))
        }
        value={formData?.quantity}
      />

      {/* input shipping */}
      <Select
        bordered={false}
        placeholder="Select Shipping"
        className="form-input my-3"
        size="small"
        // required
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, shipping: value }))
        }
        value={formData?.shipping}
        options={[
          { label: "YES", value: true },
          { label: "NO", value: false },
        ]}
      />

      {/* button submit */}
      <button type="submit" className="w-1/3 bg-blue-400 py-3 rounded-md mb-5">
        {formData._id ? "Update" : "Submit"}
      </button>
      {handleRemove && (
        <button
          onClick={handleRemove}
          className="w-1/3 bg-red-600 py-3 rounded-md float-right"
        >
          Remove
        </button>
      )}
    </form>
  );
}
