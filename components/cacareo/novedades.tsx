"use client"

import { ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Novedad {
  id: string
  title: string
  description: string
  date: string
  category: string
  imageUrl?: string
}

interface NovedadesProps {
  title?: string
  subtitle?: string
  novedades?: Novedad[]
}

const defaultNovedades: Novedad[] = [
  {
    id: "1",
    title: "Nuevo Combo Parrillero",
    description: "Descubre nuestra nueva línea de pollo a la parrilla con sabores únicos que te harán volver por más.",
    date: "2026-01-28",
    category: "Nuevo producto",
  },
  {
    id: "2",
    title: "Promoción de Aniversario",
    description: "Celebramos nuestro aniversario con ofertas especiales. 2x1 en combos seleccionados todo el mes.",
    date: "2026-01-25",
    category: "Promoción",
  },
  {
    id: "3",
    title: "Nuevo Restaurante en Bogotá",
    description: "Abrimos una nueva sede en el norte de Bogotá. Ven a conocernos y disfruta del sabor que te encanta.",
    date: "2026-01-20",
    category: "Apertura",
  },
]

export function Novedades({
  title = "Novedades",
  subtitle = "Mantente al día con nuestras últimas noticias y promociones",
  novedades = defaultNovedades,
}: NovedadesProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-CO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <section className="bg-background py-16 md:py-24" id="novedades">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="mb-2 text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          <Button variant="outline" className="gap-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent">
            Ver todas
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Novedades Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {novedades.map((novedad, index) => (
            <Card
              key={novedad.id}
              className={`group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Image Placeholder */}
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/30 to-accent/30">
                <div className="flex h-full items-center justify-center">
                  <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
                    {novedad.category === "Nuevo producto" ? "🍗" : novedad.category === "Promoción" ? "🎉" : "📍"}
                  </span>
                </div>
                <Badge className="absolute left-4 top-4 bg-secondary text-secondary-foreground">
                  {novedad.category}
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDate(novedad.date)}
                </div>
                
                <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-secondary">
                  {novedad.title}
                </h3>
                
                <p className="mb-4 line-clamp-2 text-muted-foreground">
                  {novedad.description}
                </p>
                
                <Button
                  variant="ghost"
                  className="gap-2 p-0 text-secondary hover:bg-transparent hover:text-secondary/80"
                >
                  Leer más
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
