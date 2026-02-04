"use client"

import { useState } from "react"
import { MapPin, Search, Clock, Phone, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface Restaurant {
  id: string
  name: string
  address: string
  phone: string
  hours: string
  distance?: string
}

interface RestaurantFinderProps {
  title?: string
  subtitle?: string
  restaurants?: Restaurant[]
}

const defaultRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "El Cacareo Centro",
    address: "Calle 10 #5-23, Centro Histórico",
    phone: "601 234 5678",
    hours: "10:00 AM - 10:00 PM",
    distance: "0.5 km",
  },
  {
    id: "2",
    name: "El Cacareo Norte",
    address: "Av. Principal #45-12, Zona Norte",
    phone: "601 345 6789",
    hours: "10:00 AM - 11:00 PM",
    distance: "2.3 km",
  },
  {
    id: "3",
    name: "El Cacareo Sur",
    address: "Carrera 7 #89-45, Zona Sur",
    phone: "601 456 7890",
    hours: "10:00 AM - 10:00 PM",
    distance: "4.1 km",
  },
]

export function RestaurantFinder({
  title = "Encuentra tu restaurante",
  subtitle = "Ingresa tu ubicación para encontrar el restaurante más cercano",
  restaurants = defaultRestaurants,
}: RestaurantFinderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null)

  const filteredRestaurants = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section className="relative bg-muted py-16 md:py-24" id="restaurantes">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Search and List */}
          <div>
            {/* Search Bar */}
            <div className="mb-6 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por ciudad o dirección..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 pl-10"
                />
              </div>
              <Button className="h-12 gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Mi ubicación</span>
              </Button>
            </div>

            {/* Restaurant List */}
            <div className="space-y-4">
              {filteredRestaurants.map((restaurant) => (
                <Card
                  key={restaurant.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedRestaurant === restaurant.id
                      ? "ring-2 ring-secondary"
                      : ""
                  }`}
                  onClick={() => setSelectedRestaurant(restaurant.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <h3 className="font-bold text-foreground">{restaurant.name}</h3>
                          {restaurant.distance && (
                            <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-semibold text-secondary">
                              {restaurant.distance}
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{restaurant.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{restaurant.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{restaurant.hours}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        className="shrink-0 gap-1 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                      >
                        <Navigation className="h-4 w-4" />
                        Ir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredRestaurants.length === 0 && (
                <div className="py-12 text-center">
                  <MapPin className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No se encontraron restaurantes</p>
                </div>
              )}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative min-h-[400px] overflow-hidden rounded-2xl bg-card shadow-lg lg:min-h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50">
              {/* Map placeholder with grid pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              {/* Center marker */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary shadow-lg">
                    <MapPin className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <div className="mt-4 rounded-lg bg-card px-4 py-2 shadow-lg">
                    <p className="text-sm font-bold text-foreground">El Cacareo</p>
                    <p className="text-xs text-muted-foreground">3 restaurantes cerca</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative markers */}
              <div className="absolute left-1/4 top-1/3">
                <div className="h-4 w-4 rounded-full bg-secondary/50" />
              </div>
              <div className="absolute right-1/3 top-2/3">
                <div className="h-4 w-4 rounded-full bg-secondary/50" />
              </div>
              <div className="absolute bottom-1/4 left-2/3">
                <div className="h-4 w-4 rounded-full bg-secondary/50" />
              </div>
            </div>
            
            {/* Overlay text */}
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-card/90 p-4 backdrop-blur-sm">
              <p className="text-center text-sm text-muted-foreground">
                Mapa interactivo - Conecta tu API de mapas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
