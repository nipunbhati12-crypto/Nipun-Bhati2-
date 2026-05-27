import React from 'react';
import { X, Trash2, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onMoveToCart
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="wishlist-drawer-container">
      {/* Background dimmer backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-950 flex flex-col shadow-2xl border-l border-zinc-200 dark:border-zinc-800 transition-all">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-[#E00000] fill-[#E00000] animate-pulse" />
              <h2 className="font-display font-black text-lg uppercase tracking-wider text-zinc-900 dark:text-white">
                My Wishlist ({wishlistItems.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-none transition-colors"
              aria-label="Close Wishlist"
              id="close-wishlist-btn"
            >
              <X size={20} />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistItems.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900/10 p-6 border border-zinc-150 dark:border-zinc-800/60">
                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-none flex items-center justify-center mb-4">
                  <Heart size={24} className="text-zinc-400" />
                </div>
                <h3 className="font-display font-bold text-base text-zinc-800 dark:text-neutral-200 mb-1">Your wishlist is empty</h3>
                <p className="text-xs text-zinc-500 max-w-[240px] leading-relaxed mb-6">
                  Save pieces you love to buy them later or monitor size restock updates!
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black hover:bg-[#E00000] hover:text-white dark:hover:bg-[#E00000] dark:hover:text-white text-xs font-display font-bold uppercase tracking-widest rounded-none transition-colors"
                >
                  Discover Denim
                </button>
              </div>
            ) : (
              wishlistItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-3 bg-zinc-55 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-900 rounded-none transition-all"
                  id={`wishlist-item-${item.id}`}
                >
                  <div className="w-16 aspect-3/4 rounded-none overflow-hidden bg-neutral-100 dark:bg-zinc-950 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-bold text-xs md:text-sm text-zinc-900 dark:text-white line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-zinc-400 mt-0.5 uppercase tracking-wide">
                        {item.fit || item.category}
                      </p>
                      <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white block mt-1.5 font-black">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => onMoveToCart(item)}
                        className="flex-grow py-1.5 bg-black dark:bg-white text-white dark:text-zinc-950 hover:bg-[#E00000] hover:text-white dark:hover:bg-[#E00000] dark:hover:text-white text-[10px] font-display font-bold uppercase tracking-wider rounded-none flex items-center justify-center gap-1 transition-all duration-200"
                        id={`wishlist-move-btn-${item.id}`}
                      >
                        <ShoppingCart size={11} />
                        Move To Cart
                      </button>
                      <button
                        onClick={() => onRemoveFromWishlist(item)}
                        className="text-zinc-405 hover:text-[#E00000] hover:bg-red-50 dark:hover:bg-red-955/20 p-2 rounded-none transition-colors"
                        title="Delete from Wishlist"
                        id={`wishlist-remove-btn-${item.id}`}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
