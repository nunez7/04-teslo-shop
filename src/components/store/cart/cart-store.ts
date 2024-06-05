import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
    cart: CartProduct[];

    addProductTocart: (product: CartProduct) => void;

    //updateProductQuantity

    //removeProduct
}

export const useCartStore = create<State>()(

    persist(
        (set, get) => ({
            cart: [],

            //Methods
            addProductTocart: (product: CartProduct) => {
                const { cart } = get();

                //Revisamos si el product existe en el carrito en esa talla
                const propductInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );

                if (!propductInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                //Se que el producto existe por talla, debo incrementar la cantidad
                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }

                    return item;
                });

                set({ cart: updatedCartProducts });
            }
        }),
        {
            name: 'shopping-cart'
        }
    )

)