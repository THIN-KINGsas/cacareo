"use client"

import React from "react"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface ContactInfo {
  phone: string
  email: string
  address: string
}

interface SocialLink {
  platform: string
  url: string
  icon: React.ReactNode
}

interface FooterProps {
  sections?: FooterSection[]
  contactInfo?: ContactInfo
  socialLinks?: SocialLink[]
}

const defaultSections: FooterSection[] = [
  {
    title: "Menú",
    links: [
      { label: "Combos", href: "#combos" },
      { label: "Pollo", href: "#pollo" },
      { label: "Complementos", href: "#complementos" },
      { label: "Bebidas", href: "#bebidas" },
      { label: "Postres", href: "#postres" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { label: "Nosotros", href: "#nosotros" },
      { label: "Trabaja con nosotros", href: "#empleo" },
      { label: "Franquicias", href: "#franquicias" },
      { label: "Proveedores", href: "#proveedores" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos y condiciones", href: "#terminos" },
      { label: "Política de privacidad", href: "#privacidad" },
      { label: "Política de cookies", href: "#cookies" },
      { label: "Información nutricional", href: "#nutricion" },
    ],
  },
]

const defaultContactInfo: ContactInfo = {
  phone: "01 8000 123 456",
  email: "contacto@elcacareo.com",
  address: "Colombia",
}

const defaultSocialLinks: SocialLink[] = [
  { platform: "Facebook", url: "#", icon: <Facebook className="h-5 w-5" /> },
  { platform: "Instagram", url: "#", icon: <Instagram className="h-5 w-5" /> },
  { platform: "Twitter", url: "#", icon: <Twitter className="h-5 w-5" /> },
  { platform: "YouTube", url: "#", icon: <Youtube className="h-5 w-5" /> },
]

export function Footer({
  sections = defaultSections,
  contactInfo = defaultContactInfo,
  socialLinks = defaultSocialLinks,
}: FooterProps) {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 inline-block">
              <span className="text-3xl font-black text-primary">EL CACAREO</span>
              <p className="text-sm text-background/70">...del pollo que más sabe</p>
            </Link>
            
            <p className="mb-6 max-w-sm text-sm text-background/70">
              El mejor pollo de Colombia. Sabor único, calidad inigualable y el compromiso de siempre servirte lo mejor.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-2 text-background/70 transition-colors hover:text-primary">
                <Phone className="h-4 w-4" />
                {contactInfo.phone}
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-background/70 transition-colors hover:text-primary">
                <Mail className="h-4 w-4" />
                {contactInfo.email}
              </a>
              <p className="flex items-center gap-2 text-background/70">
                <MapPin className="h-4 w-4" />
                {contactInfo.address}
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-primary hover:text-foreground"
                  aria-label={link.platform}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 font-bold text-background">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 rounded-2xl bg-background/10 p-6 md:p-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="mb-2 text-xl font-bold text-background">Suscríbete a nuestras ofertas</h3>
              <p className="text-sm text- ackground/70">Recibe promociones exclusivas y novedades directamente en tu correo</p>
            </div>
            <div className="flex w-full gap-2 md:w-auto">
              <Input
                type="email"
                placeholder="tu@email.com"
                className="h-12 w-full bg-background text-foreground md:w-64"
              />
              <Button className="h-12 bg-primary text-foreground hover:bg-primary/90">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} El Cacareo. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-background/50 hover:text-primary">
              Superintendencia Industria y Comercio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
