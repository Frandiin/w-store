import { useSession } from "next-auth/react";
import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "../lib/prisma";
import ProductList from "../components/ui/product-list";
import SectionTitle from "../components/ui/section-title";
import PromoBanner from "./components/promo-banner";
import Link from "next/link";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercent: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <div className="flex flex-col gap-8 py-8">
      <Link href={"/deals"}>
        <PromoBanner src="/banner-home-01.svg" alt={""} />
      </Link>

      <div className="mt-8 px-5">
        <Categories />
      </div>

      <div>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>
      <div>
        <PromoBanner src="/banner-home-02.svg" alt={""} />
      </div>
      <div>
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>
      <div>
        <PromoBanner src="/banner-home-03.svg" alt={""} />
      </div>
      <div>
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  );
}
