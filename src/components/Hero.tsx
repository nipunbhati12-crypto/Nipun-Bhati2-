import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Award } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600",
    subtitle: "THE ORIGINAL AMERICAN INVENTORS SINCE 1873",
    title: "WEAR CONFIDENCE. WEAR LEVI’S.",
    description: "Built for rebels, pioneers, and icons. Experience true denim craftsmanship tailored to make a bold streetwear statement on the asphalt.",
    badge: "NEW COPPED COLLECTION",
    accentText: "501® SERIES"
  },
  {
    image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1600",
    subtitle: "STREETWEAR LEGACY CONTINUED",
    title: "STITCHED WITH INDEPENDENCE.",
    description: "Settle for nothing less than absolute comfort. Our oversized custom truckers, vintage jackets, and soft heavy hoodies are made to mold uniquely to your story.",
    badge: "BEST SELLING ESSENTIALS",
    accentText: "VINTAGE TRUCKERS"
  },
  {
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1600",
    subtitle: "DENIM MEETS ARCHITECTURE",
    title: "CRAFT FORGED IN THE BAY.",
    description: "Raw redline selvage, rivet reinforcement detail, and precision back pocket dual-arc branding curves. Real cotton, real longevity, real heritage.",
    badge: "THE BLUEPRINT",
    accentText: "SELVAGE COLLECTION"
  }
];

export default function Hero({ onCtaClick }: HeroProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] bg-zinc-950 overflow-hidden flex items-center">
      {/* Slider Background images */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              isActive ? "opacity-60 scale-100 pointer-events-auto" : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Dark vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent" />
          </div>
        );
      })}

      {/* Hero Content Overlay */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-white">
        <div className="max-w-2xl md:max-w-3xl space-y-4">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E00000] text-[10px] md:text-xs font-mono font-black uppercase tracking-widest shadow-lg">
            <Award size={14} />
            <span>{HERO_SLIDES[current].badge}</span>
          </div>

          <p className="text-zinc-300 text-xs md:text-sm font-mono font-medium tracking-[0.25em] uppercase">
            {HERO_SLIDES[current].subtitle}
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tighter uppercase italic leading-[0.95]">
            {HERO_SLIDES[current].title.split('. ')[0]}.
            <span className="block text-[#E00000] dark:text-[#E00000]">
              {HERO_SLIDES[current].title.split('. ')[1]}
            </span>
          </h1>

          <p className="text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed font-sans font-light max-w-lg">
            {HERO_SLIDES[current].description}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {/* CTA Shop Buttons (Sharp borders, sleek italic bold uppercase tracking) */}
            <button
              onClick={onCtaClick}
              id="hero-cta-shop-btn"
              className="px-8 py-4 bg-white text-zinc-950 font-display font-black text-xs md:text-sm uppercase tracking-widest hover:bg-[#E00000] hover:text-white transition-all duration-300 flex items-center gap-2 group shadow-xl"
            >
              Shop Denim 
              <ArrowRight size={16} className="transform group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button
              onClick={onCtaClick}
              id="hero-discover-btn"
              className="px-8 py-4 bg-transparent border border-white/60 text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Explore {HERO_SLIDES[current].accentText}
            </button>
          </div>
        </div>
      </div>

      {/* Manual Slides Controllers */}
      <div className="absolute right-4 sm:right-8 md:right-12 bottom-6 md:bottom-12 z-20 flex space-x-3 items-center">
        <button
          onClick={handlePrev}
          className="p-3 bg-black/55 border border-white/10 hover:bg-[#E00000] hover:border-[#E00000] text-white transition-all duration-300"
          aria-label="Previous Slide"
          id="hero-prev-btn"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="text-white text-[10px] md:text-xs font-mono tracking-widest bg-black/55 px-3.5 py-2.5 border border-white/10">
          <span className="text-[#E00000] font-bold">0{current + 1}</span> / 0{HERO_SLIDES.length}
        </div>
        <button
          onClick={handleNext}
          className="p-3 bg-black/55 border border-white/10 hover:bg-[#E00000] hover:border-[#E00000] text-white transition-all duration-300"
          aria-label="Next Slide"
          id="hero-next-btn"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Aesthetic Side Ribbon indicators for full streetwear effect */}
      <div className="absolute left-6 bottom-12 hidden lg:flex flex-col gap-1 items-left text-white/40 text-[9px] font-mono tracking-[0.3em] uppercase transform -rotate-90 origin-left">
        <span>ORIGINAL SHIPMENT CO.</span>
        <span className="h-px bg-white/20 w-8 inline-block my-1 align-middle"></span>
        <span>LAT: 37° 47' 59\" N | LON: 122° 24' 1\" W</span>
      </div>
    </section>
  );
}
