export const revalidate = 604800; //7 días

import { getProductBySlug } from "@/actions";
import { ProducMobiletSlideShow, ProductSlideShow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  }
}


export default async function ProductPage({ params }: Props) {

  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      {/*Slideshow */}
      <div className="col-span-1 md:col-span-2">

        {/*Desckop Slideshow */}
        <ProductSlideShow images={product.images} title={product.title}
          className="hidden md:block"
        />

        {/*Mobil Slideshow */}
        <ProducMobiletSlideShow images={product.images} title={product.title}
          className="block md:hidden"
        />
      </div>

      {/*Detalles */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
        <p className="text-lg mb-5">${product.price.toFixed(2)}</p>

        {/*Selector de tallas */}
        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />

        {/*Selector de cantidad */}
        <QuantitySelector quantity={2} />

        {/*Boton */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/*Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
        <p></p>
      </div>
    </div>
  );
}