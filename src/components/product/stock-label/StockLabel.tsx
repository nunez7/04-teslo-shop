'use client';

import { getStockBySlug } from '@/actions';
import { titleFont } from '@/config/fonts';
import React, { useEffect, useState } from 'react';

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {
    const [stock, setStock] = useState(0);

    useEffect(() => {
        getStock();
    }, []);

    const getStock = async() =>{
        const inStock = await getStockBySlug(slug);
        console.log('Stock', inStock);
        setStock(inStock);
    }

    return (
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>Stock: {stock}</h1>
    )
}
