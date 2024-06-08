'use client';


import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/interfaces';
import { useState } from 'react';

interface Props {
  product: Product;
}


export const ProductGridItem = ( { product }: Props ) => {
  const imagenRecibida =  product.images[ 0 ]== undefined ? 'placeholder.jpg':  product.images[ 0 ];
  const imagenSrc = imagenRecibida.startsWith('https') ? imagenRecibida  : `/products/${ imagenRecibida }`;
  const [ displayImage, setDisplayImage ] = useState(imagenSrc);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={ `/product/${ product.slug }` }>
        <Image
          src={ displayImage }
          alt={ product.title }
          className="w-full object-cover rounded"
          width={ 500 }
          height={ 500 }
          onMouseEnter={ () => setDisplayImage( product.images[1] )  }
          onMouseLeave={ () => setDisplayImage( product.images[0] ) }
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          className="hover:text-blue-600"
          href={ `/product/${ product.slug }` }>
          { product.title }
        </Link>
        <span className="font-bold">${ product.price.toFixed(2) }</span>
      </div>

    </div>
  );
};