import React, { useState, useEffect } from 'react';
import { PRODUCTS, REVIEWS } from './data/products';
import { Product, CartItem } from './types';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Filters from './components/Filters';
import ProductCard from './components/ProductCard';
import ProductQuickView from './components/ProductQuickView';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';
import BrandStory from './components/BrandStory';
import Reviews from './components/Reviews';
import InstagramGallery from './components/InstagramGallery';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

// Icons
import { Sparkles, ArrowRight, Star, Shirt, CheckCircle, Percent, Zap } from 'lucide-react';

const CATEGORIES = ["Men", "Women", "New Arrivals", "Denim Collection", "Accessories", "Sale"];

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFit, setSelectedFit] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");

  // Drawer & Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart & Wishlist persistence with state initializers
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('levis_cart_v1');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('levis_wishlist_v1');
    return saved ? JSON.parse(saved) : [];
  });

  // Simulation values passed from Cart Drawer checkout button
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("NONE");
  const [toastMessage, setToastMessage] = useState("");

  // Sync to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('levis_cart_v1', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('levis_wishlist_v1', JSON.stringify(wishlist));
  }, [wishlist]);

  // Dark light mode setup
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Toast notifier helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // CART HANDLERS
  const handleAddToCart = (product: Product, size: string, color: { name: string; hex: string }) => {
    const itemId = `${product.id}-${size}-${color.name}`;
    
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === itemId);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, {
          id: itemId,
          product,
          quantity: 1,
          selectedSize: size,
          selectedColor: color
        }];
      }
    });

    showToast(`Successfully added 501® ${product.name} (${size}, ${color.name}) to your Shopping Bag!`);
  };

  const handleUpdateCartQty = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCart((prev) => prev.map((item) => item.id === itemId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast("Removed piece from your shopping cart.");
  };

  const handleOpenCheckout = (discountPct: number, code: string) => {
    setAppliedDiscount(discountPct);
    setDiscountCode(code);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    // Clear cart on successful simulation checkout
    setCart([]);
    showToast("🎉 Order placed successfully! Check your email for shipping tracking detail.");
  };

  // WISHLIST HANDLERS
  const handleToggleWishlist = (product: Product) => {
    const isSaved = wishlist.some((item) => item.id === product.id);
    if (isSaved) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast("Removed from wishlist favorites.");
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast("💙 Added timeless piece to your Wishlist Favorites!");
    }
  };

  const handleMoveWishlistToCart = (product: Product) => {
    const defaultSize = product.sizes[0] || "Standard";
    const defaultColor = product.colors[0] || { name: "Default", hex: "#CCCCCC" };
    
    handleAddToCart(product, defaultSize, defaultColor);
    // Remove from wishlist
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
  };

  // FILTER LOGIC
  const uniqueFits = Array.from(new Set(PRODUCTS.map((p) => p.fit).filter(Boolean))) as string[];

  const filteredProducts = PRODUCTS.filter((product) => {
    // Category match
    if (activeCategory !== "All") {
      if (product.category !== activeCategory) return false;
    }

    // Fit match
    if (selectedFit !== "All") {
      if (product.fit !== selectedFit) return false;
    }

    // Price match
    if (priceRange !== "All") {
      if (priceRange === "under-50" && product.price >= 50) return false;
      if (priceRange === "50-100" && (product.price < 50 || product.price > 100)) return false;
      if (priceRange === "over-100" && product.price <= 100) return false;
    }

    // Search input match (Matches name, description, category, fit)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      const matchFit = product.fit?.toLowerCase().includes(q) || false;
      if (!matchName && !matchDesc && !matchCat && !matchFit) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === "Price-Low-High") return a.price - b.price;
    if (sortBy === "Price-High-Low") return b.price - a.price;
    if (sortBy === "Best-Rating") return b.rating - a.rating;
    return 0; // Default Featured
  });

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300">
      
      {/* Dynamic Slide notifications toast banner */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 max-w-sm bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 p-4 rounded-xl shadow-2xl border border-zinc-700/50 flex items-center justify-between gap-4 animate-slide-up">
          <div className="flex gap-2 items-center">
            <Zap size={16} className="text-red-500 animate-pulse flex-shrink-0" />
            <p className="text-xs font-mono font-medium leading-tight">{toastMessage}</p>
          </div>
          <button 
            onClick={() => setToastMessage("")} 
            className="text-[10px] font-mono text-zinc-400 hover:text-red-500 hover:scale-105"
          >
            DISMISS
          </button>
        </div>
      )}

      {/* Modern Header Navigation */}
      <Header
        categories={CATEGORIES}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        onSearchClick={(query) => setSearchQuery(query)}
        isDark={isDark}
        toggleTheme={() => setIsDark(!isDark)}
      />

      {/* Cinematic Hero Slider */}
      <Hero 
        onCtaClick={() => {
          const catAnchor = document.getElementById("products-catalog-anchor");
          if (catAnchor) catAnchor.scrollIntoView({ behavior: 'smooth' });
        }} 
      />

      {/* MAIN BODY CONTENTS */}
      <main className="pb-12">
        
        {/* HOMEPAGE SECTION: SEASONAL OFFERS */}
        <section className="bg-red-50 dark:bg-red-950/20 py-12 border-b border-red-150 dark:border-red-900/40 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-zinc-950 text-white rounded-none border-t-4 border-[#E00000] p-6 sm:p-10 relative overflow-hidden flex flex-col lg:flex-row justify-between items-center gap-8 shadow-2xl">
              
              {/* Abs-decor */}
              <div className="absolute right-0 top-0 w-96 h-96 bg-[#E00000] rounded-full blur-3xl opacity-20 pointer-events-none" />
              <div className="absolute left-1/3 bottom-0 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-10 pointer-events-none" />

              <div className="space-y-4 max-w-lg relative z-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E00000] text-[10px] font-mono tracking-widest uppercase rounded-none">
                  <Percent size={14} />
                  <span>LIMITED TIMEOUT OFFER</span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight leading-none italic">
                  MID-SEASON BLUE RUSH: <br/>
                  <span className="text-[#E00000] dark:text-red-500">20% STRETCH SAVINGS</span>
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">
                  Stitch up your summer wardrobe. Take an additional 20% discount on all raw jackets, signature 501® styles, and heavyweight comfort hoodies.
                </p>
                <div className="flex gap-4 items-center justify-center lg:justify-start text-xs font-mono text-zinc-400">
                  <p>✓ Code: <strong className="text-white">LEVIS20</strong></p>
                  <p>•</p>
                  <p>✓ Express Deliveries Included</p>
                </div>
              </div>

              {/* Offer Right interaction graphics/CTA */}
              <div className="flex flex-col items-center p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-none max-w-xs w-full text-center relative z-10">
                <span className="text-[10px] font-mono text-red-400 tracking-widest uppercase">PROMO VOUCHER COPPED</span>
                <p className="font-display font-black text-4xl text-white my-1 tracking-wider italic">20% OFF</p>
                <p className="text-[10px] font-mono text-zinc-300 mb-4">ON ALL PRODUCTS IN SHOPPING BAG</p>
                <button
                  onClick={() => {
                    const grid = document.getElementById("products-catalog-anchor");
                    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 bg-white text-zinc-950 font-display font-black text-xs uppercase tracking-widest rounded-none hover:bg-[#E00000] hover:text-white transition-all duration-300"
                >
                  SHOP SEASON OFFERS
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* HOMEPAGE SECTION: TRENDING COLLECTIONS */}
        <section className="py-20 bg-white dark:bg-zinc-950 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center md:text-left mb-12">
              <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-zinc-900 dark:text-white leading-none mb-2">
                COP TRENDING LOOKS
              </h2>
              <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                POPULAR STREETWEAR STYLES CRITICAL TO DAILY OUTLINES
              </p>
            </div>

            {/* Collection bento style grid with sharp edges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Collection Card 1 */}
              <div 
                onClick={() => {
                  setActiveCategory("Denim Collection");
                  document.getElementById("products-catalog-anchor")?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative h-96 rounded-none border border-zinc-200 dark:border-zinc-800 overflow-hidden cursor-pointer shadow-md bg-stone-100"
              >
                <img 
                  src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600" 
                  alt="Denim Jeans Category shot" 
                  className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-[#E00000] font-black">1873 BLUEPRINTS</span>
                  <p className="font-display font-black text-xl uppercase italic">DENIM ESSENTIALS</p>
                  <p className="text-xs text-neutral-300 font-sans font-light group-hover:underline flex items-center gap-1">
                    Explore classic 501® & flare fits <ArrowRight size={12} />
                  </p>
                </div>
              </div>

              {/* Collection Card 2 */}
              <div 
                onClick={() => {
                  setActiveCategory("Women");
                  document.getElementById("products-catalog-anchor")?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative h-96 rounded-none border border-zinc-200 dark:border-zinc-800 overflow-hidden cursor-pointer shadow-md bg-stone-100"
              >
                <img 
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600" 
                  alt="Women collection model" 
                  className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-[#E00000] font-black">STREET REDEFINED</span>
                  <p className="font-display font-black text-xl uppercase italic">WOMEN OUTLINES</p>
                  <p className="text-xs text-neutral-300 font-sans font-light group-hover:underline flex items-center gap-1">
                    Explore high rises & oversized truckers <ArrowRight size={12} />
                  </p>
                </div>
              </div>

              {/* Collection Card 3 */}
              <div 
                onClick={() => {
                  setActiveCategory("New Arrivals");
                  document.getElementById("products-catalog-anchor")?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative h-96 rounded-none border border-zinc-200 dark:border-zinc-800 overflow-hidden cursor-pointer shadow-md bg-stone-100"
              >
                <img 
                  src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600" 
                  alt="Mens outerwear truckers" 
                  className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-[#E00000] font-black">FRESH DROPS</span>
                  <p className="font-display font-black text-xl uppercase italic">SEASON TRUCKERS</p>
                  <p className="text-xs text-neutral-300 font-sans font-light group-hover:underline flex items-center gap-1">
                    Examine newly copped layers <ArrowRight size={12} />
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* INTEGRATED E-COMMERCE PRODUCTS CATALOG SECTION */}
        <section className="py-12 bg-white dark:bg-zinc-950 scroll-mt-20 transition-colors" id="products-catalog-anchor">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header / Intro section with quantity of filtered item shown */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-display font-black uppercase text-zinc-900 dark:text-white leading-none">
                  THE WARDROBE CATALOG
                </h2>
                <p className="text-xs text-zinc-400 font-mono mt-1.5 uppercase">
                  {filteredProducts.length} Premium pieces match your active selectors
                </p>
              </div>
            </div>

            {/* Filtering control sliders */}
            <div className="mb-10">
              <Filters
                categories={CATEGORIES}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                selectedFit={selectedFit}
                setSelectedFit={setSelectedFit}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                sortBy={sortBy}
                setSortBy={setSortBy}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                availableFits={uniqueFits}
              />
            </div>

            {/* Catalog Grid column cards */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 max-w-xl mx-auto">
                <Shirt size={48} className="text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                <h3 className="font-display font-black uppercase text-base text-zinc-900 dark:text-white mb-1">
                  NO TIMING PIECES DETECTED
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-450 mb-6 leading-relaxed">
                  We don't have matching denim garments right now. Try resetting filters or adjust the keyword queries to view full offerings!
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSelectedFit("All");
                    setPriceRange("All");
                    setSearchQuery("");
                    setSortBy("Featured");
                  }}
                  className="px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black uppercase text-xs font-mono font-bold tracking-wider rounded hover:bg-[#E31837] hover:text-white dark:hover:bg-[#E31837] dark:hover:text-white transition-all"
                >
                  DISCOVER ALL DENIM RANGE
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleToggleWishlist}
                    isWishlisted={wishlist.some((item) => item.id === product.id)}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}

          </div>
        </section>

        {/* BRAND STORY DISPLAY SECTION */}
        <BrandStory />

        {/* CUSTOMER TESTIMONIAL REVIEWS SECTION */}
        <Reviews initialReviews={REVIEWS} />

        {/* INSTAGRAM LOOKBOOK PORTAL SHOWCASE */}
        <InstagramGallery />

        {/* INTERACTIVE NEWSLETTER FORM SIGNUP */}
        <Newsletter />

      </main>

      {/* FOOTER BAR NAVIGATION */}
      <Footer setActiveCategory={setActiveCategory} />

      {/* DRAWERS: Shopping Cart Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleOpenCheckout}
      />

      {/* DRAWERS: Wishlist Favorite items Panel */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveWishlistToCart}
      />

      {/* DIALOGS: Product detailed interactive Quick View */}
      <ProductQuickView
        isOpen={quickViewProduct !== null}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.some((item) => item.id === quickViewProduct.id) : false}
      />

      {/* DIALOGS: Checkout simulator and Stripe mock payment form */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        appliedDiscount={appliedDiscount}
        discountCode={discountCode}
        onOrderSuccess={handleOrderSuccess}
      />

    </div>
  );
}
