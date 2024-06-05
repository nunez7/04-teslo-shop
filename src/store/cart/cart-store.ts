import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
    cart: CartProduct[];

    getTotalItems: () => number;

    addProductTocart: (product: CartProduct) => void;

    updateProductQuantity:  (product: CartProduct, quantity: number) => void;

    removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(

    persist(
        (set, get) => ({
            cart: [],

            //Methods
            removeProduct: (product: CartProduct) =>{
                const {cart} = get();
                //Traemos los productos que no coincidad con el id y la talla
                const updatedCartProducts = cart.filter(
                    (item) => item.id !== product.id || item.size !== product.size
                );
                set({ cart: updatedCartProducts });
            },
            updateProductQuantity: (product: CartProduct, quantity: number) =>{
                const {cart} = get();

                //Se que el producto existe por talla, debo incrementar la cantidad
                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: quantity}
                    }
                    return item;
                });

                set({ cart: updatedCartProducts });

            },
            getTotalItems: () =>{
                const {cart} = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },
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
            name: 'shopping-cart',
        }
    )

)