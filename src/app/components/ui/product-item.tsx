import { ProductWithTotalPrice } from "@/src/helpers/products";

import Image from "next/image";
import { Badge } from "./badge";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import DiscountBadge from "./discount-badge";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="mt-4 flex flex-col gap-4">
        <div className="relative flex  h-[170px] w-full items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-auto max-w-[80%]"
            style={{
              objectFit: "contain",
            }}
          />
          {product.discountPercent > 0 && (
            <DiscountBadge className="absolute left-3 top-3">
              {product.discountPercent}
            </DiscountBadge>
          )}
        </div>

        <div>
          <p className="max-w[156px] w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {product.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {product.discountPercent > 0 ? (
            <>
              <p className=" overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
                R${product.totalPrice.toFixed(2)}
              </p>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap  text-xs line-through opacity-75">
                R${Number(product.basePrice).toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-sm font-semibold">
              R${product.basePrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
