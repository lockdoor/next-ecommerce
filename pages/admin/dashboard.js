import React from "react";
import LayoutMain from "@/components/layout/layoutMain";
import LayoutAdmin from "@/components/layout/layoutAdmin";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data } = useSession();

  return (
    <LayoutMain>
      <LayoutAdmin headText={"Admin Info"}>
        <div className="px-2 py-3">
          <span className="w-1/3 inline-block">Admin Name: </span>
          <span className="w-2/3 inline-block">{data?.token.name}</span>
        </div>
        <div className="px-2 py-3">
          <span className="w-1/3 inline-block">Admin Email: </span>
          <span className="w-2/3 inline-block">{data?.token.email}</span>
        </div>
      </LayoutAdmin>
    </LayoutMain>
  );
}
