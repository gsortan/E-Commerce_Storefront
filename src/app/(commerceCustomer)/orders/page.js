import { getMyOrders } from "@/services/order/orderServices";
import OrderCard from "./components/OrderCard";
import PaginationRounded from "../../../components/shared/PaginationRounded";
import { currentUser } from "@clerk/nextjs/server";

export default async function OrderHistoryPage({ searchParams }) {
  const user = await currentUser();
  const params = await searchParams;

  const PAGE_SIZE = 4;
  const page = Number(params.page ?? 1);

  const skip = (page - 1) * PAGE_SIZE;

  const { orders, totalCount } = await getMyOrders(skip, PAGE_SIZE);

  return (
    <div className="flex flex-col max-w-6xl mx-auto items-center gap-4 mb-4">
      {orders.length === 0 ? (
        <p className=" text-lg mt-8">
          You don’t have any orders yet.
        </p>
      ) : (
        orders.map((o) => <OrderCard key={o.id} order={o} />)
      )}

      {totalCount > PAGE_SIZE && (
        <PaginationRounded totalCount={totalCount} PAGE_SIZE={PAGE_SIZE} />
      )}
    </div>
  );
}
