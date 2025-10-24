import HeroSection from '@/components/HeroSection'
import CapabilityMatrix from '@/components/CapabilityMatrix'
import ServicePackages from '@/components/ServicePackages'
import CoreAdvantages from '@/components/CoreAdvantages'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <CapabilityMatrix />
      <ServicePackages />
      <CoreAdvantages />
      <CTASection />
      <Footer />
    </main>
  )
}
