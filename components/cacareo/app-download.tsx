"use client"

import React from "react"

import { Smartphone, Star, Zap, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AppFeature {
  icon: React.ReactNode
  title: string
  description: string
}

interface AppDownloadProps {
  title?: string
  subtitle?: string
  features?: AppFeature[]
  appStoreUrl?: string
  playStoreUrl?: string
}

const defaultFeatures: AppFeature[] = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Pedidos rápidos",
    description: "Ordena en segundos y recibe tu pedido donde estés",
  },
  {
    icon: <Gift className="h-6 w-6" />,
    title: "Ofertas exclusivas",
    description: "Promociones y descuentos solo en la app",
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Acumula puntos",
    description: "Gana puntos con cada compra y canjéalos",
  },
]

export function AppDownload({
  title = "Descarga nuestra App",
  subtitle = "Disfruta del sabor único y recibe promociones exclusivas",
  features = defaultFeatures,
  appStoreUrl = "#",
  playStoreUrl = "#",
}: AppDownloadProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-secondary/50 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-accent/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="text-center lg:text-left">
            <span className="mb-4 inline-block rounded-full bg-secondary/20 px-4 py-1 text-sm font-semibold text-secondary">
              Nuevo
            </span>
            
            <h2 className="mb-4 text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {title}
            </h2>
            
            <p className="mb-8 text-lg text-foreground/80">
              {subtitle}
            </p>

            {/* Features */}
            <div className="mb-8 space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 rounded-xl bg-card/50 p-4 backdrop-blur-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    {feature.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-foreground/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                size="lg"
                className="gap-3 bg-foreground text-background hover:bg-foreground/90"
                asChild
              >
                <a href={appStoreUrl}>
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  App Store
                </a>
              </Button>
              <Button
                size="lg"
                className="gap-3 bg-foreground text-background hover:bg-foreground/90"
                asChild
              >
                <a href={playStoreUrl}>
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Google Play
                </a>
              </Button>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative z-10 rounded-[40px] bg-foreground p-3 shadow-2xl">
                <div className="relative h-[500px] w-[250px] overflow-hidden rounded-[32px] bg-background md:h-[600px] md:w-[300px]">
                  {/* App Screen */}
                  <div className="flex h-full flex-col">
                    {/* App Header */}
                    <div className="bg-primary p-4 text-center">
                      <h3 className="text-xl font-black text-secondary">EL CACAREO</h3>
                      <p className="text-xs text-foreground/70">...del pollo que más sabe</p>
                    </div>
                    
                    {/* App Content */}
                    <div className="flex-1 p-4">
                      <div className="mb-4 rounded-xl bg-secondary/10 p-4">
                        <p className="text-xs font-semibold uppercase text-secondary">Promoción del día</p>
                        <p className="text-lg font-bold text-foreground">Combo Familiar</p>
                        <p className="text-2xl font-black text-secondary">$45.900</p>
                      </div>
                      
                      <div className="space-y-3">
                        {["Combos", "Pollo", "Complementos"].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 rounded-lg bg-muted p-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                              <span className="text-lg">🍗</span>
                            </div>
                            <span className="font-semibold text-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* App Bottom Nav */}
                    <div className="flex justify-around border-t border-border bg-card p-3">
                      <Smartphone className="h-5 w-5 text-secondary" />
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-secondary/20 blur-2xl" />
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
