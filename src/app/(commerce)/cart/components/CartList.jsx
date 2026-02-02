"use client";

import { useContext } from "react";
import { CartContext } from "./shopping-cart-context";
import CartItemCard from "./CartItemCard";


export default function CartList() {
  const { items } = useContext(CartContext);

  return (
    <>
        <div className="flex flex-col gap-16 text-center mb-4">
          <h1 className="font-semibold text-3xl mt-2 ">Shopping Cart</h1>
          {items.map((i) => (
            <CartItemCard key={i.id} item={i} />
          ))}
        </div>
    </>
  );
}
