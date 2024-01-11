import { CartContext, CartProduct } from "@/src/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CardItemProps {
  product: CartProduct;
}

const CardItem = ({ product }: CardItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseProductQuantityClick = () => {
    decreaseProductQuantity(product.id);
  };

  const handleIncreaseProductQuantityClick = () => {
    increaseProductQuantity(product.id);
  };

  const handleRemoveProductQuantity = () => {
    removeProductFromCart(product.id);
  };
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-4">
        <div className="flex h-[77px] w-[77px] items-center justify-center  rounded-lg bg-accent">
          <Image
            src={product.imageUrls?.[0]}
            width={0}
            height={0}
            sizes="100vw"
            alt={product.name}
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-xs">{product.name}</p>

          <div className="flex items-center gap-4">
            <p className="text-sm font-bold">
              R${Number(product.totalPrice.toFixed(2))}
            </p>
            {product.discountPercent > 0 && (
              <p className=" text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              size={"icon"}
              variant="outline"
              onClick={handleDecreaseProductQuantityClick}
            >
              <ArrowLeftIcon size={14} />
            </Button>
            <span className="text-xs">{product.quantity}</span>
            <Button
              size={"icon"}
              variant="outline"
              onClick={handleIncreaseProductQuantityClick}
            >
              <ArrowRightIcon size={14} />
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={handleRemoveProductQuantity}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CardItem;
