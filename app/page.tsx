import { Header } from "@/components/cacareo/header"
import { Hero } from "@/components/cacareo/hero"
import { Combos } from "@/components/cacareo/combos"
import { Novedades } from "@/components/cacareo/novedades"
import { AppDownload } from "@/components/cacareo/app-download"
import { RestaurantFinder } from "@/components/cacareo/restaurant-finder"
import { Footer } from "@/components/cacareo/footer"

// Datos que pueden ser alimentados por IA o API
const heroPromotions = [
  {
    id: "1",
    title: "COMBO FAMILIAR",
    subtitle: "Ahorra más con",
    price: "$45.900",
    description: "8 presas de pollo crujiente, 2 porciones de arroz, 6 arepas doradas, 1 ensalada grande y 1 gaseosa 1.5L. Perfecto para compartir en familia.",
    badge: "OFERTA ESPECIAL",
  },
  {
    id: "2",
    title: "COMBO Clasico",
    subtitle: "El favorito de siempre",
    price: "$17.900",
    description: "1 presa de pollo, 1 sopa del día, 1 porción de arroz, 2 arepas y 1 gaseosa 325ml. De lunes a viernes.",
    badge: "MÁS VENDIDO",
  },
  {
    id: "3",
    title: "COMBO RECARGADO",
    subtitle: "Para los que quieren más",
    price: "$24.900",
    description: "1 filete de pechuga premium, 1 ensalada fresca, 1 porción de arroz, 3 arepas y 1 gaseosa 325ml.",
    badge: "PREMIUM",
  },
]

const combosData = [
  {
    id: "1",
    name: "Combo Desvare",
    description: "El combo perfecto para una comida rápida y deliciosa",
    price: "$15.900",
    originalPrice: "$18.900",
    items: ["1 presa de pollo", "1 sopa del día", "1 porción de arroz", "2 arepas", "1 gaseosa 325ml"],
    badge: "Más vendido",
    rating: 4.8,
    isPopular: true,
  },
  {
    id: "2",
    name: "Combo Recargado",
    description: "Para los que quieren más sabor en cada bocado",
    price: "$22.900",
    items: ["1 filete de pechuga", "1 ensalada", "1 porción de arroz", "3 arepas", "1 gaseosa 325ml"],
    badge: "Premium",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Combo Familiar",
    description: "Ideal para compartir en familia o con amigos",
    price: "$45.900",
    originalPrice: "$52.900",
    items: ["8 presas de pollo", "2 porciones de arroz", "6 arepas", "1 ensalada grande", "1 gaseosa 1.5L"],
    badge: "Ahorra $7.000",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Combo Kids",
    description: "Diseñado especialmente para los más pequeños",
    price: "$12.900",
    items: ["2 nuggets de pollo", "Papas fritas", "1 jugo", "Sorpresa"],
    badge: "Infantil",
    rating: 4.6,
  },
]

const novedadesData = [
  {
    id: "1",
    title: "Nuevo Combo Parrillero",
    description: "Descubre nuestra nueva línea de pollo a la parrilla con sabores únicos que te harán volver por más. Marinado con hierbas frescas y especias secretas.",
    date: "2026-01-28",
    category: "Nuevo producto",
  },
  {
    id: "2",
    title: "Promoción 2x1 Todos los Martes",
    description: "Celebramos contigo con ofertas especiales. 2x1 en combos personales todos los martes. No te lo pierdas.",
    date: "2026-01-25",
    category: "Promoción",
  },
  {
    id: "3",
    title: "Nueva Sede en Medellín",
    description: "Abrimos una nueva sede en el Poblado. Ven a conocernos y disfruta del sabor que te encanta con la mejor vista de la ciudad.",
    date: "2026-01-20",
    category: "Apertura",
  },
]

const restaurantsData = [
  {
    id: "1",
    name: "El Cacareo Centro",
    address: "Calle 10 #5-23, Centro Histórico, Bogotá",
    phone: "601 234 5678",
    hours: "10:00 AM - 10:00 PM",
    distance: "0.5 km",
  },
  {
    id: "2",
    name: "El Cacareo Zona Rosa",
    address: "Carrera 13 #85-45, Zona T, Bogotá",
    phone: "601 345 6789",
    hours: "10:00 AM - 11:00 PM",
    distance: "2.3 km",
  },
  {
    id: "3",
    name: "El Cacareo Kennedy",
    address: "Av. 1 de Mayo #45-12, Kennedy, Bogotá",
    phone: "601 456 7890",
    hours: "10:00 AM - 10:00 PM",
    distance: "4.1 km",
  },
  {
    id: "4",
    name: "El Cacareo Medellín",
    address: "Calle 10 #43-12, El Poblado, Medellín",
    phone: "604 567 8901",
    hours: "10:00 AM - 11:00 PM",
    distance: "450 km",
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header 
        navItems={[
          { label: "Pide en línea", href: "#pedir" },
          { label: "Menú", href: "#menu" },
          { label: "Restaurantes", href: "#restaurantes" },
          { label: "Novedades", href: "#novedades" },
          { label: "Nosotros", href: "#nosotros" },
          { label: "Contáctanos", href: "#contacto" },
        ]}
      />
      
      <Hero 
        promotions={heroPromotions}
        autoPlayInterval={6000}
      />
      
      <Combos 
        title="Nuestros Combos"
        subtitle="Disfruta del pollo que más sabe con nuestras mejores ofertas y promociones"
        combos={combosData}
      />
      
      <Novedades 
        title="Novedades"
        subtitle="Mantente al día con nuestras últimas noticias y promociones exclusivas"
        novedades={novedadesData}
      />
      
      <AppDownload 
        title="Descarga nuestra App"
        subtitle="Pide desde tu celular y recibe promociones exclusivas solo para ti"
        appStoreUrl="https://apps.apple.com"
        playStoreUrl="https://play.google.com"
      />
      
      <RestaurantFinder 
        title="Encuentra tu Restaurante"
        subtitle="Ingresa tu ubicación para encontrar el restaurante El Cacareo más cercano"
        restaurants={restaurantsData}
      />
      
      <Footer 
        contactInfo={{
          phone: "01 8000 123 456",
          email: "contacto@elcacareo.com",
          address: "Bogotá, Colombia",
        }}
      />
    </main>
  )
}
