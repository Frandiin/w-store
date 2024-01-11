import { computeProductTotalPrice } from "@/src/helpers/products";
import { prismaClient } from "../../lib/prisma";
import ProductImagem from "./components/product-imagens";
import ProductInfo from "./components/product-info";
import ProductList from "../../components/ui/product-list";
import SectionTitle from "../../components/ui/section-title";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsPageProps) => {
  const products = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: {
        include: {
          product: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!products) return null;
  return (
    <div className="flex flex-col gap-8 pb-8">
      <ProductImagem imageUrls={products.imageUrls} name={products.name} />
      <ProductInfo product={computeProductTotalPrice(products)} />
      <div>
        <SectionTitle>Produtos Recomendados</SectionTitle>
        <ProductList products={products.category.product} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
