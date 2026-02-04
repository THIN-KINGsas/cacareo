"use client"

import { ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ComboItem {
  id: string
  name: string
  description: string
  price: string
  originalPrice?: string
  items: string[]
  badge?: string
  rating?: number
  isPopular?: boolean
}

interface CombosProps {
  title?: string
  subtitle?: string
  combos?: ComboItem[]
}

export function Combos({ 
  title = "Nuestros Combos", 
  subtitle = "Disfruta el pollo que más sabe con nuestras mejores ofertas",
  combos = [] 
}: CombosProps) {
  return (
    <section
      id="menu"
      className="relative py-24"
    >
      <div className="mx-auto max-w-7xl px-4">

        {/* 🔥 Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {/* 🧬 Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {combos.map((combo) => (
            <Card
              key={combo.id}
              className={`
                group relative overflow-hidden rounded-2xl border border-white/10
                bg-card/70 backdrop-blur-xl
                transition-all duration-500
                hover:-translate-y-3 hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]
                ${combo.isPopular ? "ring-2 ring-secondary/80" : ""}
              `}
            >
              {/* ✨ Glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent" />
              </div>

              {/* 🏷 Badge */}
              {combo.badge && (
                <Badge className="absolute left-4 top-4 z-10 bg-secondary text-secondary-foreground shadow-lg">
                  {combo.badge}
                </Badge>
              )}

              {/* 🍗 Imagen */}
              <div className="relative aspect-square overflow-hidden rounded-b-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent" />
                <div className="flex h-full items-center justify-center">
                  <span className="text-7xl transition-transform duration-500 group-hover:scale-125">
                    🍗
                  </span>
                </div>

                {/* Hover CTA */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl">
                    Ver detalles
                  </Button>
                </div>
              </div>

              {/* 📄 Contenido */}
              <CardContent className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">
                    {combo.name}
                  </h3>

                  {combo.rating && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      {combo.rating}
                    </div>
                  )}
                </div>

                <p className="mb-4 text-sm text-muted-foreground">
                  {combo.description}
                </p>

                <ul className="mb-4 space-y-1">
                  {combo.items.slice(0, 3).map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                      {item}
                    </li>
                  ))}
                  {combo.items.length > 3 && (
                    <li className="text-xs text-secondary">
                      +{combo.items.length - 3} más
                    </li>
                  )}
                </ul>

                {/* 💰 Precio */}
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-black text-secondary">
                    {combo.price}
                  </span>
                  {combo.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {combo.originalPrice}
                    </span>
                  )}
                </div>
              </CardContent>

              {/* 🛒 Acción */}
              <CardFooter className="p-5 pt-0">
                <Button className="w-full gap-2 bg-secondary text-secondary-foreground shadow-lg transition hover:scale-[1.02] hover:bg-secondary/90">
                  <ShoppingCart className="h-4 w-4" />
                  Agregar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* 👉 CTA final */}
        <div className="mt-20 text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-secondary-foreground transition"
          >
            Ver menú completo
          </Button>
        </div>
      </div>
    </section>
  )
}
