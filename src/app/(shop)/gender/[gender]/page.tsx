export const revalidate = 60;
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Product } from "@/interfaces";
import { notFound, redirect } from "next/navigation";

interface Props{
  params: {
    gender: string;
  },
  searchParams: {
    page?: string;
  }
}


export default async function CategoryPage({params, searchParams}: Props) {

  const {gender} = params;

  if(gender !== "kid" &&  gender !=="men" && gender !=="women"){
    notFound();
  }

  const page = searchParams.page ? parseInt(searchParams.page ) : 1;

  const { products, totalPages, currentPage } = await getPaginatedProductsWithImages({page, gender});

  if(products.length === 0){
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos'
  }

  return (
    <>
      <Title title={`Articulos de ${labels[gender]}`} subTitle={`Productos ${labels[gender]}`} className="mb-2"/>

      <ProductGrid 
        products={ products as Product[] }
      />

     <Pagination totalPages={totalPages} />
    </>
  );
}