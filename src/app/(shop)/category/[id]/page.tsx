import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props{
  params: {
    id: Category;
  }
}
const seedProducts = initialData.products;


export default function CategoryPage({params}: Props) {

  const {id} = params;

  if(id !== "kid" &&  id !=="men" && id !=="women"){
    notFound();
  }

  const products = seedProducts.filter((product) =>{
    return product.gender === id;
  });

  const labels: Record<Category, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos'
  }

  return (
    <>
      <Title title={`Articulos de ${labels[id]}`} subTitle={`Productos ${labels[id]}`} className="mb-2"/>

      <ProductGrid 
        products={ products }
      />
    </>
  );
}