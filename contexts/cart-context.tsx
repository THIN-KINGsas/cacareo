"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  description?: string
}

export type OrderMode = "delivery" | "table" | null
export type PaymentMethod = "transfer" | "cash_delivery" | "cash_table" | null
export type OrderStep = 
  | "browsing" 
  | "cart" 
  | "checkout" 
  | "payment" 
  | "address" 
  | "confirmation"
  | "qr_scan"
  | "table_order"
  | "table_confirmation"

interface DeliveryAddress {
  fullName: string
  phone: string
  address: string
  city: string
  notes: string
}

interface CartContextType {
  // Cart State
  items: CartItem[]
  orderMode: OrderMode
  paymentMethod: PaymentMethod
  currentStep: OrderStep
  tableNumber: string | null
  deliveryAddress: DeliveryAddress | null
  
  // Cart Actions
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  
  // Order Flow Actions
  setOrderMode: (mode: OrderMode) => void
  setPaymentMethod: (method: PaymentMethod) => void
  setCurrentStep: (step: OrderStep) => void
  setTableNumber: (table: string) => void
  setDeliveryAddress: (address: DeliveryAddress) => void
  
  // Computed Values
  totalItems: number
  subtotal: number
  
  // Reset
  resetOrder: () => void
  
  // Cart visibility
  isCartOpen: boolean
  setCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [orderMode, setOrderMode] = useState<OrderMode>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
  const [currentStep, setCurrentStep] = useState<OrderStep>("browsing")
  const [tableNumber, setTableNumber] = useState<string | null>(null)
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress | null>(null)
  const [isCartOpen, setCartOpen] = useState(false)

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id)
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const resetOrder = useCallback(() => {
    setItems([])
    setOrderMode(null)
    setPaymentMethod(null)
    setCurrentStep("browsing")
    setTableNumber(null)
    setDeliveryAddress(null)
    setCartOpen(false)
  }, [])

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        orderMode,
        paymentMethod,
        currentStep,
        tableNumber,
        deliveryAddress,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        setOrderMode,
        setPaymentMethod,
        setCurrentStep,
        setTableNumber: (table: string) => setTableNumber(table),
        setDeliveryAddress,
        totalItems,
        subtotal,
        resetOrder,
        isCartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
