"use client"

import { useState } from "react"
import { 
  X, 
  ArrowLeft, 
  CreditCard, 
  Banknote, 
  MapPin, 
  CheckCircle2,
  Truck,
  Package
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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

export function CheckoutModal() {
  const {
    items,
    subtotal,
    currentStep,
    setCurrentStep,
    paymentMethod,
    setPaymentMethod,
    setDeliveryAddress,
    resetOrder,
  } = useCart()

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  if (currentStep !== "checkout" && currentStep !== "payment" && currentStep !== "address" && currentStep !== "confirmation") {
    return null
  }

  const handleBack = () => {
    if (currentStep === "checkout") {
      setCurrentStep("browsing")
    } else if (currentStep === "payment") {
      setCurrentStep("checkout")
    } else if (currentStep === "address") {
      setCurrentStep("payment")
    }
  }

  const handlePaymentSelect = (method: "transfer" | "cash_delivery") => {
    setPaymentMethod(method)
    setCurrentStep("address")
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.fullName.trim()) newErrors.fullName = "Nombre requerido"
    if (!formData.phone.trim()) newErrors.phone = "Telefono requerido"
    if (!formData.address.trim()) newErrors.address = "Direccion requerida"
    if (!formData.city.trim()) newErrors.city = "Ciudad requerida"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitAddress = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setDeliveryAddress(formData)
      setCurrentStep("confirmation")
    }
  }

  const handleNewOrder = () => {
    resetOrder()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-background shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => setCurrentStep("browsing")}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Step: Checkout Summary */}
        {currentStep === "checkout" && (
          <div className="p-6">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Resumen del Pedido
            </h2>

            {/* Order Items */}
            <div className="mb-6 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-xl">
                      🍗
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-secondary">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Totals */}
            <div className="mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envio</span>
                <span className="text-green-600">Gratis</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total a pagar</span>
                <span className="text-secondary">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <Button
              className="w-full gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
              size="lg"
              onClick={() => setCurrentStep("payment")}
            >
              Continuar al Pago
              <CreditCard className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Step: Payment Selection */}
        {currentStep === "payment" && (
          <div className="p-6">
            <button
              onClick={handleBack}
              className="mb-4 flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </button>

            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Metodo de Pago
            </h2>
            <p className="mb-6 text-muted-foreground">
              Selecciona como deseas pagar tu pedido
            </p>

            <div className="space-y-4">
              {/* Transfer Option */}
              <button
                onClick={() => handlePaymentSelect("transfer")}
                className="group flex w-full items-center gap-4 rounded-xl border-2 border-transparent bg-muted/50 p-5 text-left transition hover:border-secondary hover:bg-muted"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-secondary transition group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Transferencia Bancaria
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Paga antes de recibir tu pedido
                  </p>
                </div>
              </button>

              {/* Cash on Delivery Option */}
              <button
                onClick={() => handlePaymentSelect("cash_delivery")}
                className="group flex w-full items-center gap-4 rounded-xl border-2 border-transparent bg-muted/50 p-5 text-left transition hover:border-secondary hover:bg-muted"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-secondary transition group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <Banknote className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Contra Entrega
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Paga cuando recibas tu pedido
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step: Address Form */}
        {currentStep === "address" && (
          <div className="p-6">
            <button
              onClick={handleBack}
              className="mb-4 flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </button>

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                <MapPin className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Datos de Envio
                </h2>
                <p className="text-sm text-muted-foreground">
                  Pago: {paymentMethod === "transfer" ? "Transferencia" : "Contra entrega"}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitAddress} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre completo</Label>
                <Input
                  id="fullName"
                  placeholder="Juan Perez"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className={errors.fullName ? "border-destructive" : ""}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefono</Label>
                <Input
                  id="phone"
                  placeholder="300 123 4567"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  placeholder="Bogota"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className={errors.city ? "border-destructive" : ""}
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Direccion completa</Label>
                <Input
                  id="address"
                  placeholder="Calle 123 #45-67, Apto 101"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className={errors.address ? "border-destructive" : ""}
                />
                {errors.address && (
                  <p className="text-sm text-destructive">{errors.address}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Instrucciones especiales para la entrega..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                className="w-full gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                size="lg"
              >
                Confirmar Pedido
                <CheckCircle2 className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}

        {/* Step: Confirmation */}
        {currentStep === "confirmation" && (
          <div className="p-6 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            </div>

            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Pedido Confirmado
            </h2>
            <p className="mb-6 text-muted-foreground">
              Tu pedido ha sido recibido y sera enviado a la direccion indicada
            </p>

            <div className="mb-6 rounded-xl bg-muted/50 p-4 text-left">
              <div className="mb-4 flex items-center gap-3">
                <Truck className="h-5 w-5 text-secondary" />
                <span className="font-medium">Informacion de envio</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Tu pedido sera entregado en aproximadamente 30-45 minutos
              </p>
            </div>

            <div className="mb-6 rounded-xl bg-muted/50 p-4 text-left">
              <div className="mb-4 flex items-center gap-3">
                <Package className="h-5 w-5 text-secondary" />
                <span className="font-medium">Resumen del pedido</span>
              </div>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity}x {item.name}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-secondary">{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-xl border-2 border-dashed border-secondary/30 bg-secondary/5 p-4">
              <p className="text-sm font-medium text-secondary">
                Metodo de pago: {paymentMethod === "transfer" ? "Transferencia bancaria" : "Contra entrega"}
              </p>
              {paymentMethod === "transfer" && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Te enviaremos los datos bancarios por WhatsApp
                </p>
              )}
            </div>

            <Button
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
              size="lg"
              onClick={handleNewOrder}
            >
              Hacer otro pedido
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
