import Link from "next/link";
import React from "react";

export default function AdminMenu({ page }) {
  return (
    <div>
      <div className="header-menu">Admin Menu</div>
      <ul>
        <Link
          href={"/dashboard/admin/createCategory"}
          className={`${
            page === "createCategory"
              ? "admin-menu-item-active"
              : "admin-menu-item "
          }`}
        >
          <li>Create Category</li>
        </Link>

        <Link
          href={"/dashboard/admin/createProduct"}
          className={`${
            page === "createProduct"
              ? "admin-menu-item-active"
              : "admin-menu-item "
          }`}
        >
          <li>Create Product</li>
        </Link>

        <Link
          href={"/dashboard/admin/products"}
          className={`${
            page === "products" ? "admin-menu-item-active" : "admin-menu-item "
          }`}
        >
          <li>Products</li>
        </Link>

        <Link
          href={"/dashboard/admin/manageOrders"}
          className={`${
            page === "orders" ? "admin-menu-item-active" : "admin-menu-item "
          }`}
        >
          <li>Manage Orders</li>
        </Link>

      </ul>
    </div>
  );
}
