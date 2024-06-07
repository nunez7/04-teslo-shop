'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";
import { useCartStore } from "@/store";
import { redirect } from "next/navigation";


export default function CheckoutPage() {
  const productsInCart = useCartStore(state => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [])

  if (loaded) {
    if (productsInCart.length == 0) redirect('/');

    return (
      <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

        <div className="flex flex-col w-[1000px]">
          <Title title="Verificación de orden" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/*Carrito */}
            <div className="flex flex-col mt-5">
              <span className="text-xl">Ajustar orden</span>
              <Link href="/cart" className="underline mb-5">Modificar carrito</Link>

              {/*Items */}
              <ProductsInCart />
            </div>

            {/*Checkout - resumen de la orden */}
            <PlaceOrder />
          </div>
        </div>

      </div>
    );
  }
}