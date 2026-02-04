"use client"

import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, QrCode, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"
import { Separator } from "@/components/ui/separator"

function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function CartSidebar() {
  const {
    items,
    isCartOpen,
    setCartOpen,
    removeItem,
    updateQuantity,
    subtotal,
    totalItems,
    setOrderMode,
    setCurrentStep,
  } = useCart()

  const handleDeliveryOrder = () => {
    setOrderMode("delivery")
    setCurrentStep("checkout")
    setCartOpen(false)
  }

  const handleTableOrder = () => {
    setOrderMode("table")
    setCurrentStep("qr_scan")
    setCartOpen(false)
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold">
            <ShoppingBag className="h-5 w-5 text-secondary" />
            Tu Pedido
            {totalItems > 0 && (
              <span className="rounded-full bg-secondary px-2 py-0.5 text-sm text-secondary-foreground">
                {totalItems}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground/30" />
              <p className="mb-2 text-lg font-medium text-muted-foreground">
                Tu carrito esta vacio
              </p>
              <p className="text-sm text-muted-foreground/70">
                Agrega productos del menu para comenzar tu pedido
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl bg-muted/50 p-4"
                >
                  {/* Product Image Placeholder */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/20">
                    <span className="text-3xl">🍗</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-foreground">
                        {item.name}
                      </h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-sm font-bold text-secondary">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with totals and actions */}
        {items.length > 0 && (
          <SheetFooter className="flex-col border-t pt-4">
            {/* Subtotal */}
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-secondary">{formatPrice(subtotal)}</span>
              </div>
            </div>

            {/* Order Type Selection */}
            <div className="space-y-3">
              <p className="text-center text-sm font-medium text-muted-foreground">
                Selecciona como quieres recibir tu pedido
              </p>
              
              <Button
                className="w-full gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                size="lg"
                onClick={handleDeliveryOrder}
              >
                <Truck className="h-5 w-5" />
                Pedir a Domicilio
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                className="w-full gap-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                size="lg"
                onClick={handleTableOrder}
              >
                <QrCode className="h-5 w-5" />
                Pedir en Mesa (QR)
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
