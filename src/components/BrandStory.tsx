import React from 'react';
import { History, Award, CheckCircle2 } from 'lucide-react';

export default function BrandStory() {
  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400 text-xs font-mono font-bold uppercase rounded-none">
              <History size={14} />
              <span>ESTABLISHED 1873 • SAN FRANCISCO</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-zinc-900 dark:text-white leading-none italic">
              THE ORIGINAL DENIM. <br/>
              <span className="text-[#E00000] dark:text-red-500">STITCHED IN REBELLION.</span>
            </h2>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans font-light">
              In 1873, Levi Strauss and Jacob Davis partnered to manufacture durable working waist-overalls reinforced with real copper rivets. What was designed to withstand grueling gold mines quickly transformed into the ultimate canvas of self-expression.
            </p>

            <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed font-sans font-light">
              From rockers, rebels, cowboys, hipsters, and tech pioneers to modern streetwear tastemakers, Levi’s® have been worn by those who build the future. We didn't just invent blue clothing — we engineered confidence you can step into.
            </p>

            {/* Timeless features checkpoints */}
            <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-mono text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#E00000]" />
                <span>Patented Copper Rivets</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#E00000]" />
                <span>Genuine Red Tab®</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#E00000]" />
                <span>Two Horse Pull Leather Patch</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#E00000]" />
                <span>Rigid Redline Selvage</span>
              </div>
            </div>
          </div>

          {/* Right side: Double grid display layout */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-none overflow-hidden bg-zinc-200 shadow-lg relative group">
                <img
                  src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600"
                  alt="Vintage Levi jacket close-up"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute bottom-4 left-4 text-white text-[10px] font-mono tracking-wider bg-black/60 px-2 py-1 rounded-none">TRUCKER CLASSICS</span>
              </div>
              <div className="aspect-square rounded-none overflow-hidden bg-zinc-200 shadow-md relative group">
                <img
                  src="https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=600"
                  alt="Original rivet pocket detailing"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute bottom-4 left-4 text-white text-[10px] font-mono tracking-wider bg-black/60 px-2 py-1 rounded-none">DOUBLE-ARC SEAMS</span>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-none overflow-hidden bg-zinc-200 border border-zinc-100 dark:border-zinc-800 shadow-md flex flex-col justify-center items-center p-6 text-center text-zinc-900 dark:text-white bg-white dark:bg-zinc-950">
                <Award size={36} className="text-[#E00000] mb-2 animate-pulse" />
                <p className="font-display font-black text-2xl uppercase tracking-widest text-[#E00000]">150+</p>
                <p className="text-[10px] font-mono uppercase text-zinc-400 mt-1">YEARS OF INNOVATION</p>
              </div>

              <div className="aspect-[4/5] rounded-none overflow-hidden bg-zinc-200 shadow-lg relative group">
                <img
                  src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600"
                  alt="Folded premium blue jeans denim texture"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute bottom-4 left-4 text-white text-[10px] font-mono tracking-wider bg-black/60 px-2 py-1 rounded-none">AUTHENTIC WEAVE</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
