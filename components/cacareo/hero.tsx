"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Promotion {
  id: string
  title: string
  subtitle: string
  price: string
  description: string
  badge?: string
  imageUrl?: string
}

interface HeroProps {
  promotions?: Promotion[]
  autoPlayInterval?: number
}

const defaultPromotions: Promotion[] = [
  {
    id: "1",
    title: "COMBO FAMILIAR",
    subtitle: "Ahorra más",
    price: "$29.900",
    description: "8 presas de pollo, 2 porciones de arroz, 4 arepas, 1 ensalada grande y 1 gaseosa 1.5L",
    badge: "PROMOCIÓN",
  },
  {
    id: "2",
    title: "COMBO PERSONAL",
    subtitle: "El favorito",
    price: "$17.900",
    description: "2 presas de pollo, 1 porción de arroz, 2 arepas y 1 gaseosa 400ml",
    badge: "MÁS VENDIDO",
  },
  {
    id: "3",
    title: "COMBO FILETE",
    subtitle: "Premium",
    price: "$24.900",
    description: "1 filete de pechuga, 1 ensalada, 1 porción de arroz, 3 arepas y 1 gaseosa 400ml",
    badge: "NUEVO",
  },
]

export function Hero({ promotions = defaultPromotions, autoPlayInterval = 5000 }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length)
    }, autoPlayInterval)
    return () => clearInterval(timer)
  }, [promotions.length, autoPlayInterval])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promotions.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promotions.length) % promotions.length)
  }

  const currentPromo = promotions[currentSlide]

  return (
    <section className="relative min-h-[600px] overflow-hidden bg-gradient-to-br from-primary via-primary to-accent/30 md:min-h-[700px]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-secondary/50 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-accent/50 blur-3xl" />
      </div>

      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 py-12 md:flex-row md:py-20">
        {/* Content Side */}
        <div className="z-10 flex-1 text-center md:text-left">
          {currentPromo.badge && (
            <span className="mb-4 inline-block rounded-full bg-secondary px-4 py-1 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
              {currentPromo.badge}
            </span>
          )}
          
          <h2 className="mb-2 text-lg font-semibold text-foreground/80 md:text-xl">
            {currentPromo.subtitle}
          </h2>
          
          <h1 className="mb-4 text-balance text-4xl font-black uppercase leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {currentPromo.title}
          </h1>
          
          <div className="mb-4 text-5xl font-black text-secondary md:text-6xl lg:text-7xl">
            {currentPromo.price}
          </div>
          
          <p className="mb-8 max-w-md text-pretty text-sm text-foreground/70 md:text-base">
            {currentPromo.description}
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Pedir ahora
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-foreground/30 bg-transparent text-foreground hover:bg-foreground/10">
              Ver menú completo
            </Button>
          </div>
        </div>

        {/* Visual Side - Placeholder for food image */}
        <div className="relative mt-8 flex flex-1 items-center justify-center md:mt-0">
          <div className="relative">
            {/* Decorative circles */}
            <div className="absolute -inset-8 rounded-full bg-accent/20 blur-2xl" />
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-accent/30 md:h-80 md:w-80 lg:h-96 lg:w-96">
              <div className="flex h-48 w-48 items-center justify-center rounded-full bg-secondary/20 md:h-60 md:w-60 lg:h-72 lg:w-72">
                <span className="text-6xl">🍗</span>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -right-4 top-8 rounded-xl bg-card p-3 shadow-xl">
              <span className="text-2xl">🍚</span>
            </div>
            <div className="absolute -left-4 bottom-8 rounded-xl bg-card p-3 shadow-xl">
              <span className="text-2xl">🥗</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="h-10 w-10 rounded-full bg-card/80 text-foreground backdrop-blur-sm hover:bg-card"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex gap-2">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-secondary" : "w-2 bg-foreground/30"
              }`}
            />
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="h-10 w-10 rounded-full bg-card/80 text-foreground backdrop-blur-sm hover:bg-card"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}
