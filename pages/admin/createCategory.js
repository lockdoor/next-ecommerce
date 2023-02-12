import React, { useState } from "react";
import LayoutMain from "@/components/layout/layoutMain";
import LayoutAdmin from "@/components/layout/layoutAdmin";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { create, list, update, remove } from "@/libs/clientRequest/category";
import { Modal } from "antd";
import { toast } from "react-hot-toast";
import { DeleteOutlined } from "@ant-design/icons";

export default function CreateCategory() {
  // state
  const [name, setName] = useState("");

  // hook
  const queryClient = useQueryClient();
  const createMutation = useMutation(create, {
    onSuccess: (response) => {
      if (response?.error) {
        toast.error(response.error);
      } else {
        setName("");
        queryClient.prefetchQuery("list", list);
        toast.success(`${response.name} is created`);
      }
    },
  });

  // function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    createMutation.mutate({ name });
  };
  return (
    <LayoutMain>
      <LayoutAdmin headText={"Create Category"} page="createCategory">
        <Form name={name} setName={setName} handleSubmit={handleSubmit} />
        <Categories />
      </LayoutAdmin>
    </LayoutMain>
  );
}

const Form = ({
  name,
  setName,
  handleSubmit,
  handleRemove,
  btnText = "Submit",
}) => {
  return (
    <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write Category Name ..."
        className="inline-block flex-1 border border-gray-400 outline-slate-900 py-2 rounded-lg px-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="Submit"
        className="bg-slate-600 text-white px-10 py-2 rounded-lg hover:text-xl"
      >
        {btnText}
      </button>
      {handleRemove && (
        <DeleteOutlined
          onClick={handleRemove}
          style={{ fontSize: 32, color: "red" }}
        />
      )}
    </form>
  );
};

const Categories = () => {
  // state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [select, setSelect] = useState(null);
  const [name, setName] = useState("");

  // hook
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery("list", list);
  const updateMutation = useMutation(update, {
    onSuccess: (response) => {
      if (response?.error) {
        toast.error(response.error);
      } else {
        setName("");
        setIsModalOpen(false);
        setSelect(null);
        queryClient.prefetchQuery("list", list);
        toast.success(`${response?.name} is update`);
      }
    },
  });
  const removeMutation = useMutation(remove, {
    onSuccess: (response) => {
      if (response?.error) {
        toast.error(response.error);
      } else {
        setName("");
        setIsModalOpen(false);
        setSelect(null);
        queryClient.prefetchQuery("list", list);
        toast.success(`${response?.name} is delete`);
      }
    },
  });

  // function
  const handleClick = (c) => {
    setSelect(c);
    setName(c.name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (name === select.name) return;
    const payload = { _id: select._id, name };
    updateMutation.mutate(payload);
  };

  const handleRemove = () => {
    removeMutation.mutate(select._id);
  };

  if (isLoading) return <div>Categories is loading</div>;
  if (isError) return <div>has error {error}</div>;
  return (
    <div className="flex flex-wrap gap-3 my-4">
      {data.map((c) => (
        <div
          key={c._id}
          className="border border-slate-500 px-3 py-2 rounded-lg hover:bg-slate-500 hover:border-none hover:text-white shadow-md hover:shadow-xl  cursor-pointer"
          onClick={() => handleClick(c)}
        >
          {c.name}
        </div>
      ))}
      <Modal
        closable={false}
        footer={null}
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <Form
          name={name}
          setName={setName}
          handleSubmit={handleUpdate}
          handleRemove={handleRemove}
          btnText="Update"
        />
      </Modal>
    </div>
  );
};
