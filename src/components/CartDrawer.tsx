import React, { useState } from 'react';
import { X, Trash2, ShoppingCart, ArrowRight, Lock, Plus, Minus, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: (appliedDiscount: number, discountCode: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [couponError, setCouponError] = useState("");

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingThreshold = 150;
  const freeShipping = subtotal >= shippingThreshold;
  const shippingCost = subtotal === 0 ? 0 : (freeShipping ? 0 : 9.99);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "LEVIS20") {
      setDiscountPercent(20);
      setCouponMsg("Promo Code LEVIS20 applied: 20% discount!");
      setCouponError("");
    } else {
      setCouponError("Invalid voucher code. Try LEVIS20");
      setDiscountPercent(0);
      setCouponMsg("");
    }
  };

  const discountAmount = subtotal * (discountPercent / 100);
  const total = subtotal - discountAmount + shippingCost;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-container">
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
              <ShoppingCart size={20} className="text-[#E00000]" />
              <h2 className="font-display font-black text-lg uppercase tracking-wider text-zinc-900 dark:text-white">
                My Shopping Cart
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors"
              aria-label="Close Cart"
              id="close-cart-btn"
            >
              <X size={20} />
            </button>
          </div>

          {/* Shipping Goal Indicator Progress Bar */}
          {subtotal > 0 && (
            <div className="px-6 py-3.5 bg-red-50 dark:bg-red-950/20 border-b border-red-100 dark:border-red-900/30">
              {freeShipping ? (
                <p className="text-xs font-semibold text-green-700 dark:text-green-400">
                  🎉 Congrats! Your order qualifies for <strong>Free Express Shipping</strong>.
                </p>
              ) : (
                <div className="space-y-1.5">
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    Add <strong className="text-zinc-900 dark:text-white font-bold">${(shippingThreshold - subtotal).toFixed(2)}</strong> more for <strong>Free Express Shipping</strong>!
                  </p>
                  <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-none overflow-hidden">
                    <div 
                      className="h-full bg-[#E00000]" 
                      style={{ width: `${Math.min((subtotal / shippingThreshold) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Drawer Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900/10 p-6 border border-zinc-150 dark:border-zinc-800/60">
                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-none flex items-center justify-center mb-4">
                  <ShoppingCart size={24} className="text-zinc-400" />
                </div>
                <h3 className="font-display font-bold text-base text-zinc-800 dark:text-neutral-200 mb-1">Your cart is empty</h3>
                <p className="text-xs text-zinc-500 max-w-[240px] leading-relaxed mb-6">
                  Add timeless pieces from our latest denim collections to make a confident statement.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black hover:bg-[#E00000] hover:text-white dark:hover:bg-[#E00000] dark:hover:text-white text-xs font-display font-bold uppercase tracking-widest rounded-none transition-colors"
                >
                  Return to Shop
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-3 bg-zinc-55 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-900 rounded-none transition-all"
                  id={`cart-item-row-${item.id}`}
                >
                  <div className="w-20 aspect-3/4 rounded-none overflow-hidden bg-neutral-100 dark:bg-zinc-950 flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-grow flex flex-col">
                    <h4 className="font-display font-bold text-xs md:text-sm text-zinc-900 dark:text-white line-clamp-1">
                      {item.product.name}
                    </h4>
                    
                    <div className="flex items-center gap-2 mt-1 mb-2">
                      <span className="text-[10px] font-mono text-zinc-500 bg-zinc-150 dark:bg-zinc-850 px-1.5 py-0.5 rounded-none">
                        Size: <strong>{item.selectedSize}</strong>
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
                        Color: <span className="w-2 h-2 rounded-none border border-black/10 inline-block" style={{ backgroundColor: item.selectedColor.hex }} /> <strong>{item.selectedColor.name}</strong>
                      </span>
                    </div>

                    <div className="flex justify-between items-end mt-auto">
                      {/* Quantity Selector Counter */}
                      <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-none">
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          className="p-1 px-2 text-zinc-500 hover:text-[#E00000] dark:hover:text-red-450 transition-colors"
                          id={`qty-minus-${item.id}`}
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-xs font-mono font-bold px-2 text-zinc-800 dark:text-zinc-200">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          className="p-1 px-2 text-zinc-500 hover:text-[#E00000] dark:hover:text-red-450 transition-colors"
                          id={`qty-plus-${item.id}`}
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      {/* Line Item Prices & Delete */}
                      <div className="flex items-center gap-2 pb-0.5">
                        <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-zinc-400 hover:text-red-500 dark:hover:text-red-400 p-1.5 rounded-none transition-colors"
                          title="Trash item"
                          id={`qty-remove-${item.id}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Coupon Checkouts */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 spacing-y-4">
                          {/* Promo Coupon inputs */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Tag size={14} className="absolute left-2.5 top-2.5 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="PROMO CODE (e.g. LEVIS20)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs font-mono uppercase bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-none focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                  <button
                    onClick={applyCoupon}
                    className="px-3.5 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black font-display font-extrabold text-[10px] md:text-xs uppercase tracking-widest rounded-none border border-transparent dark:hover:bg-[#E00000] dark:hover:text-white transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponMsg && <p className="text-[10px] text-green-600 dark:text-green-400 font-medium font-mono mt-1">{couponMsg}</p>}
                {couponError && <p className="text-[10px] text-red-600 dark:text-red-400 font-medium font-mono mt-1">{couponError}</p>}
              </div>

              {/* Bill Details Breakdowns */}
              <div className="space-y-1.5 mb-6 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-zinc-900 dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-green-700 dark:text-green-400">
                    <span>Voucher Saved (20%)</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Express Shipping</span>
                  <span className="font-mono text-zinc-900 dark:text-white">
                    {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
                <div className="flex justify-between text-sm font-black text-zinc-900 dark:text-white">
                  <span>Total Amount Due</span>
                  <span className="font-mono text-base font-extrabold text-[#E00000] dark:text-red-500">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Secure Checkout trigger CTA */}
              <button
                onClick={() => onCheckout(discountPercent, couponCode || "NONE")}
                className="w-full py-4 bg-[#E00000] hover:bg-zinc-900 text-white font-display font-black text-xs md:text-sm uppercase tracking-widest rounded-none flex items-center justify-center gap-2 group transition-all duration-300 shadow-xl"
                id="cart-drawer-checkout-btn"
              >
                <Lock size={14} />
                Secure Checkout 
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[10px] text-center text-zinc-400 mt-3 font-mono">
                Locked with 256-Bit SSL protection encryption.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
