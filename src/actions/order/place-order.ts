"use server";
import prisma from "@/lib/prisma";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {

    const session = await auth();
    const userId = session?.user.id;

    // Verificar sesión de usuario para no continuar, en caso de que no haya
    if (!userId) {
        return {
            ok: false,
            message: "No hay sesión de usuario",
        };
    }

    // Obtener la información de los productos
    // Nota: recuerden que podemos llevar 2+ productos con el mismo ID
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map((p) => p.productId),
            },
        },
    });

    // Calcular los montos // Encabezado
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

    // Los totales de tax, subtotal, y total
    const { subTotal, tax, total } = productIds.reduce(
        (totals, item) => {
            const productQuantity = item.quantity;
            const product = products.find((product) => product.id === item.productId);

            //Verificar la existencia del producto
            if (!product) throw new Error(`${item.productId} no existe - 500`);

            const subTotal = product.price * productQuantity;
            //Agregamos a totals el valor unitario de cada cosa
            totals.subTotal += subTotal;
            totals.tax += subTotal * 0.16;
            totals.total += subTotal * 1.16;

            return totals;
        },
        { subTotal: 0, tax: 0, total: 0 }
    );

    // Crear la transacción de base de datos
    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            // 1. Actualizar el stock de los productos


            // 2. Crear la orden y detalles (Order, OrderItem)
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,
                    OrderItem: {
                        createMany: {
                            data: productIds.map((p) => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price:
                                    products.find((product) => product.id === p.productId)
                                        ?.price ?? 0,
                            })),
                        },
                    },
                },
            });

            // Validar, si el price es cero, entonces, lanzar un error
            if(order.total <=0 )throw new Error('El precio no debe ser 0');

            // 3. Crear la direccion de la orden

            return {
                updatedProducts: [],
                order: order,
                orderAddress: {},
              };
        });
        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx,
        }
    } catch (error: any) {
        return {
            ok: false,
            message: error?.message,
        };
    }
}