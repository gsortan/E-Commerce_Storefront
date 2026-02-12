import RevenueCard from "@/components/admin/RevenueCard";
import { currentUser } from "@clerk/nextjs/server";
import CustomerCard from "@/components/admin/CustomerCard";
import { getRevenueSeries } from "@/services/order/orderServices";
import RevenueChart from "@/components/admin/RevenueChart";

export default async function AdminPage() {
  const user = await currentUser();
 const last7 = await getRevenueSeries({ mode: "7d" });
  const monthly = await getRevenueSeries({ mode: "monthly" });

  return (
    <>
 <div className="items-center flex flex-col">

      <p className="text-4xl font-bold">Welcome {user.username}! </p>
      <p className="text-xl">Here's what is happening in your store:</p>
      <RevenueCard />
      <CustomerCard/>
     <RevenueChart last7={last7} monthly={monthly} />
      </div>
    </>
  );
}
