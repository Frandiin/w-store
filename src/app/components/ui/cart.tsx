import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/src/providers/cart";
import CardItem from "./card-item";
import { computeProductTotalPrice } from "@/src/helpers/products";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/src/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const { products, totalDiscount, total, subtotal } = useContext(CartContext);
  const handleFinishPurchaseClick = async () => {
    const checkout = await createCheckout(products);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };
  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-8">
            {products.length > 0 ? (
              products.map((products) => (
                <CardItem
                  key={products.id}
                  product={computeProductTotalPrice(products as any) as any}
                />
              ))
            ) : (
              <p>Nenhum produto adiconado ao carrinho</p>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="flex flex-col gap-3">
        {products.length > 0 ? (
          <>
            <Separator />

            <div className="flex items-center justify-between text-sm">
              <p>Subtotal</p>
              <p>R${subtotal.toFixed(2)}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-sm">
              <p>Entrega</p>
              <p>Grátis</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-sm">
              <p>Desconto</p>
              <p>- R${totalDiscount.toFixed(2)}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-sm font-bold">
              <p>Total</p>
              <p>R${total.toFixed(2)}</p>
            </div>
          </>
        ) : (
          <p></p>
        )}
      </div>
      <Button
        className="mt-7 font-bold uppercase"
        onClick={handleFinishPurchaseClick}
      >
        Finalizar Compra
      </Button>
    </div>
  );
};

export default Cart;
