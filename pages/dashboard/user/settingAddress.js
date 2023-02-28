import React, { useState } from "react";
import LayoutMain from "@/components/layout/layoutMain";
import LayoutUser from "@/components/layout/layoutUser";
import FormAddAddress from "@/components/form/formAddAddress";
import { useQuery } from "react-query";
import { list } from "@/libs/clientRequest/address";
import { useSession } from "next-auth/react";
import CardAddress from "@/components/card/cardAddress";

export default function SettingAddress() {
  // hook
  const { data: session } = useSession();
  const userId = session?.token._id;
  const { data } = useQuery(["list", userId], () => list(userId));

  // state
  const [select, setSelect] = useState(null);
  const [showFormAdd, setShowFormAdd] = useState(false);

  return (
    <LayoutMain>
      <LayoutUser headText={"Setting Address"} page={"settingAddress"}>
        <button
          onClick={() => setShowFormAdd(true)}
          className="block max-w-sm mx-auto bg-green-400 px-10 py-2 rounded-md"
        >
          Add Address
        </button>

        {showFormAdd && (
          <FormAddAddress
            setShow={setShowFormAdd}
            userId={userId}
            address={select}
            setAddress={setSelect}
          />
        )}

        {/* show address list */}
        {(data?.addresses?.length > 0 && !showFormAdd) &&
          data.addresses.map((a) => (
            <CardAddress
              key={a._id}
              a={a}
              userId={userId}
              setShowForm={setShowFormAdd}
              setSelect={setSelect}
            />
          ))}
      </LayoutUser>
    </LayoutMain>
  );
}
