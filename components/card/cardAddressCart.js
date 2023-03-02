import React from "react";

export default function CardAddressCart({ address }) {
  return (
    <>
      <span>Name: {address.name},</span>
      <span>Address: {address.etc},</span>
      <span>District: {address.district},</span>
      <span>Amphoe: {address.amphoe},</span>
      <span>Province: {address.province},</span>
      <span>Zipcode: {address.zipcode},</span>
      <span>Phone: {address.phone}</span>
    </>
  );
}
