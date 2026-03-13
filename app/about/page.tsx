import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Award, Utensils, Wine, Users } from "lucide-react"

const teamMembers = [
  {
    name: "Marcus Beaumont",
    role: "Executive Chef",
    description: "With three Michelin stars and 25 years of culinary excellence, Chef Beaumont brings unparalleled artistry to every dish.",
    image: "/images/chef.jpg",
  },
]

const values = [
  {
    icon: Utensils,
    title: "Culinary Excellence",
    description: "Every dish is crafted with precision, passion, and the finest ingredients sourced from around the world.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    description: "From farm to table, we maintain the highest standards in every aspect of our culinary journey.",
  },
  {
    icon: Wine,
    title: "Perfect Pairings",
    description: "Our sommelier curates exceptional wines to complement and elevate each course.",
  },
  {
    icon: Users,
    title: "Personalized Service",
    description: "Our dedicated team ensures every guest experiences attentive, anticipatory service.",
  },
]

const milestones = [
  { year: "1999", event: "Aurum opens its doors in Manhattan" },
  { year: "2003", event: "Awarded first Michelin star" },
  { year: "2008", event: "Chef Beaumont joins as Executive Chef" },
  { year: "2012", event: "Awarded second Michelin star" },
  { year: "2018", event: "Awarded third Michelin star" },
  { year: "2024", event: "Named Best Fine Dining Restaurant in NYC" },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Banner */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/restaurant-interior.jpg"
            alt="About Aurum"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <span className="font-[var(--font-cormorant)] text-gold text-lg tracking-[0.3em] uppercase">
            Est. 1999
          </span>
          <h1 className="font-[var(--font-playfair)] text-5xl md:text-7xl font-semibold text-foreground mt-4 mb-6">
            Our Story
          </h1>
          <p className="font-[var(--font-cormorant)] text-xl md:text-2xl text-foreground/80 leading-relaxed text-pretty">
            A quarter century of culinary excellence, where every meal is a masterpiece 
            and every guest is cherished.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden rounded-sm">
                <Image
                  src="/images/chef.jpg"
                  alt="Chef Marcus Beaumont"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-gold text-background p-8 text-center">
                <span className="font-[var(--font-playfair)] text-5xl font-bold block">3</span>
                <span className="font-[var(--font-cormorant)] text-sm tracking-wider uppercase">
                  Michelin<br />Stars
                </span>
              </div>
            </div>

            <div>
              <span className="font-[var(--font-cormorant)] text-gold text-lg tracking-[0.3em] uppercase">
                Our Philosophy
              </span>
              <h2 className="font-[var(--font-playfair)] text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6 text-balance">
                Where Tradition Meets Innovation
              </h2>
              <div className="w-16 h-px bg-gold mb-8" />
              
              <div className="space-y-6 font-[var(--font-cormorant)] text-xl text-foreground/80 leading-relaxed">
                <p>
                  Aurum was born from a vision to create more than a restaurant; 
                  we envisioned a sanctuary where culinary artistry, impeccable 
                  service, and timeless elegance converge.
                </p>
                <p>
                  Our name, derived from the Latin word for gold, reflects our 
                  commitment to the gold standard in everything we do. From the 
                  meticulous sourcing of ingredients to the artful presentation 
                  of each dish, excellence is our only measure.
                </p>
                <p>
                  Under the visionary leadership of Executive Chef Marcus Beaumont, 
                  our kitchen has become a laboratory of taste, where classic 
                  techniques meet contemporary creativity to produce dishes that 
                  surprise, delight, and inspire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-[var(--font-cormorant)] text-gold text-lg tracking-[0.3em] uppercase">
              What Defines Us
            </span>
            <h2 className="font-[var(--font-playfair)] text-4xl md:text-5xl font-semibold text-foreground mt-4">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-[var(--font-playfair)] text-xl text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="font-[var(--font-cormorant)] text-foreground/70 text-lg leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-[var(--font-cormorant)] text-gold text-lg tracking-[0.3em] uppercase">
              Our Journey
            </span>
            <h2 className="font-[var(--font-playfair)] text-4xl md:text-5xl font-semibold text-foreground mt-4">
              Milestones
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-8 mb-8 last:mb-0">
                <div className="w-20 flex-shrink-0 text-right">
                  <span className="font-[var(--font-playfair)] text-2xl text-gold font-semibold">
                    {milestone.year}
                  </span>
                </div>
                <div className="relative flex-1 pb-8">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
                  <div className="absolute left-0 top-2 w-3 h-3 -translate-x-1/2 rounded-full bg-gold" />
                  <p className="font-[var(--font-cormorant)] text-xl text-foreground pl-8">
                    {milestone.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-[var(--font-cormorant)] text-gold text-lg tracking-[0.3em] uppercase">
              Meet the Visionary
            </span>
            <h2 className="font-[var(--font-playfair)] text-4xl md:text-5xl font-semibold text-foreground mt-4">
              Our Leadership
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-64 h-64 mx-auto mb-8 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-[var(--font-playfair)] text-3xl text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="font-[var(--font-cormorant)] text-gold text-xl tracking-wider mb-4">
                  {member.role}
                </p>
                <p className="font-[var(--font-cormorant)] text-foreground/70 text-xl leading-relaxed max-w-xl mx-auto">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-[var(--font-playfair)] text-4xl md:text-5xl font-semibold text-foreground mb-6">
            Experience Aurum
          </h2>
          <p className="font-[var(--font-cormorant)] text-xl text-foreground/70 mb-10 max-w-2xl mx-auto">
            Join us for an unforgettable culinary journey that celebrates the art of fine dining.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold-light text-background font-[var(--font-cormorant)] text-lg tracking-wider px-8 py-6"
            >
              <Link href="/reservations">Make a Reservation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-background font-[var(--font-cormorant)] text-lg tracking-wider px-8 py-6"
            >
              <Link href="/menu">View Our Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
