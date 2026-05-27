import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Lock, CheckCircle2, ShoppingBag, Truck, Gift } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedDiscount: number;
  discountCode: string;
  onOrderSuccess: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  appliedDiscount,
  discountCode,
  onOrderSuccess
}: CheckoutModalProps) {
  const [step, setStep] = useState(1); // 1 = Shipping, 2 = Payment, 3 = Success

  // Form State
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  
  // Card Payment States
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [cardName, setCardName] = useState("");

  const [formErr, setFormErr] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [simulatedOrderID, setSimulatedOrderID] = useState("");

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * (appliedDiscount / 100);
  const shippingCost = subtotal >= 150 ? 0 : 9.99;
  const grandTotal = subtotal - discountAmount + shippingCost;

  const validateShippingForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !address || !city || !zip) {
      setFormErr("Please complete all required fields.");
      return;
    }
    setFormErr("");
    setStep(2);
  };

  const handleCardNumberChange = (value: string) => {
    // Basic formatting for card spaces
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(v);
    }
  };

  const submitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCVC || !cardName) {
      setFormErr("Please fill in your credit card credentials.");
      return;
    }
    setFormErr("");
    setPaymentProcessing(true);

    // Simulate Payment Gateway call
    setTimeout(() => {
      setPaymentProcessing(false);
      const randomID = "LVS-" + Math.floor(100000 + Math.random() * 900000);
      setSimulatedOrderID(randomID);
      setStep(3);
    }, 2500);
  };

  const finishCheckoutSuccess = () => {
    onOrderSuccess();
    onClose();
    // Reset wizard
    setStep(1);
    setEmail("");
    setFirstName("");
    setLastName("");
    setAddress("");
    setCity("");
    setZip("");
    setCardNumber("");
    setCardExpiry("");
    setCardCVC("");
    setCardName("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs" id="checkout-modal-container">
      <div className="relative bg-white dark:bg-zinc-950 w-full max-w-3xl rounded-none border-t-4 border-[#E00000] overflow-hidden shadow-2xl border-x border-b border-zinc-200 dark:border-zinc-800 z-10 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close triggers */}
        {step !== 3 && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 z-20 text-zinc-400 hover:text-[#E00000] rounded-none bg-zinc-200/40 dark:bg-zinc-900/40"
            id="close-checkout-modal"
          >
            <X size={18} />
          </button>
        )}

        {/* Left Side: Order summary details */}
        {step !== 3 && (
          <div className="w-full md:w-5/12 bg-zinc-50 dark:bg-zinc-900/60 p-6 md:p-8 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between overflow-y-auto">
            <div>
              <h3 className="font-display font-black text-sm uppercase tracking-widest text-[#E00000] mb-4">
                Review Order
              </h3>
              
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 text-xs items-center">
                    <img 
                      src={item.product.image} 
                      alt="" 
                      className="w-10 h-14 object-cover rounded-none bg-neutral-200" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-zinc-800 dark:text-neutral-200 truncate">{item.product.name}</p>
                      <p className="text-[10px] text-zinc-400 font-mono">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                    </div>
                    <span className="font-mono text-zinc-700 dark:text-neutral-300">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 mt-6 text-xs text-zinc-650 dark:text-zinc-400 space-y-1.5">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono text-zinc-800 dark:text-neutral-200">${subtotal.toFixed(2)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-700 dark:text-green-400 font-medium">
                  <span className="flex items-center gap-1"><Gift size={12} /> Discount Applied ({discountCode})</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-mono text-zinc-800 dark:text-neutral-200">
                  {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
              <div className="flex justify-between text-sm font-black text-zinc-900 dark:text-white">
                <span>Total Due</span>
                <span className="font-mono text-base font-extrabold text-[#E00000]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Right Side: Interactive wizard stages */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          {step === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Truck size={18} className="text-[#E00000]" />
                <h2 className="font-display font-black text-base uppercase tracking-wider text-zinc-900 dark:text-white">
                  Step 1: Shipping Address
                </h2>
              </div>

              {formErr && (
                <p className="text-xs text-red-600 dark:text-red-400 font-mono italic mb-4">{formErr}</p>
              )}

              <form onSubmit={validateShippingForm} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Email for confirmations *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none text-xs focus:ring-1 focus:ring-[#E00000] focus:outline-none"
                    placeholder="user@example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none text-xs focus:ring-1 focus:ring-[#E00000] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none text-xs focus:ring-1 focus:ring-[#E00000] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none text-xs focus:ring-1 focus:ring-[#E00000] focus:outline-none"
                    placeholder="Apartment, suite, unit, building, street"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none text-xs focus:ring-1 focus:ring-[#E00000] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Zip / Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none text-xs focus:ring-1 focus:ring-[#E00000] focus:outline-none"
                      placeholder="e.g. 94101"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black hover:bg-[#E00000] hover:text-white dark:hover:bg-[#E00000] dark:hover:text-white font-display font-black text-xs uppercase tracking-widest rounded-none transition-colors mt-6"
                  id="checkout-shipping-submit-btn"
                >
                  Continue to Payment
                </button>
              </form>
            </div>
          )}          {step === 2 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <CreditCard size={18} className="text-[#E00000]" />
                <h2 className="font-display font-black text-base uppercase tracking-wider text-zinc-900 dark:text-white">
                  Step 2: Simulated Payments Gateway
                </h2>
              </div>

              {formErr && (
                <p className="text-xs text-red-600 dark:text-red-400 font-mono italic mb-4">{formErr}</p>
              )}

              <form onSubmit={submitPayment} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">NAME ON CREDIT CARD *</label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none text-xs uppercase focus:ring-1 focus:ring-[#E00000] focus:outline-none"
                    placeholder="e.g. MR ALEXANDER LEVI"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">CARD NUMBER *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      placeholder="4000 1234 5678 9520"
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      maxLength={19}
                      className="w-full pl-10 pr-3 py-2 bg-neutral-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none text-xs font-mono focus:ring-1 focus:ring-[#E00000] focus:outline-none"
                    />
                    <CreditCard size={14} className="absolute left-3.5 top-3.5 text-zinc-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">EXPIRY DATE (MM/YY) *</label>
                    <input
                      type="text"
                      required
                      placeholder="12/28"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      maxLength={5}
                      className="w-full px-3 py-2 bg-neutral-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none text-xs font-mono focus:ring-1 focus:ring-[#E00000] focus:outline-none text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">SECURITY CODE / CVC *</label>
                    <input
                      type="password"
                      required
                      placeholder="123"
                      value={cardCVC}
                      maxLength={3}
                      onChange={(e) => setCardCVC(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none text-xs font-mono focus:ring-1 focus:ring-[#E00000] focus:outline-none text-center"
                    />
                  </div>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-none flex items-start gap-2 text-[10px] text-zinc-400 leading-normal font-mono border border-zinc-150 dark:border-zinc-800">
                  <ShieldCheck size={16} className="text-green-600 flex-shrink-0" />
                  <span>Your mock transaction is absolutely secure. No real money or actual card credits are debited here. Safe playground checkout sandbox.</span>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={paymentProcessing}
                    className="px-4 py-3.5 border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 text-xs font-display font-bold uppercase rounded-none hover:bg-neutral-100"
                  >
                    Back Address
                  </button>
                  <button
                    type="submit"
                    disabled={paymentProcessing}
                    id="checkout-payment-submit"
                    className="flex-1 py-3.5 bg-[#E00000] hover:bg-red-700 text-white font-display font-black text-xs uppercase tracking-widest rounded-none flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {paymentProcessing ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        SSL PROCESSING PAYMENTS...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 justify-center">
                        <Lock size={12} />
                        AUTHORIZE MOCK PAY ${grandTotal.toFixed(2)}
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-12 px-4 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-950/40 rounded-none flex items-center justify-center text-green-600 dark:text-green-400 mb-6 scale-110 border border-green-200 dark:border-green-900">
                <CheckCircle2 size={36} />
              </div>

              <h2 className="font-display font-black text-2xl uppercase tracking-wider text-zinc-900 dark:text-white mb-2">
                Order Placed Successfully!
              </h2>

              <p className="text-xs text-zinc-500 font-mono mb-4">
                TRANSACTION VALUE DISPATCHED: <strong className="text-zinc-800 dark:text-white">{simulatedOrderID}</strong>
              </p>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-none w-full max-w-sm mb-8 border border-zinc-200 dark:border-zinc-800 text-left space-y-2">
                <p className="text-xs text-zinc-600 dark:text-zinc-400 text-center border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-2 font-semibold font-sans">
                  Thank you for copping Levi's, {firstName}!
                </p>
                <div className="flex justify-between text-[11px] font-mono text-zinc-505">
                  <span>Shipment to:</span>
                  <span className="text-zinc-800 dark:text-white font-medium">{address}, {city}</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-zinc-505">
                  <span>Voucher Discount:</span>
                  <span className="text-[#E00000] font-semibold">{appliedDiscount > 0 ? `${appliedDiscount}% OFF` : '0%'}</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-zinc-505">
                  <span>SSL Charged:</span>
                  <span className="text-green-700 dark:text-green-400 font-bold">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2.5 w-full max-w-sm">
                <button
                  onClick={finishCheckoutSuccess}
                  className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-zinc-950 font-display font-black text-xs uppercase tracking-wider hover:bg-[#E00000] hover:text-white dark:hover:bg-[#E00000] dark:hover:text-white rounded-none transition-colors shadow-lg"
                  id="checkout-success-continue-btn"
                >
                  Continue Browsing Levi's
                </button>
                <p className="text-[10px] text-zinc-400 font-mono">
                  An receipt invoice and tracking details were dispatched in mock pipeline directly to: {email}
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
