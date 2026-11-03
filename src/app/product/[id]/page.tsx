import { PRODUCTS } from "@/data/mockProducts";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
