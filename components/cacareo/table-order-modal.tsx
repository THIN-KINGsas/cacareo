"use client"

import { useState, useEffect } from "react"
import {
  X,
  ArrowLeft,
  QrCode,
  CreditCard,
  Banknote,
  CheckCircle2,
  ChefHat,
  Utensils,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
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

export function TableOrderModal() {
  const {
    items,
    subtotal,
    currentStep,
    setCurrentStep,
    tableNumber,
    setTableNumber,
    paymentMethod,
    setPaymentMethod,
    resetOrder,
  } = useCart()

  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)

  // Simulated QR scan animation
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsScanning(false)
            // Simulate random table number
            const randomTable = Math.floor(Math.random() * 20) + 1
            setTableNumber(randomTable.toString())
            setCurrentStep("table_order")
            return 0
          }
          return prev + 10
        })
      }, 150)
      return () => clearInterval(interval)
    }
  }, [isScanning, setTableNumber, setCurrentStep])

  if (
    currentStep !== "qr_scan" &&
    currentStep !== "table_order" &&
    currentStep !== "table_confirmation"
  ) {
    return null
  }

  const handleStartScan = () => {
    setIsScanning(true)
    setScanProgress(0)
  }

  const handleBack = () => {
    if (currentStep === "qr_scan") {
      setCurrentStep("browsing")
    } else if (currentStep === "table_order") {
      setCurrentStep("qr_scan")
    }
  }

  const handlePaymentSelect = (method: "transfer" | "cash_table") => {
    setPaymentMethod(method)
    setCurrentStep("table_confirmation")
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

        {/* Step: QR Scan */}
        {currentStep === "qr_scan" && (
          <div className="p-6 text-center">
            <button
              onClick={handleBack}
              className="absolute left-4 top-4 flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10">
                <QrCode className="h-10 w-10 text-secondary" />
              </div>
            </div>

            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Escanea el QR de tu Mesa
            </h2>
            <p className="mb-8 text-muted-foreground">
              Escanea el codigo QR ubicado en tu mesa para vincular tu pedido
            </p>

            {/* QR Scanner Simulation */}
            <div className="relative mx-auto mb-8 aspect-square max-w-xs overflow-hidden rounded-2xl border-4 border-secondary/30 bg-muted/50">
              {/* Scanner Frame */}
              <div className="absolute inset-4 border-2 border-dashed border-secondary/50 rounded-lg" />
              
              {/* Scanning Line Animation */}
              {isScanning && (
                <div
                  className="absolute left-4 right-4 h-1 bg-secondary shadow-[0_0_10px_rgba(var(--secondary),0.5)]"
                  style={{
                    top: `${16 + (scanProgress / 100) * 68}%`,
                    transition: "top 0.15s linear",
                  }}
                />
              )}

              {/* QR Code Placeholder */}
              <div className="flex h-full items-center justify-center">
                <div className="grid grid-cols-5 gap-1.5">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-4 w-4 rounded-sm ${
                        Math.random() > 0.4 ? "bg-foreground/80" : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Progress Indicator */}
              {isScanning && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="h-1 overflow-hidden rounded-full bg-secondary/20">
                    <div
                      className="h-full bg-secondary transition-all duration-150"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Escaneando... {scanProgress}%
                  </p>
                </div>
              )}
            </div>

            <Button
              className="w-full gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
              size="lg"
              onClick={handleStartScan}
              disabled={isScanning}
            >
              {isScanning ? (
                <>Escaneando...</>
              ) : (
                <>
                  <QrCode className="h-5 w-5" />
                  Simular Escaneo QR
                </>
              )}
            </Button>

            <p className="mt-4 text-xs text-muted-foreground">
              Esta es una simulacion. En produccion se usaria la camara del dispositivo.
            </p>
          </div>
        )}

        {/* Step: Table Order Payment Selection */}
        {currentStep === "table_order" && (
          <div className="p-6">
            <button
              onClick={handleBack}
              className="mb-4 flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </button>

            {/* Table Badge */}
            <div className="mb-6 flex items-center justify-center">
              <div className="flex items-center gap-3 rounded-full bg-secondary/10 px-6 py-3">
                <Utensils className="h-5 w-5 text-secondary" />
                <span className="text-lg font-bold text-secondary">
                  Mesa #{tableNumber}
                </span>
              </div>
            </div>

            <h2 className="mb-2 text-center text-2xl font-bold text-foreground">
              Confirma tu Pedido
            </h2>
            <p className="mb-6 text-center text-muted-foreground">
              Tu pedido sera enviado directamente a cocina
            </p>

            {/* Order Summary */}
            <div className="mb-6 rounded-xl bg-muted/50 p-4">
              <h3 className="mb-3 font-semibold text-foreground">Tu pedido:</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity}x {item.name}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-secondary">{formatPrice(subtotal)}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <h3 className="mb-4 font-semibold text-foreground">
              Selecciona metodo de pago:
            </h3>
            <div className="space-y-3">
              {/* Transfer Option */}
              <button
                onClick={() => handlePaymentSelect("transfer")}
                className="group flex w-full items-center gap-4 rounded-xl border-2 border-transparent bg-muted/50 p-4 text-left transition hover:border-secondary hover:bg-muted"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary transition group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    Transferencia Bancaria
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Paga desde tu celular
                  </p>
                </div>
              </button>

              {/* Cash Option */}
              <button
                onClick={() => handlePaymentSelect("cash_table")}
                className="group flex w-full items-center gap-4 rounded-xl border-2 border-transparent bg-muted/50 p-4 text-left transition hover:border-secondary hover:bg-muted"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary transition group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <Banknote className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Efectivo</h4>
                  <p className="text-sm text-muted-foreground">
                    Paga en caja del restaurante
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step: Table Confirmation */}
        {currentStep === "table_confirmation" && (
          <div className="p-6 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            </div>

            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Pedido Enviado a Cocina
            </h2>
            <p className="mb-6 text-muted-foreground">
              Tu pedido esta siendo preparado y sera llevado a tu mesa
            </p>

            {/* Table Info */}
            <div className="mb-6 flex justify-center">
              <div className="flex items-center gap-3 rounded-full bg-secondary/10 px-6 py-3">
                <Utensils className="h-5 w-5 text-secondary" />
                <span className="text-lg font-bold text-secondary">
                  Mesa #{tableNumber}
                </span>
              </div>
            </div>

            {/* Kitchen Status */}
            <div className="mb-6 rounded-xl bg-muted/50 p-4">
              <div className="mb-3 flex items-center justify-center gap-3">
                <ChefHat className="h-6 w-6 text-secondary" />
                <span className="font-semibold text-foreground">En preparacion</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Tiempo estimado: 15-20 minutos
              </p>
            </div>

            {/* Order Summary */}
            <div className="mb-6 rounded-xl bg-muted/50 p-4 text-left">
              <h3 className="mb-3 font-semibold text-foreground">Tu pedido:</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity}x {item.name}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-secondary">{formatPrice(subtotal)}</span>
              </div>
            </div>

            {/* Payment Method Info */}
            {paymentMethod === "cash_table" ? (
              <div className="mb-6 rounded-xl border-2 border-amber-400/50 bg-amber-50 p-4">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <span className="font-semibold text-amber-800">
                    Pago en Efectivo
                  </span>
                </div>
                <p className="text-sm text-amber-700">
                  Dirigete a caja para realizar el pago de{" "}
                  <span className="font-bold">{formatPrice(subtotal)}</span>
                </p>
              </div>
            ) : (
              <div className="mb-6 rounded-xl border-2 border-dashed border-secondary/30 bg-secondary/5 p-4">
                <p className="text-sm font-medium text-secondary">
                  Metodo de pago: Transferencia bancaria
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Te enviaremos los datos bancarios por WhatsApp
                </p>
              </div>
            )}

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
