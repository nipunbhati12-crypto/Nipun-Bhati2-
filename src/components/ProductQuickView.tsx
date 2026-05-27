import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../types';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
  onAddToWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function ProductQuickView({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddToWishlist,
  isWishlisted
}: ProductQuickViewProps) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen || !product) return null;

  const currentSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const currentColor = product.colors[selectedColorIndex] || product.colors[0];

  const handleAddToCart = () => {
    onAddToCart(product, currentSize, currentColor);
    setSuccessMsg(`Added 501® ${product.name} (Size: ${currentSize}) to Cart!`);
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4" id="quick-view-modal">
      {/* Dark background overlay */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Main Modal body */}
      <div className="relative bg-white dark:bg-zinc-950 w-full max-w-4xl rounded-none overflow-hidden shadow-2xl border-t-4 border-[#E00000] border-x border-b border-zinc-200 dark:border-zinc-800 z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
        
        {/* Close Button top corner */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 p-2 text-zinc-400 hover:text-[#E00000] dark:hover:text-[#E00000] dark:bg-zinc-900/80 bg-white/80 backdrop-blur-md rounded-none border border-zinc-200 dark:border-zinc-800 shadow-md transition-all duration-200"
          aria-label="Close dialog"
          id="close-quickview-btn"
        >
          <X size={20} />
        </button>

        {/* Left column: Fashion Product Image */}
        <div className="w-full md:w-1/2 bg-neutral-100 dark:bg-zinc-950 flex flex-col relative aspect-[4/5] md:aspect-auto">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center max-h-[40vh] md:max-h-[65vh] lg:max-h-[75vh]"
            referrerPolicy="no-referrer"
          />

          {/* Slogan corner visual ribbon */}
          <div className="absolute bottom-4 left-4 bg-black/80 text-white p-2.5 rounded-none font-mono text-[9px] tracking-widest uppercase">
            <span>TAILORED STREET SPEC / LOT: 501</span>
          </div>
        </div>

        {/* Right column: Action purchase details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[55vh] md:max-h-[65vh] lg:max-h-[75vh]">
          <div>
            <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-1">
              AUTHENTIC {product.category}
            </span>

            <h2 className="text-xl sm:text-2xl font-display font-black uppercase text-zinc-900 dark:text-white leading-tight mb-2">
              {product.name}
            </h2>

            {/* Stars rating panel */}
            <div className="flex items-center gap-1.5 mb-4">
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={`${i < Math.floor(product.rating) ? "fill-yellow-500" : "text-zinc-300 dark:text-zinc-700"}`} 
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-zinc-500">{product.rating} / 5.0 rating ({product.reviewsCount} reviews)</span>
            </div>

            {/* Pricing details */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-mono font-black text-[#E00000] dark:text-red-500">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-mono text-zinc-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans mb-6">
              {product.description}
            </p>

            <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-4" />

            {/* COLORS pickers */}
            <div className="mb-4">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-2">
                CHOOSE COLOR: <strong className="text-zinc-900 dark:text-white font-bold">{currentColor.name}</strong>
              </span>
              <div className="flex gap-2">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedColorIndex === idx 
                        ? "border-[#E00000] ring-2 ring-red-500/20 scale-110" 
                        : "border-zinc-200 dark:border-zinc-800 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* SIZES selection grid */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono uppercase text-zinc-400">
                  SELECT WAIST SIZE: <strong className="text-zinc-900 dark:text-white font-bold">{currentSize}</strong>
                </span>
                <span className="text-[10px] font-mono uppercase text-zinc-400 hover:text-[#E00000] underline cursor-pointer">
                  SIZE GUIDE
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                {product.sizes.map((size, idx) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`p-2 py-2.5 text-xs font-mono font-bold rounded-none border uppercase transition-all ${
                      selectedSizeIndex === idx 
                        ? "bg-[#E00000] text-white border-[#E00000] shadow-md"
                        : "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout & Quick Cart Add Buttons */}
          <div className="space-y-3">
            {successMsg && (
              <div className="p-2.5 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-none text-green-700 dark:text-green-400 text-xs font-semibold text-center animate-bounce">
                {successMsg}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-[#E00000] hover:bg-zinc-900 text-white text-xs md:text-sm font-display font-black uppercase tracking-widest rounded-none flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                id="quickview-add-to-cart"
              >
                <ShoppingBag size={14} />
                Add To Shopping Bag
              </button>

              <button
                onClick={() => onAddToWishlist(product)}
                className={`p-4 border rounded-none hover:scale-105 active:scale-95 transition-all flex items-center justify-center ${
                  isWishlisted 
                    ? "border-red-500 bg-red-50 dark:bg-red-950/20 text-red-500" 
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-red-500"
                }`}
                title="Save product to wishlist Favorites"
                id="quickview-wishlist-btn"
              >
                <Heart size={18} className={isWishlisted ? "fill-red-500" : ""} />
              </button>
            </div>

            {/* Micro value props descriptors (Shipping policies) */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-[10px] text-zinc-400 font-mono">
              <div className="flex flex-col items-center text-center p-1.5">
                <Truck size={14} className="text-[#E00000] mb-1" />
                <span>FAST SHIPPING</span>
              </div>
              <div className="flex flex-col items-center text-center p-1.5">
                <RotateCcw size={14} className="text-[#E00000] mb-1" />
                <span>30-DAY REFUNDS</span>
              </div>
              <div className="flex flex-col items-center text-center p-1.5">
                <ShieldCheck size={14} className="text-[#E00000] mb-1" />
                <span>GENUINE LEVI'S®</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
