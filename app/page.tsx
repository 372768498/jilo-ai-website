import HeroSection from '@/components/HeroSection'
import CapabilityMatrix from '@/components/CapabilityMatrix'
import CoreAdvantages from '@/components/CoreAdvantages'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import IndustryResearchMCP from '@/components/mcp/IndustryResearchMCP'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <CapabilityMatrix />
      <CoreAdvantages />
      <IndustryResearchMCP />
      <CTASection />
      <Footer />
    </main>
  )
}
