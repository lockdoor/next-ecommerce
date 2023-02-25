import React from "react";
import { useSession } from "next-auth/react";
import LayoutMain from "@/components/layout/layoutMain";
import LayoutUser from "@/components/layout/layoutUser";
export default function Dashboard() {
  const { data } = useSession();
  return (
    <LayoutMain>
      <LayoutUser headText={"User Info"}>
        <div className="px-2 py-3">
          <span className="w-1/3 inline-block">User Name: </span>
          <span className="w-2/3 inline-block">{data?.token.name}</span>
        </div>
        <div className="px-2 py-3">
          <span className="w-1/3 inline-block">User Email: </span>
          <span className="w-2/3 inline-block">{data?.token.email}</span>
        </div>
      </LayoutUser>
    </LayoutMain>
  );
}
