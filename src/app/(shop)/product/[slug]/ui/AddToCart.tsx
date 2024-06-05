'use client';

import { QuantitySelector, SizeSelector } from '@/components';
import { useCartStore } from '@/store';
import type { CartProduct, Product, Size } from '@/interfaces';
import React, { useState } from 'react';

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {
    //Función para agregar al store
    const addProductToCart = useCartStore(state => state.addProductTocart);

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    //se usa para mostrar u ocultar mensaje a usuario
    const [posted, setPosted] = useState(false);

    const addTocart = () => {
        setPosted(true);
        if (!size) return;
        console.log(size, quantity);
        //TODO addToCart, creamos el objeto a como lo nececitamos para agregar al store
        const cartProduct : CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0]
        }
        //Agregamos el productCart al storage
        addProductToCart(cartProduct);
        //Reseteamos los valores del cart
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
    }

    return (
        <>
            {
                posted && !size &&(
                    <span className='mt-2 text-red-500 fade-in'>Debe seleccionar una talla *</span>
                )
            }

            {/*Selector de tallas */}
            <SizeSelector selectedSize={size} availableSizes={product.sizes} onSizeChanged={setSize} />

            {/*Selector de cantidad */}
            <QuantitySelector quantity={quantity}
                onQuantityChanged={setQuantity}
            />

            {/*Boton */}
            <button className="btn-primary my-5" onClick={addTocart}>Agregar al carrito</button>
        </>
    )
}
