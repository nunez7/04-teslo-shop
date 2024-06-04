import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";
import { Title, ProductGrid } from "@/components";

interface Props{
  searchParams: {
    page?: string;
  }
}


export default async function Home({searchParams}: Props) {

  const page = searchParams.page ? parseInt(searchParams.page ) : 1;

  const { products } = await getPaginatedProductsWithImages({page});

  if(products.length === 0){
    redirect("/");
  }

  return (
    <>
      <Title title="Tienda" subTitle="Todos los productos" className="mb-2" />

      <ProductGrid
        products={products}
      />
    </>
  );
}
