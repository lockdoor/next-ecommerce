import Link from "next/link";
import React from "react";

export default function UserMenu({ page }) {
  return (
    <div>
      <div className="header-menu">User Menu</div>
      <ul>
        <Link
          href={"/dashboard/user/profile"}
          className={`${
            page === "userProfile"
              ? "admin-menu-item-active"
              : "admin-menu-item "
          }`}
        >
          <li>User Profile</li>
        </Link>

        {/* <Link
          href={"/dashboard/admin/createProduct"}
          className={`${
            page === "createProduct"
              ? "admin-menu-item-active"
              : "admin-menu-item "
          }`}
        >
          <li>Create Product</li>
        </Link> */}

        {/* <Link
          href={"/dashboard/admin/products"}
          className={`${
            page === "products" ? "admin-menu-item-active" : "admin-menu-item "
          }`}
        >
          <li>Products</li>
        </Link> */}
      </ul>
    </div>
  );
}
