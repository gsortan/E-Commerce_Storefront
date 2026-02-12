import OrdersTable from "./components/OrdersTable";
import { getOrders } from "@/services/order/orderServices";
import AdminSearchBar from "../inventory/components/AdminSearchBar";

export default async function OrdersPage({ searchParams }) {

  const params = await searchParams;

  const PAGE_SIZE = 6;
  const page = Number(params.page ?? 1);

  const skipVal = (page - 1) * PAGE_SIZE;

  const { orders, totalCount } = await getOrders(
    skipVal,
    PAGE_SIZE,
    undefined,
    undefined,
    params.q
  );

  return (
    <>
      <div className="flex pt-4 flex-col">
        <div className="ml-2">
        <AdminSearchBar placeHolderMsg={"Search orders..."}/>
        </div>
        <OrdersTable
         orders={orders}
          totalCount={totalCount}
          PAGE_SIZE={PAGE_SIZE}
        />
      </div>
    </>
  );
}
