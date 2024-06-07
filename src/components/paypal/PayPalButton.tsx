'use client';

import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { CreateOrderActions, CreateOrderData, OnApproveData, OnApproveActions } from '@paypal/paypal-js';
import { paypalCheckPayment, setTransactionId } from '@/actions';

interface Props {
    orderId: string;
    amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {

    const [{ isPending }] = usePayPalScriptReducer();

    const rountedAmount = (Math.round(amount * 100)) / 100; //123.23

    if (isPending) {
        return (
            <div className="animate-pulse mb-16">
                <div className="h-11 bg-gray-300 rounded" />
                <div className="h-11 bg-gray-300 rounded mt-2" />
            </div>
        )
    }

    //Registra la orden y el pago, regresa un transactionId
    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
        const transactionId = await actions.order.create({
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        value: `${rountedAmount}`,
                    }
                }
            ]
        });
        const { ok } = await setTransactionId(orderId, transactionId);
        if (!ok) {
            throw new Error('No se pudo actualizar la orden');
        }
        return transactionId;
    }

    //Para verificar la aprobacion, es doble check del transactionId
    const onApprove = async (data: OnApproveData, actions: OnApproveActions): Promise<void> => {
        const details = await actions.order?.capture();
        if (!details) return;

        //Verificamos el pago a partir del detalle que regresa paypal
        await paypalCheckPayment(details.id);
    }

    return (
        <div className="relative z-0">
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </div>
    )
}
