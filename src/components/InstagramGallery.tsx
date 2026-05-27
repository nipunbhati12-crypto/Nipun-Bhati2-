import React, { useState } from 'react';
import { Eye, Heart, Instagram, Sparkles } from 'lucide-react';

const LOOKBOOK_FEED = [
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600",
    tags: ["#LiveInLevis", "#501series"],
    likes: "1,248",
    comments: "42",
    product: "Ex-Boyfriend Trucker",
    author: "@stella_streets"
  },
  {
    image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600",
    tags: ["#LevisVintage", "#TruckerVibe"],
    likes: "3,812",
    comments: "159",
    product: "Classic Overdyed Hoodie",
    author: "@marcus_denim"
  },
  {
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600",
    tags: ["#RibcageJeans", "#LevisLegs"],
    likes: "2,490",
    comments: "18",
    product: "70s High Flare Jeans",
    author: "@valerie_val"
  },
  {
    image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=600",
    tags: ["#SlimFit", "#DenimHeads"],
    likes: "945",
    comments: "11",
    product: "511™ Slim Fit Jeans",
    author: "@tyler.fits"
  },
  {
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600",
    tags: ["#OriginalsOnly", "#LVC"],
    likes: "4,112",
    comments: "329",
    product: "501® Original Fit Jeans",
    author: "@jacob_davis_col"
  },
  {
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600",
    tags: ["#LevisAccessories", "#LeatherStyle"],
    likes: "740",
    comments: "9",
    product: "Full-Grain Utility Belt",
    author: "@belt_twotone"
  }
];

export default function InstagramGallery() {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Intro Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Instagram size={20} className="text-[#E00000]" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#E00000] uppercase">#LIVEINLEVIS GALLERY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-zinc-900 dark:text-white leading-none">
              SHOP OUR COMMUNITY LOOKBOOK
            </h2>
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            TAG YOUR FITS ON INSTAGRAM FOR A CHANCE TO BE FEATURED • @LEVIS
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {LOOKBOOK_FEED.map((item, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-none overflow-hidden group shadow-sm bg-neutral-150 dark:bg-zinc-950"
              onMouseEnter={() => setActiveItem(index)}
              onMouseLeave={() => setActiveItem(null)}
              id={`instagram-feed-cell-${index}`}
            >
              <img
                src={item.image}
                alt={`Instagram Outfit look by ${item.author}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Hover overlay panel */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                
                {/* Author profile line */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-extrabold tracking-wider bg-white/20 px-2 py-0.5 rounded-none">
                    {item.author}
                  </span>
                  <Sparkles size={14} className="text-[#E00000] animate-pulse" />
                </div>

                {/* Tags middle section */}
                <div className="text-center p-1.5 bg-black/10 rounded-none">
                  <p className="text-[10px] font-mono text-zinc-300 tracking-tight line-clamp-2">{item.tags.join(" ")}</p>
                </div>

                {/* Bottom line: shop CTA option */}
                <div className="flex justify-between items-center text-[9px] font-mono border-t border-white/20 pt-2 transition-transform transform translate-y-1 group-hover:translate-y-0 duration-300">
                  <span className="flex items-center gap-1"><Heart size={10} className="fill-[#E00000] text-[#E00000]" /> {item.likes}</span>
                  <span className="font-display font-bold underline cursor-pointer hover:text-red-405">SHOP LOOK</span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
