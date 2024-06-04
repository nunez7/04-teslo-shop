import { getPaginatedProductsWithImages } from "@/actions";
import { Title, ProductGrid } from "@/components";
//import { initialData } from "@/seed/seed";

//const products = initialData.products;


export default async function Home() {

  const { products } = await getPaginatedProductsWithImages();

  console.log(products);
  return (
    <>
      <Title title="Tienda" subTitle="Todos los productos" className="mb-2" />

      <ProductGrid
        products={products}
      />
    </>
  );
}
