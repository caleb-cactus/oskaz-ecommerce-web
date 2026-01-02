// components/Cart-Summary.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface CartSummaryProps {
  onCheckout?: () => void;
  currency: string;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { state } = useCart();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  //const currency = state.items.length > 0 ? state.items[0].currency : 'ETB';

  return (
    <Card
      className={cn(
        "sticky top-24 bg-white border-gray-200 dark:bg-card dark:border-border"
      )}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Subtotal ({state.totalItems} items)
          </span>
          {/* <span className="font-medium">{formatPrice(state.totalPrice)}</span> */}
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>Calculated at checkout</span>
        </div>

        <Separator />

        <div className="flex justify-between font-medium">
          <span>Total</span>
          {/* <span className="text-lg">{formatPrice(state.totalPrice)}</span> */}
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={onCheckout}
          disabled={state.items.length === 0}
        >
          Proceed to Checkout
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => (window.location.href = "/products")}
        >
          Continue Shopping
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
