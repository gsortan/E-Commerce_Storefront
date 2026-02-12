import ProductCard from "./components/ProductCard";
import { getShopProducts } from "@/services/product/productServices";

export default async function ShopPage({ searchParams }) {
  const unwrappedParams = await searchParams;

  const data = await getShopProducts(
    undefined,
    undefined,
    unwrappedParams.q
  );

  const noProducts = data.products.length === 0;

  return (
    <div className="max-w-[70rem] mx-auto p-8">
      {noProducts ? (
        <div className="text-center py-20">
          <p className="text-xl font-semibold">No results found</p>

        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.products.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
