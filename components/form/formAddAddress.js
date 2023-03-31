import React, { useEffect, useState } from "react";
import { filterAddress } from "@/libs/clientRequest/address";
import { useQueryClient, useMutation } from "react-query";
import { create, list, update } from "@/libs/clientRequest/address";
import { toast } from "react-hot-toast";

export default function FormAddAddress({
  setShow,
  userId, //for create
  address, //for update
  setAddress, //for update
}) {

  // state
  const [zipcode, setZipcode] = useState("");
  const [etc, setEtc] = useState("");
  const [data, setData] = useState("");
  const [phone, setPhone] = useState("");
  const [select, setSelect] = useState({});
  const [name, setName] = useState("");

  // hook
  const queryClient = useQueryClient();
  const createMutation = useMutation(create, {
    onSuccess: (response) => {
      if (response?.error) {
        toast.error(response.error);
      } else {
        queryClient.prefetchQuery(["list", userId], () => list(userId));
        toast.success("create address succesful");
        
        setZipcode('')
        setEtc('')
        setPhone('')
        setName('')
        setSelect({})
        setShow(false);
      }
    },
  });
  const updateMutation = useMutation(update, {
    onSuccess: (response) => {
      if (response?.error) {
        toast.error(response.error);
      } else {
        setAddress(null)
        queryClient.prefetchQuery(["list", userId], () => list(userId));
        toast.success("create address succesful");
        setShow(false);
      }
    },
  });

  

  // function
  const handleChangeZipcode = async (e) => {
    e.preventDefault();
    const regex = /[^0-9]/g;
    e.target.value = e.target.value.replace(regex, "");
    setData([]);
    setZipcode(e.target.value);
    if (e.target.value.length === 5) {
      const response = await filterAddress("zipcode", e.target.value);
      setData(response);
    }
  };

  const handleSelect = (e) => {
    setSelect(e);
    setData([]);
  };

  const handleChangeTel = async (e) => {
    e.preventDefault();
    const regex = /[^0-9]/g;
    e.target.value = e.target.value.replace(regex, "");
    setPhone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      zipcode: zipcode,
      province: select.province,
      amphoe: select.amphoe,
      district: select.district,
      name: name,
      etc: etc,
      phone: phone,
      userId: userId,
    };
    // console.log(payload)
    createMutation.mutate(payload);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const payload = {
      zipcode: zipcode,
      province: select.province,
      amphoe: select.amphoe,
      district: select.district,
      name: name,
      etc: etc,
      phone: phone,
      userId: userId,
      isMain: isMain,
      _id: address._id
    };
    updateMutation.mutate(payload)
  };

  const handleCancel = () => {
    console.log("handleCancel work")
    setShow(false);
    address && setAddress(null);
  };

  useEffect(() => {
    if (address) {
      const sss = {
        province: address.province,
        amphoe: address.amphoe,
        district: address.district,
      };
      setZipcode(address.zipcode);
      setEtc(address.etc);
      setSelect(sss);
      setPhone(address.phone);
      // setIsMain(address.isMain);
    }
  }, [address]);

  // console.log({ address });
  return (
    <div>
      {/* <div className="text-center text-xl">Create Address</div> */}
      <form
        onSubmit={address ? handleUpdate : handleSubmit}
        className="my-3 max-w-lg mx-auto border border-green-300 rounded-md shadow-md py-2 px-5"
      >
        {/* zipcode */}
        <div className="my-3">
          <label htmlFor="zipcode">Zipcode: </label>
          <input
            id="zipcode"
            type={"text"}
            className="border border-green-300 w-20 text-center py-1 px-2 rounded-md outline-green-500"
            minLength={5}
            maxLength={5}
            required
            pattern="[0-9]*"
            value={zipcode}
            onChange={handleChangeZipcode}
          />
          <ul className="top-nav-dropdown !translate-y-3">
            {data.length > 0 &&
              data.map((e, i) => (
                <li
                  key={i}
                  onClick={() => handleSelect(e)}
                  className=" top-nav-dropdown-item text-blue-400 !text-base"
                >
                  {e.province} {">>>"} {e.amphoe} {">>>"} {e.district}
                </li>
              ))}
          </ul>
        </div>

        {/* province */}
        <div className="my-3">
          <label htmlFor="province">Province: </label>
          <input
            id="province"
            type={"text"}
            // className="border border-green-300"
            disabled
            required
            value={select?.province || ''}
            // onChange={(e) => setEtc(e.target.value)}
          />
        </div>

        {/* amphoe */}
        <div className="my-3">
          <label htmlFor="amphoe">Amphoe: </label>
          <input
            id="amphoe"
            type={"text"}
            // className="border border-green-300"
            required
            disabled
            value={select?.amphoe || ''}
            // onChange={(e) => setEtc(e.target.value)}
          />
        </div>

        {/* district */}
        <div className="my-3">
          <label htmlFor="district">District: </label>
          <input
            id="district"
            type={"text"}
            // className="border border-green-300"
            required
            disabled
            value={select?.district || ''}
            // onChange={(e) => setEtc(e.target.value)}
          />
        </div>

        {/* name */}
        <div className="my-3">
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type={"text"}
            className="border w-full border-green-300 py-1 px-2 rounded-md outline-green-500"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* etc */}
        <div className="my-3">
          <label htmlFor="etc">Address: </label>
          <textarea
            id="etc"
            // type={"text"}
            className="border border-green-300 w-full py-1 px-2 rounded-md outline-green-500"
            required
            value={etc}
            onChange={(e) => setEtc(e.target.value)}
          />
        </div>

        {/* phone */}
        <div>
          <label htmlFor="tel">Phone: </label>
          <input
            id="tel"
            type={"text"}
            className="border border-green-300 py-1 px-2 rounded-md outline-green-500"
            pattern="[0-9]*"
            required
            value={phone}
            onChange={handleChangeTel}
          />
        </div>

        {/* btn */}
        <div className="mt-10 flex justify-center gap-10">
          <button
            onClick={handleCancel}
            className="btn-submit flex-1 !bg-orange-400 !hover:bg-orange-600"
          >
            Cancel
          </button>
          <button type="submit" className="btn-submit flex-1">
            {address ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
