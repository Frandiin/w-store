"use client";

import { Button } from "@/src/app/components/ui/button";

import DiscountBadge from "@/src/app/components/ui/discount-badge";
import { ProductWithTotalPrice } from "@/src/helpers/products";
import { CartContext } from "@/src/providers/cart";

import {
  ArrowDown,
  ArrowLeftIcon,
  ArrowRightIcon,
  TruckIcon,
} from "lucide-react";
import { useContext, useState } from "react";

interface ProductInfoProps {
  product: ProductWithTotalPrice;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addProductToCart } = useContext(CartContext);
  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCartClick = () => {
    addProductToCart({ ...product, quantity });
  };

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{product.name}</h2>
      <div className="flex items-center gap-1">
        <h1 className="gap-2 text-2xl font-bold">
          R${product.totalPrice.toFixed(2)}
        </h1>
        {product.discountPercent > 0 && (
          <DiscountBadge>{product.discountPercent}</DiscountBadge>
        )}
      </div>
      {product.discountPercent > 0 && (
        <p className="flex  text-sm line-through opacity-75">
          <span className="no-underline ">De:</span> R$
          {Number(product.basePrice).toFixed(2)}
        </p>
      )}
      <div className="mt-4 flex items-center gap-2">
        <Button
          size={"icon"}
          variant="outline"
          onClick={() => handleDecreaseQuantityClick()}
        >
          <ArrowLeftIcon size={14} />
        </Button>
        <span> {quantity}</span>
        <Button
          size={"icon"}
          variant="outline"
          onClick={() => handleIncreaseQuantityClick()}
        >
          <ArrowRightIcon size={14} />
        </Button>
      </div>
      <div className="mt-8 flex flex-col gap-3">
        <h3 className="text-base font-bold">Descrição</h3>
        <p className="text-justify text-sm opacity-60">{product.description}</p>
      </div>

      <Button
        className="mt-8 font-bold uppercase"
        onClick={handleAddToCartClick}
      >
        Adiconar ao carrinho
      </Button>
      <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-3">
          <TruckIcon />
          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold"> WPacket</span>
            </p>
            <p className="text-primary">Envio para todo Brasil</p>
          </div>
        </div>
        <p className="font-bold">Frete grátis</p>
      </div>
    </div>
  );
};

export default ProductInfo;
