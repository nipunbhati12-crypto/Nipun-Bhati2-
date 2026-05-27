import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
  onAddToWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  isWishlisted,
  onQuickView
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // Calculate promotional discount rate
  const hasSale = !!product.originalPrice;
  const discountPercent = hasSale 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) 
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[selectedSizeIndex] || product.sizes[0] || "Standard";
    const defaultColor = product.colors[selectedColorIndex] || product.colors[0] || { name: "Default", hex: "#CCCCCC" };
    onAddToCart(product, defaultSize, defaultColor);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToWishlist(product);
  };

  return (
    <div 
      className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      id={`product-card-${product.id}`}
    >
      {/* Visual Overlay elements */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transform group-hover:scale-105 transition-all duration-700 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Custom Badges (Best Seller, Sale, New) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 text-[9px] font-mono tracking-widest font-black uppercase text-white bg-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 rounded-none shadow-md">
              BESTSELLER
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 text-[9px] font-mono tracking-widest font-black uppercase text-white bg-[#E00000] rounded-none shadow-md">
              SEASONAL
            </span>
          )}
          {hasSale && (
            <span className="px-2.5 py-1 text-[9px] font-mono tracking-widest font-black uppercase text-white bg-red-600 rounded-none shadow-md">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist toggle action corner */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md rounded-full shadow-md text-zinc-800 dark:text-neutral-200 hover:text-red-500 hover:scale-110 active:scale-95 transition-all duration-200 z-10"
          title="Add to Wishlist"
          id={`wishlist-toggle-${product.id}`}
        >
          <Heart size={16} className={isWishlisted ? "fill-red-500 text-red-500 animate-pulse" : ""} />
        </button>

        {/* Interactive Streetwear hover panel overlay (Reveals quick size picker) */}
        <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent p-4 transition-all duration-300 translate-y-1 ${
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
        }`}>
          <div className="flex gap-1 justify-center mb-3">
            {product.sizes.slice(0, 5).map((size, index) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSizeIndex(index);
                }}
                className={`text-[10px] font-mono font-bold px-2 py-1 rounded-none transition-colors ${
                  selectedSizeIndex === index 
                    ? "bg-[#E00000] text-white" 
                    : "bg-white/10 text-white hover:bg-white/25"
                }`}
              >
                {size}
              </button>
            ))}
            {product.sizes.length > 5 && (
              <span className="text-[10px] text-zinc-400 font-mono self-center px-1">+{product.sizes.length - 5}</span>
            )}
          </div>

          <div className="flex gap-2 justify-center">
            <button
              onClick={() => onQuickView(product)}
              className="flex-1 py-2 bg-white/20 hover:bg-white/35 text-white text-xs font-display font-medium uppercase tracking-widest rounded-none transition-colors flex items-center justify-center gap-1.5"
            >
              <Eye size={12} />
              Quick View
            </button>
            <button
              onClick={handleQuickAdd}
              className="flex-1 py-2 bg-[#E00000] hover:bg-red-700 text-white text-xs font-display font-bold uppercase tracking-widest rounded-none transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 shadow-md"
            >
              <ShoppingCart size={12} />
              Quick Add
            </button>
          </div>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-1 mb-1">
          <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            {product.category}
          </span>
          {product.fit && (
            <span className="text-[9px] font-mono font-semibold text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded-none">
              {product.fit}
            </span>
          )}
        </div>

        <h3 className="font-display font-bold text-sm md:text-base text-zinc-900 dark:text-white line-clamp-1 group-hover:text-[#E00000] transition-colors mb-2">
          {product.name}
        </h3>

        {/* Rating and stars */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={`${i < Math.floor(product.rating) ? "fill-yellow-500" : "text-zinc-300 dark:text-zinc-700 font-light"}`} 
              />
            ))}
          </div>
          <span className="text-[11px] font-mono text-zinc-500">{product.rating} ({product.reviewsCount})</span>
        </div>

        {/* Prices with strike-out, and colors selection indicator */}
        <div className="mt-auto flex justify-between items-center pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-black text-[#E00000] dark:text-red-500">
              ${product.price.toFixed(2)}
            </span>
            {hasSale && (
              <span className="font-mono text-xs text-zinc-400 line-through">
                ${product.originalPrice?.toFixed(2)}
              </span>
            )}
          </div>

          {/* Miniature Color dots container */}
          <div className="flex gap-1.5">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                }}
                className={`w-3 h-3 rounded-full border transition-transform ${
                  selectedColorIndex === idx ? "scale-125 ring-2 ring-red-500/50" : "scale-100 hover:scale-110"
                }`}
                style={{ backgroundColor: color.hex, borderColor: "rgba(0,0,0,0.15)" }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
