"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, MapPin, User, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

interface NavItem {
  label: string
  href: string
}

interface HeaderProps {
  navItems?: NavItem[]
  logoUrl?: string
}

const defaultNavItems: NavItem[] = [
  { label: "Pide en línea", href: "#pedir" },
  { label: "Restaurantes", href: "#restaurantes" },
  { label: "Novedades", href: "#novedades" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contáctanos", href: "#contacto" },
]

export function Header({ navItems = defaultNavItems, logoUrl }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems, setCartOpen } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-primary/80 via-primary/70 to-primary/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20">
        
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 transition-transform hover:scale-[1.02]"
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="El Cacareo"
              className="h-12 w-auto md:h-14"
            />
          ) : (
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-wide text-secondary md:text-3xl drop-shadow-sm">
                EL CACAREO
              </span>
              <span className="text-[11px] text-foreground/70 tracking-wider">
                el pollo que más sabe
              </span>
            </div>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative text-sm font-medium text-foreground/80 transition hover:text-secondary
              after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/80 hover:bg-white/10 hover:text-secondary"
          >
            <MapPin className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/80 hover:bg-white/10 hover:text-secondary"
          >
            <User className="h-5 w-5" />
          </Button>

          <Button 
            className="relative gap-2 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground shadow-lg hover:shadow-secondary/40 transition-all hover:scale-[1.03]"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart className="h-4 w-4" />
            Pedir ahora
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                {totalItems}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-primary/90 backdrop-blur-xl">
          <nav className="flex flex-col px-6 py-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-4 text-sm font-semibold text-foreground/80 hover:text-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
              <Button variant="outline" className="w-full justify-start gap-3 border-white/20 bg-transparent text-foreground">
                <MapPin className="h-4 w-4" />
                Ubicación
              </Button>

              <Button variant="outline" className="w-full justify-start gap-3 border-white/20 bg-transparent text-foreground">
                <User className="h-4 w-4" />
                Iniciar sesión
              </Button>

              <Button 
                className="relative w-full gap-3 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground"
                onClick={() => {
                  setCartOpen(true)
                  setIsMenuOpen(false)
                }}
              >
                <ShoppingCart className="h-4 w-4" />
                Pedir ahora
                {totalItems > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
