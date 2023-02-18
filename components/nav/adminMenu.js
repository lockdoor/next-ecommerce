import Link from "next/link";
import React from "react";

export default function AdminMenu({ page }) {
  return (
    <div>
      <div className="header-menu">Admin Menu</div>
      <ul>
        <li>
          <Link
            href={"/dashboard/admin/createCategory"}
            className={`${
              page === "createCategory"
                ? "admin-menu-item-active"
                : "admin-menu-item "
            }`}
          >
            Create Category
          </Link>
        </li>
        <li>
          <Link
            href={"/dashboard/admin/createProduct"}
            className={`${
              page === "createProduct"
                ? "admin-menu-item-active"
                : "admin-menu-item "
            }`}
          >
            Create Product
          </Link>
        </li>
        <li>
          <Link
            href={"/dashboard/admin/products"}
            className={`${
              page === "products"
                ? "admin-menu-item-active"
                : "admin-menu-item "
            }`}
          >
            Products
          </Link>
        </li>
      </ul>
    </div>
  );
}
