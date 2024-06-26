export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import {  getPaginatedUsers } from "@/actions";
import { Pagination, Title } from "@/components";
import { UsersTable } from "./ui/UsersTable";

export default async function OrdersPage() {

  const { ok, users = [] } = await getPaginatedUsers();

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={ users } />

        <Pagination totalPages={ 1 } />
      </div>
    </>
  );
}