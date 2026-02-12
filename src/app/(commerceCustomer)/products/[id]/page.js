import {getShopProductById}from "@/services/product/productServices";
import ProductDetails from "../components/ProductDetails";

export default async function ProductPage({ params }) {
  const unwrappedParams = await params;
  const product = await getShopProductById(unwrappedParams.id);

  return <ProductDetails product={product} />;
}
