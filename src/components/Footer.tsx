import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  setActiveCategory: (cat: string) => void;
}

export default function Footer({ setActiveCategory }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 text-neutral-300 border-t border-zinc-805 pt-16 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Segment: Logo + Description + Sitemap columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Logo Column (Sleek Crimson Badge Logo representation) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5 select-none">
              <div className="bg-[#E00000] px-4 py-2.5 shadow-md">
                <span className="text-white font-black text-xl tracking-tighter uppercase italic block leading-none">Levi's</span>
              </div>
            </div>
            
            <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed max-w-sm">
              Wear Confidence. Wear Levi’s. Crafting authentic, exceptionally durable denim commodities since Jacob Davis and Levi Strauss pioneered the first riveted dungarees in 1873.
            </p>

            <div className="space-y-2 text-xs font-mono text-neutral-450 pt-2">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#E00000]" />
                <span>Levi Strauss Plaza, San Francisco, CA 94111</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#E00000]" />
                <span>Inquiries: 1-800-USA-LEVI (872-5384)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#E00000]" />
                <span>support@levis-store-sim.com</span>
              </div>
            </div>
          </div>

          {/* Quick shop columns */}
          <div>
            <h4 className="text-xs font-display font-black text-white uppercase tracking-wider mb-4 border-l-2 border-[#E00000] pl-2">
              Shop Range
            </h4>
            <ul className="space-y-2.5 text-xs">
              {["Men", "Women", "New Arrivals", "Denim Collection", "Accessories", "Sale"].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setActiveCategory(cat);
                      setTimeout(() => {
                        const productsGrid = document.getElementById("products-catalog-anchor");
                        if (productsGrid) productsGrid.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="hover:text-red-500 transition-colors uppercase font-mono tracking-wide text-zinc-400"
                    id={`footer-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-display font-black text-white uppercase tracking-wider mb-4 border-l-2 border-[#E00000] pl-2">
              Support & Help
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-mono">
              <li><a href="#" className="hover:text-red-500 transition-colors">TRACK SHIPMENTS</a></li>
              <li><a href="#" className="hover:text-red-505 transition-colors">EXCHANGES & RETURNS</a></li>
              <li><a href="#" className="hover:text-red-505 transition-colors">SITTING & SIZE GUIDES</a></li>
              <li><a href="#" className="hover:text-red-505 transition-colors">ACCESSIBILITY DISCLOSURES</a></li>
              <li><a href="#" className="hover:text-red-505 transition-colors">COMMUNITY SCHEMES</a></li>
              <li><a href="#" className="hover:text-red-505 transition-colors">STORE LOCATOR</a></li>
            </ul>
          </div>

          {/* Corporate / Sustainability statements */}
          <div>
            <h4 className="text-xs font-display font-black text-white uppercase tracking-wider mb-4 border-l-2 border-[#E00000] pl-2">
              Our Vision
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-sans">
              <li className="leading-snug">
                <strong>BETTER CLOTHES, BETTER PLANET</strong>: Over 65% of our denim is crafted utilizing Water&lt;Less® sustainable technologies conserving critical resources.
              </li>
              <li className="leading-snug">
                <strong>ECO-HEMP FABRICS</strong>: Growing our cottonized hemp blends uses significantly less chemical runoffs than traditional crops.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-1.5 select-none text-center">
            <ShieldCheck size={14} className="text-green-700" />
            <span>© 2026 Levi Strauss & Co. Simulated Premium eCommerce Platform. All Rights Reserved.</span>
          </div>

          <div className="flex gap-4">
            <a href="#" className="hover:text-red-500 transition-colors">PRIVACY POLICY</a>
            <span>•</span>
            <a href="#" className="hover:text-red-500 transition-colors">TERMS OF USE</a>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-1 px-3 bg-zinc-900 border border-zinc-800 hover:border-[#E00000] hover:bg-[#E00000] hover:text-white rounded-none text-[10px] uppercase font-bold flex items-center gap-1 transition-all duration-300"
              id="footer-back-to-top-btn"
            >
              Back To Top
              <ArrowUp size={10} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
