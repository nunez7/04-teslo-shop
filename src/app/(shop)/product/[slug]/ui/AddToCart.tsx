'use client';

import { QuantitySelector, SizeSelector } from '@/components';
import { Product, Size } from '@/interfaces';
import React, { useState } from 'react';

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false);

    const addTocart = () => {
        setPosted(true);
        if (!size) return;
        console.log(size, quantity);
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
