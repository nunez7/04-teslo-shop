import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';


export default function CheckoutAddressPage() {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        
        <Title title="Dirección" subTitle="Dirección de entrega" />

        <AddressForm />

      </div>
    </div>
  );
}