'use client';
import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ProductImage } from "@/components";

export const ProductsInCart = () => {

    
    const removeProducts = useCartStore(state => state.removeProduct);
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true);
    }, [])

    if (!loaded) {
        return <p>Cargando...</p>
    }

    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={product.slug + '-' + product.size} className="flex mb-5">
                        <ProductImage
                            src={product.image ?? 'placeholder.jpg'}
                            width={100}
                            height={100}
                            style={{
                                width: '100px',
                                height: '100px'
                            }}
                            alt={product.title}
                            className="mr-5 rounded"
                        />
                        <div>
                            <Link 
                            className='hover:underline cursor-pointer'
                            href={`/products/${product.slug}`}>
                                {product.title} 
                            </Link>
                            <p>Talla: {product.size}</p>
                            <p>${product.price.toFixed(2)}</p>
                            <QuantitySelector quantity={product.quantity}
                                onQuantityChanged={quantity => updateProductQuantity(product, quantity)}
                            />
                            <button 
                            onClick={() => removeProducts(product)}
                            className="underline mt-3">Remover</button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
