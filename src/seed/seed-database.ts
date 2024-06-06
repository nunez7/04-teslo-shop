import { initialData } from "./seed";
import prisma from '../lib/prisma';
import { countries } from './seed-countries';

async function main() {

    //Borrar registros previos
    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    //Insertar ciudades
    await prisma.country.createMany({data: countries});

    //Insertar categorias
    const { categories, products, users } = initialData;

    //Usuarios
    await prisma.user.createMany({
        data: users
    });

    const categoriesData = categories.map((name) => ({ name }));

    await prisma.category.createMany({
        data: categoriesData
    });

    //Buscamos las categorias
    const categoriesDB = await prisma.category.findMany();

    //Sacamos el id de las categorias, buscando por id y mapeando a mayuscula
    //reduce permite lo de un foreach pero almacena los cambios
    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>);//<string=shirt, string=categoryID>

    /*Data mapeada en categoriesMap:
        {
        shirts: 'bac9412c-1ccf-4b1a-9fe9-4f68a4e9a538',
        pants: '43a6d750-09c7-426d-85e4-f625db3684d2',
        hoodies: '9307fc37-e0a8-451c-ad09-99f3c95a49a3',
        hats: '797ce91b-e7ce-4cd0-b077-1e9a915b0100'
        }
     */
    //Insertamos los productos
    products.forEach(async (product) => {
        //Se destructurab las imagenes, el type, ya que se tienen por separado las relaciones en tablas
        const { type, images, ...rest } = product;

        //Se inserta el producto
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })
        // Traemos las Images
        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }));
        //Insertamos las images
        await prisma.productImage.createMany({
            data: imagesData
        });
    });
    console.log('Seed executed');
}


(() => {

    if (process.env.NODE_ENV === 'production') return;

    main();
})();