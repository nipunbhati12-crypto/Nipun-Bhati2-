import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSuccess(true);
  };

  return (
    <section className="py-16 bg-black dark:bg-[#E00000] text-white relative overflow-hidden transition-colors" id="newsletter-signup-section">
      {/* Visual background details */}
      <div className="absolute inset-0 bg-radial-gradient from-zinc-950/20 via-transparent to-transparent opacity-60" />
      <div className="absolute -left-12 -bottom-12 text-[12vw] font-display font-black tracking-tighter text-white/5 uppercase select-none pointer-events-none line-none">
        501 SERIES
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex py-1 px-3 bg-white/10 text-white rounded-none text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase mb-4">
          ✨ LEVI'S COMMODITY CLUB INVITATION
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight mb-4 italic">
          COP 20% OFF YOUR <br className="sm:hidden" /> NEXT COP
        </h2>

        <p className="text-xs sm:text-sm text-zinc-300 font-sans font-light max-w-lg mx-auto mb-8 leading-normal">
          Join our global mailing list. Receive priority drops, exclusive digital restock codes, seasonal lookup catalogues, and 20% off coupon code instant.
        </p>

        {success ? (
          <div className="bg-white/10 backdrop-blur-md p-6 max-w-md mx-auto rounded-none border border-white/20 animate-fade-in text-center space-y-2">
            <div className="w-10 h-10 bg-white text-black dark:text-[#E00000] rounded-none flex items-center justify-center mx-auto mb-2 font-bold select-none">
              <Check size={20} />
            </div>
            <p className="font-display font-black text-lg uppercase tracking-wider">MEMBER ACCOUNT CREATED!</p>
            <p className="text-xs font-mono text-zinc-200">
              Check your inbox for active credentials. Use discount code <strong className="text-yellow-400 bg-white/25 px-1.5 py-0.5 rounded-none">CLUB20</strong> during simulated checkouts.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto justify-center">
            <div className="relative flex-grow">
              <input
                type="email"
                required
                placeholder="Enter email to join..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white border border-white/25 hover:border-white/40 focus:border-white rounded-none text-xs placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white tracking-widest"
              />
              <Mail size={16} className="absolute right-3.5 top-3.5 text-white/50" />
            </div>
            <button
              type="submit"
              className="py-3 px-8 bg-white text-zinc-950 hover:bg-[#E00000] hover:text-white transition-all duration-300 font-display font-black text-xs uppercase tracking-widest rounded-none flex items-center justify-center gap-1"
              id="newsletter-subscribe-btn"
            >
              SUBSCRIBE
            </button>
          </form>
        )}

        <p className="text-[10px] text-zinc-400 uppercase font-mono tracking-widest mt-4">
          NO SPAM • SECURE SUBSCRIPTION • OPT-OUT AT ANY TIME
        </p>
      </div>
    </section>
  );
}
