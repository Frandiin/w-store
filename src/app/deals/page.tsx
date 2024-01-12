import { Product } from "@prisma/client";

import { prismaClient } from "../lib/prisma";
import ProductItem from "../components/ui/product-item";
import { computeProductTotalPrice } from "@/src/helpers/products";
import { Badge } from "../components/ui/badge";
import { PercentIcon } from "lucide-react";

const Deals = async () => {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercent: {
        gt: 0,
      },
    },
  });
  return (
    <>
    <div className="flex flex-col gap-4 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <PercentIcon size={16} />
        Ofertas
      </Badge>

      <div className="flex flex-col gap-4  2xl:grid 2xl:grid-cols-8">
        {deals.map((products) => (
          <ProductItem
            key={products.id}
            product={computeProductTotalPrice(products)}
          />
        ))}
      </div>
    </div>
    </>
    
  );
};

export default Deals;
