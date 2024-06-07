'use client';

import { PayPalButtons } from '@paypal/react-paypal-js';
import React from 'react';

interface Props {
    orderId: string;
    amount: number;
  }

  export const PayPalButton = ({ orderId, amount }: Props) => {
  return (
    <PayPalButtons />
  )
}
