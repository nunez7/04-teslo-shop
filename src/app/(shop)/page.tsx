export const revalidate = 60;
import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";
import { Title, ProductGrid, Pagination } from "@/components";
import { Product } from "@/interfaces";

interface Props{
  searchParams: {
    page?: string;
  }
}


export default async function Home({searchParams}: Props) {

  const page = searchParams.page ? parseInt(searchParams.page ) : 1;

  const { products, totalPages, currentPage } = await getPaginatedProductsWithImages({page});

  if(products.length === 0){
    redirect("/");
  }

  return (
    <>
      <Title title="Tienda" subTitle="Todos los productos" className="mb-2" />

      <ProductGrid
        products={products as Product[]}
      />

      <Pagination totalPages={totalPages} />
    </>
  );
}
