import Link from "next/link";
import React from "react";

export default function UserMenu({ page }) {
  return (
    <div>
      <div className="header-menu">User Menu</div>
      <ul>
        <Link
          href={"/dashboard/user/settingProfile"}
          className={`${
            page === "settingProfile"
              ? "admin-menu-item-active"
              : "admin-menu-item "
          }`}
        >
          <li>Setting Profile</li>
        </Link>

        <Link
          href={"/dashboard/user/settingAddress"}
          className={`${
            page === "settingAddress"
              ? "admin-menu-item-active"
              : "admin-menu-item "
          }`}
        >
          <li>Setting Address</li>
        </Link>

        <Link
          href={"/dashboard/user/order"}
          className={`${
            page === "order"
              ? "admin-menu-item-active"
              : "admin-menu-item "
          }`}
        >
          <li>Order</li>
        </Link>

        
      </ul>
    </div>
  );
}
