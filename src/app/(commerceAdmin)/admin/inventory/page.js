import InventoryTable from "./components/InventoryTable";
import { getAdminProducts } from "@/services/product/productServices";
import AdminSearchBar from "./components/AdminSearchBar";
import AddProductButton from "./components/AddProductButton";
import InventoryStatusFilter from "./components/InventoryStatusFilter";
import InventoryStockFilter from "./components/InventoryStockFilter";

export default async function InventoryPage({ searchParams }) {

  const params = await searchParams;

  const PAGE_SIZE = 6;
  const page = Number(params.page ?? 1);

  const skip = (page - 1) * PAGE_SIZE;

  const status = params.status;
  const stockValue = params.stock 

  const { products, totalCount } = await getAdminProducts(
    skip,
    PAGE_SIZE,
    params.q,
    status,
    stockValue,
  );

  return (
    <>
      <div className="flex pt-4 flex-col">
        <div className="w-full max-w-6xl">
          <div className="flex ml-2 gap-3">
            <AdminSearchBar placeHolderMsg={"Search products..."} />
            <AddProductButton />
          </div>
        </div>
        <div className="flex gap-3">
       <InventoryStatusFilter/>
       <InventoryStockFilter/>
        </div>
        <InventoryTable
          products={products}
          totalCount={totalCount}
          PAGE_SIZE={PAGE_SIZE}
        />
      </div>
    </>
  );
}
