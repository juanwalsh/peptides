import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, ShieldAlert, Hexagon, ArrowRight, Loader2, Check, Globe, ChevronDown, PackageCheck, Minus, Plus, AlertCircle } from 'lucide-react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './constants';
import { COUNTRIES, CountryData } from './data_countries';
import { CONFIG } from './config';
import { sanitizeInput, validateCheckoutForm, ValidationErrors } from './utils/validation';

// --- Pages ---
import HomePage from './pages/Home';
import CatalogPage from './pages/Catalog';
import ProductDetailPage from './pages/ProductDetail';
import PublicCoasPage from './pages/PublicCoas';
import TestimonialsPage from './pages/Testimonials';
import DeliveryInfoPage from './pages/DeliveryInfo';

// --- 404 Page ---
const NotFoundPage = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center max-w-screen-2xl mx-auto px-6 animate-in fade-in duration-500">
    <div className="text-center">
      <h1 className="text-8xl font-display font-medium text-carbon-200 mb-4">404</h1>
      <h2 className="text-3xl font-display font-medium text-carbon-900 mb-4">Page Not Found</h2>
      <p className="text-carbon-500 mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/" className="px-6 py-3 bg-carbon-900 text-white text-sm font-medium uppercase tracking-widest hover:bg-signal-600 transition-colors">
          Go Home
        </Link>
        <Link to="/catalog" className="px-6 py-3 border border-carbon-200 text-carbon-900 text-sm font-medium uppercase tracking-widest hover:border-carbon-900 transition-colors">
          Browse Catalog
        </Link>
      </div>
    </div>
  </div>
);

// --- Skeleton Component ---
const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-carbon-100 rounded ${className}`} />
);

const ProductCardSkeleton = () => (
  <div className="bg-white border border-carbon-200 p-5 md:p-8 flex flex-col justify-between h-full">
    <div>
      <div className="flex justify-between items-start mb-6">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-8 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-6" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-8" />
    </div>
    <div className="flex items-center justify-between border-t border-carbon-100 pt-6">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  </div>
);

// --- Context ---
interface ToastContextType {
  showToast: (message: string) => void;
}
const ToastContext = createContext<ToastContextType>({} as ToastContextType);
export const useToast = () => useContext(ToastContext);

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);
export const useCart = () => useContext(CartContext);

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// IMPROVED TOAST COMPONENT WITH ANIMATION STATES
const Toast = ({ message, isExiting, onClose }: { message: string; isExiting: boolean; onClose: () => void }) => (
  <div 
    className={`fixed top-24 right-6 z-[100] flex items-center space-x-4 bg-carbon-950 text-white px-6 py-4 rounded-sm shadow-2xl border border-carbon-800 transform transition-all duration-500 ease-in-out ${
      isExiting 
        ? 'opacity-0 -translate-y-4' // Exit state
        : 'opacity-100 translate-y-0 animate-in slide-in-from-top-4 fade-in duration-300' // Enter state
    }`}
  >
    <div className="flex items-center space-x-3">
        <Check className="w-5 h-5 text-emerald-400" />
        <span className="text-sm font-medium tracking-wide">{message}</span>
    </div>
    
    {message.includes("Added") && (
        <Link 
            to="/cart" 
            className="ml-6 text-[10px] font-mono uppercase tracking-widest text-carbon-300 hover:text-white border-b border-carbon-600 hover:border-white pb-0.5 transition-colors"
        >
            View Cart
        </Link>
    )}
  </div>
);

const ShippingWarningModal = ({ 
  isOpen, 
  onClose, 
  onProceed, 
  remainingAmount 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onProceed: () => void; 
  remainingAmount: number;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-carbon-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-carbon-200 shadow-2xl w-full max-w-md p-8 relative animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 rounded-sm">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="bg-signal-50 p-4 rounded-full mb-4">
             <PackageCheck className="w-8 h-8 text-signal-600" />
          </div>
          <h3 className="text-xl font-display font-medium text-carbon-900">Shipping Threshold Alert</h3>
          <p className="text-sm text-carbon-600 mt-3 leading-relaxed">
            You are only <span className="font-bold text-carbon-900">${remainingAmount.toFixed(2)}</span> away from complimentary priority shipping. 
            Would you like to add more research materials to your requisition?
          </p>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={onClose} 
            className="w-full bg-carbon-900 text-white py-4 text-sm font-medium hover:bg-signal-600 transition-colors uppercase tracking-widest shadow-md"
          >
            No, Shop More Items
          </button>
          <button 
            onClick={onProceed} 
            className="w-full bg-white border border-carbon-200 text-carbon-600 py-4 text-sm font-medium hover:text-carbon-900 hover:border-carbon-900 transition-colors uppercase tracking-widest"
          >
            Yes, Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

const DisclaimerBanner = () => (
  <div className="bg-carbon-950 text-carbon-300 px-4 py-3 text-[10px] uppercase tracking-widest font-mono flex items-center justify-center border-b border-carbon-800 relative z-[60]">
    <ShieldAlert className="w-3 h-3 mr-3 text-signal-500" />
    <span>Strictly for Research Use Only. Not for human consumption.</span>
  </div>
);

const Footer = () => (
  <footer className="bg-white border-t border-carbon-200 pt-20 pb-12">
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center space-x-2 mb-6 group">
            <Hexagon className="w-6 h-6 text-carbon-900 group-hover:text-signal-600 transition-colors stroke-1" />
            <span className="text-xl font-display font-medium tracking-tight text-carbon-900">BioSynth</span>
          </Link>
          <p className="text-carbon-500 text-sm leading-relaxed max-w-md font-light">
            Providing high-fidelity research materials to the global scientific community. 
            We operate with transparency, rigor, and an uncompromising commitment to data.
          </p>
        </div>
        
        <div>
          <h4 className="font-mono text-xs text-carbon-400 uppercase tracking-widest mb-6">Directory</h4>
          <ul className="space-y-4">
            <li><Link to="/catalog" className="text-carbon-900 hover:text-signal-600 text-sm transition-colors">Catalog</Link></li>
            <li><Link to="/coas" className="text-carbon-900 hover:text-signal-600 text-sm transition-colors">Public CoAs</Link></li>
            <li><Link to="/delivery" className="text-carbon-900 hover:text-signal-600 text-sm transition-colors">Shipping Info</Link></li>
            <li><Link to="/testimonials" className="text-carbon-900 hover:text-signal-600 text-sm transition-colors">Testimonials</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-mono text-xs text-carbon-400 uppercase tracking-widest mb-6">Compliance</h4>
          <ul className="space-y-4">
            <li><span className="text-carbon-500 text-sm cursor-not-allowed">Terms of Sale</span></li>
            <li><span className="text-carbon-500 text-sm cursor-not-allowed">Privacy Policy</span></li>
            <li><span className="text-carbon-500 text-sm cursor-not-allowed">MSDS Access</span></li>
          </ul>
        </div>
      </div>
      
      <div className="mt-20 pt-8 border-t border-carbon-100 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-carbon-400 font-mono">
        <p>© {new Date().getFullYear()} BioSynth Solutions. GLP Compliant.</p>
        <div className="mt-4 md:mt-0 flex space-x-6">
           <span>ISO 9001:2015</span>
           <span>Research Use Only</span>
        </div>
      </div>
    </div>
  </footer>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-carbon-900' : 'text-carbon-500 hover:text-carbon-900';

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-carbon-100 h-20 transition-all duration-300">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 h-full">
        <div className="flex justify-between items-center h-full">
          
          <Link to="/" className="flex items-center space-x-3 group">
            <Hexagon className="w-8 h-8 text-carbon-900 stroke-1 group-hover:stroke-signal-600 transition-colors" />
            <span className="text-lg font-display font-medium tracking-tight">BioSynth</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            <Link to="/catalog" className={`text-sm font-medium transition-colors ${isActive('/catalog')}`}>
              Catalog
            </Link>
            <Link to="/coas" className={`text-sm font-medium transition-colors ${isActive('/coas')}`}>
              Public CoAs
            </Link>
            <Link to="/delivery" className={`text-sm font-medium transition-colors ${isActive('/delivery')}`}>
              Shipping
            </Link>
            <Link to="/testimonials" className={`text-sm font-medium transition-colors ${isActive('/testimonials')}`}>
              Testimonials
            </Link>
            <div className="h-4 w-px bg-carbon-200 mx-4"></div>
            <Link to="/cart" className="flex items-center space-x-2 group">
              <span className="text-sm font-medium text-carbon-900 group-hover:text-signal-600 transition-colors">Requisition</span>
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-carbon-900 group-hover:text-signal-600 transition-colors stroke-1" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-signal-500"></span>
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-carbon-900">
              {isOpen ? <X className="w-6 h-6 stroke-1" /> : <Menu className="w-6 h-6 stroke-1" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-carbon-100 absolute w-full px-6 py-8 shadow-xl animate-in slide-in-from-top-10 duration-200">
          <div className="flex flex-col space-y-6">
            <Link to="/" className="text-2xl font-display text-carbon-900" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/catalog" className="text-2xl font-display text-carbon-900" onClick={() => setIsOpen(false)}>Catalog</Link>
            <Link to="/coas" className="text-2xl font-display text-carbon-900" onClick={() => setIsOpen(false)}>Public CoAs</Link>
            <Link to="/delivery" className="text-2xl font-display text-carbon-900" onClick={() => setIsOpen(false)}>Shipping Info</Link>
            <Link to="/testimonials" className="text-2xl font-display text-carbon-900" onClick={() => setIsOpen(false)}>Testimonials</Link>
            <Link to="/cart" className="text-2xl font-display text-carbon-900" onClick={() => setIsOpen(false)}>Requisition ({totalItems})</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showShippingWarning, setShowShippingWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountryData, setSelectedCountryData] = useState<CountryData | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; discount: number; label: string } | null>(null);
  const [discountError, setDiscountError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    zip: '',
    country: ''
  });

  // Calculate subtotal
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Calculate total items
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate volume discount
  const volumeDiscount = CONFIG.VOLUME_DISCOUNTS.find(tier => totalItems >= tier.minQty);
  const volumeDiscountAmount = volumeDiscount ? subtotal * volumeDiscount.discount : 0;

  // Apply coupon discount (on top of volume discount)
  const couponDiscountAmount = appliedDiscount ? (subtotal - volumeDiscountAmount) * appliedDiscount.discount : 0;

  // Subtotal after discounts
  const discountedSubtotal = subtotal - volumeDiscountAmount - couponDiscountAmount;

  const isFreeShipping = discountedSubtotal >= CONFIG.FREE_SHIPPING_THRESHOLD;
  const shippingCost = selectedCountryData
    ? (isFreeShipping ? 0 : selectedCountryData.cost)
    : 0;

  const total = discountedSubtotal + shippingCost;

  // Handle discount code application
  const handleApplyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    const discountInfo = CONFIG.DISCOUNT_CODES[code];

    if (discountInfo) {
      setAppliedDiscount({ code, ...discountInfo });
      setDiscountError('');
      setDiscountCode('');
    } else {
      setDiscountError('Invalid discount code');
      setAppliedDiscount(null);
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    setDiscountError('');
  };

  // Shipping warning logic: Close enough is defined as within threshold of the limit
  const remainingForFreeShipping = CONFIG.FREE_SHIPPING_THRESHOLD - discountedSubtotal;
  const isCloseToFreeShipping = remainingForFreeShipping > 0 && remainingForFreeShipping <= CONFIG.SHIPPING_WARNING_THRESHOLD;

  const handleInitiateCheckout = () => {
    if (isCloseToFreeShipping) {
      setShowShippingWarning(true);
    } else {
      setShowCheckout(true);
    }
  };

  const handleWarningProceed = () => {
    setShowShippingWarning(false);
    setShowCheckout(true);
  };

  const handleWarningShopMore = () => {
    setShowShippingWarning(false);
    navigate('/catalog');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);

    setFormData({ ...formData, [name]: sanitizedValue });

    // Clear error for this field when user starts typing
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors({ ...validationErrors, [name]: undefined });
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryName = e.target.value;
    const country = COUNTRIES.find(c => c.name === countryName) || null;
    setSelectedCountryData(country);

    setFormData({ ...formData, country: countryName });

    // Clear country error
    if (validationErrors.country) {
      setValidationErrors({ ...validationErrors, country: undefined });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const errors = validateCheckoutForm(formData);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    if (!selectedCountryData) {
      setValidationErrors({ country: 'Please select a country' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const itemsList = cart.map((item, idx) =>
        `${idx + 1}. ${item.name} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
      ).join('\n');

      const shippingLabel = shippingCost === 0 ? `FREE (Order > $${CONFIG.FREE_SHIPPING_THRESHOLD})` : `$${shippingCost.toFixed(2)}`;

      // Sanitize all form data before sending
      const sanitizedData = {
        firstName: sanitizeInput(formData.firstName),
        lastName: sanitizeInput(formData.lastName),
        email: sanitizeInput(formData.email),
        street: sanitizeInput(formData.street),
        zip: sanitizeInput(formData.zip),
      };

      // Build discount lines
      let discountLines = '';
      if (volumeDiscount) {
        discountLines += `Volume Discount (${volumeDiscount.label}): -$${volumeDiscountAmount.toFixed(2)}\n`;
      }
      if (appliedDiscount) {
        discountLines += `Coupon (${appliedDiscount.code}): -$${couponDiscountAmount.toFixed(2)}\n`;
      }

      // Estimated delivery
      const estimatedDelivery = selectedCountryData?.time || 'To be confirmed';

      const message = `
*New Research Requisition Request*

*Client Details:*
Name: ${sanitizedData.firstName} ${sanitizedData.lastName}
Email: ${sanitizedData.email}
Address: ${sanitizedData.street}, ${sanitizedData.zip}
Country: ${selectedCountryData.name}

*Requisition Items:*
${itemsList}

*Financial Summary:*
Subtotal: $${subtotal.toFixed(2)}
${discountLines}Shipping (${selectedCountryData.region}): ${shippingLabel}
*TOTAL ESTIMATED VALUE:* $${total.toFixed(2)}

*Estimated Delivery:* ${estimatedDelivery}

_This request is for laboratory research use only._
      `.trim();

      const encodedMessage = encodeURIComponent(message);
      window.location.href = `https://wa.me/${CONFIG.WHATSAPP_PHONE}?text=${encodedMessage}`;
      setIsSubmitting(false);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center max-w-screen-2xl mx-auto px-6 animate-in fade-in duration-500">
        <h2 className="text-3xl font-display font-medium text-carbon-900 mb-6">Requisition Empty</h2>
        <Link to="/catalog" className="group flex items-center space-x-2 border-b border-carbon-900 pb-1 hover:border-signal-600 hover:text-signal-600 transition-all">
          <span className="font-mono text-sm uppercase tracking-wide">Access Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-20 pt-32">
      <ShippingWarningModal 
        isOpen={showShippingWarning} 
        onClose={handleWarningShopMore} 
        onProceed={handleWarningProceed}
        remainingAmount={remainingForFreeShipping}
      />

      <div className="flex justify-between items-end mb-12 border-b border-carbon-200 pb-6 animate-in slide-in-from-bottom-2 duration-500">
        <h1 className="text-4xl font-display font-light text-carbon-900">Requisition Review</h1>
        <span className="font-mono text-sm text-carbon-500">{cart.length} LINE ITEMS</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Cart Items List */}
        <div className="lg:col-span-7 space-y-8">
          {cart.map((item, index) => (
            <div
                key={item.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between group py-4 border-b border-carbon-100 last:border-0 animate-in slide-in-from-bottom-3 duration-500 fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Product Icon & Info */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 bg-carbon-50 border border-carbon-100 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Hexagon className="w-8 h-8 text-carbon-300 stroke-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="text-lg font-medium text-carbon-900 group-hover:text-signal-600 transition-colors hover:underline">
                    {item.name}
                  </Link>
                  <p className="text-xs font-mono text-carbon-400 mt-1 uppercase tracking-wider">{item.casNumber} — {item.purity}% Purity</p>
                  <p className="text-xs text-carbon-500 mt-1">${item.price.toFixed(2)} each</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                {/* Quantity Controls */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center bg-carbon-50 border border-carbon-200 rounded-sm">
                     <button
                       onClick={() => updateQuantity(item.id, -1)}
                       className="p-2 text-carbon-500 hover:text-carbon-900 hover:bg-carbon-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                       disabled={item.quantity <= 1}
                     >
                       <Minus className="w-3 h-3" />
                     </button>
                     <span className="font-mono text-sm text-carbon-900 w-8 text-center">{item.quantity}</span>
                     <button
                       onClick={() => updateQuantity(item.id, 1)}
                       className="p-2 text-carbon-500 hover:text-carbon-900 hover:bg-carbon-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                       disabled={item.quantity >= CONFIG.MAX_QUANTITY_PER_ITEM}
                     >
                       <Plus className="w-3 h-3" />
                     </button>
                  </div>
                  {item.quantity >= CONFIG.MAX_QUANTITY_PER_ITEM && (
                    <span className="text-[10px] text-amber-600 font-mono mt-1">Max reached</span>
                  )}
                </div>

                <div className="font-mono text-sm text-carbon-900 w-24 text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs font-mono text-red-400 hover:text-red-600 uppercase tracking-widest border-b border-transparent hover:border-red-600 transition-all ml-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          {/* Discount Code Input */}
          <div className="mt-8 pt-6 border-t border-carbon-200 animate-in fade-in duration-500">
            <label className="font-mono text-xs text-carbon-400 uppercase tracking-widest mb-3 block">Discount Code</label>
            {appliedDiscount ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-800 font-medium">{appliedDiscount.code}</span>
                  <span className="text-xs text-emerald-600">({appliedDiscount.label})</span>
                </div>
                <button onClick={handleRemoveDiscount} className="text-xs text-emerald-600 hover:text-emerald-800 underline">
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={discountCode}
                  onChange={(e) => { setDiscountCode(e.target.value.toUpperCase()); setDiscountError(''); }}
                  className="flex-1 p-3 border border-carbon-200 text-sm font-mono bg-white placeholder:text-carbon-400 outline-none rounded-sm focus:border-carbon-900 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleApplyDiscount}
                  className="px-4 py-3 bg-carbon-900 text-white text-xs font-medium uppercase tracking-widest hover:bg-signal-600 transition-colors rounded-sm"
                >
                  Apply
                </button>
              </div>
            )}
            {discountError && <p className="text-xs text-red-500 mt-2 font-mono">{discountError}</p>}
          </div>

          {/* Pricing Summary */}
          <div className="mt-8 pt-8 border-t border-carbon-900 animate-in fade-in duration-700 delay-300">
             <div className="flex justify-between items-center mb-2">
                <span className="font-display text-lg text-carbon-600">Subtotal</span>
                <span className="font-mono text-lg text-carbon-600">${subtotal.toFixed(2)}</span>
             </div>

             {/* Volume Discount */}
             {volumeDiscount && (
                <div className="flex justify-between items-center mb-2 animate-in fade-in duration-300">
                    <span className="font-display text-sm text-emerald-600 flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Volume Discount ({volumeDiscount.label})
                    </span>
                    <span className="font-mono text-lg text-emerald-600">-${volumeDiscountAmount.toFixed(2)}</span>
                </div>
             )}

             {/* Coupon Discount */}
             {appliedDiscount && (
                <div className="flex justify-between items-center mb-2 animate-in fade-in duration-300">
                    <span className="font-display text-sm text-emerald-600 flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Coupon ({appliedDiscount.code})
                    </span>
                    <span className="font-mono text-lg text-emerald-600">-${couponDiscountAmount.toFixed(2)}</span>
                </div>
             )}

             {selectedCountryData && (
                <>
                  <div className="flex justify-between items-center mb-2 animate-in fade-in duration-300">
                      <span className="font-display text-sm text-carbon-500 flex items-center">
                          Shipping to {selectedCountryData.name}
                      </span>
                      <span className={`font-mono text-lg ${isFreeShipping ? 'text-emerald-600' : 'text-carbon-600'}`}>
                          {isFreeShipping ? 'Waived' : `$${shippingCost.toFixed(2)}`}
                      </span>
                  </div>
                  {selectedCountryData.time && (
                    <div className="flex justify-between items-center mb-2 text-xs">
                        <span className="font-mono text-carbon-400 uppercase tracking-widest">Est. Delivery</span>
                        <span className="font-mono text-carbon-600">{selectedCountryData.time}</span>
                    </div>
                  )}
                </>
             )}

             <div className="flex justify-between items-center mt-4 pt-4 border-t border-carbon-100">
                <span className="font-display text-xl text-carbon-900 font-medium">Total Estimate</span>
                <span className="font-mono text-2xl text-carbon-900">${total.toFixed(2)}</span>
             </div>

             {/* Free Shipping Progress */}
             {!isFreeShipping && (
                 <p className="text-xs text-right text-carbon-400 mt-2 font-mono">
                    Spend ${remainingForFreeShipping.toFixed(2)} more for free global shipping.
                 </p>
             )}

             {/* Volume discount hint */}
             {!volumeDiscount && totalItems < 5 && (
                 <p className="text-xs text-right text-signal-600 mt-2 font-mono">
                    Add {5 - totalItems} more item{5 - totalItems > 1 ? 's' : ''} to get 5% off!
                 </p>
             )}
          </div>
        </div>

        {/* Checkout Form */}
        <div className="lg:col-span-5">
           {!showCheckout ? (
              <div className="bg-carbon-50 p-8 rounded-sm border border-carbon-200 sticky top-32 animate-in fade-in slide-in-from-right-4 duration-700">
                <p className="text-sm text-carbon-500 leading-relaxed mb-8">
                  By proceeding, you certify that these materials are for laboratory research use only and will not be used for any other purpose.
                </p>
                <button 
                  onClick={handleInitiateCheckout}
                  className="w-full bg-carbon-900 text-white px-8 py-5 text-sm font-medium hover:bg-signal-600 transition-colors uppercase tracking-wider shadow-sm hover:shadow-md"
                >
                  Initiate PO Process
                </button>
              </div>
           ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 border border-carbon-200 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 sticky top-32">
                 <div className="flex items-center mb-8">
                   <button
                     type="button"
                     onClick={() => setShowCheckout(false)}
                     className="flex items-center text-carbon-500 hover:text-carbon-900 transition-colors mr-4"
                   >
                     <ArrowRight className="w-4 h-4 rotate-180 mr-2" />
                   </button>
                   <h3 className="font-display text-2xl text-carbon-900">Request Details</h3>
                 </div>
                 
                 {isFreeShipping && (
                   <div className="mb-8 bg-emerald-50 border border-emerald-100 p-4 flex items-center space-x-3 rounded-sm animate-in zoom-in-95 duration-300">
                      <PackageCheck className="w-6 h-6 text-emerald-600" />
                      <div>
                        <p className="text-sm font-medium text-emerald-900">Global Shipping Waived</p>
                        <p className="text-xs text-emerald-700">Your order qualifies for free priority shipping.</p>
                      </div>
                   </div>
                 )}

                 <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                       <div>
                         <input
                           required
                           name="firstName"
                           placeholder="First Name"
                           value={formData.firstName}
                           onChange={handleInputChange}
                           className={`w-full p-4 border text-base font-light text-carbon-900 bg-white placeholder:text-carbon-400 outline-none rounded-sm transition-colors ${validationErrors.firstName ? 'border-red-500 focus:border-red-600' : 'border-carbon-200 focus:border-carbon-900'}`}
                         />
                         {validationErrors.firstName && (
                           <p className="text-xs text-red-500 mt-1 font-mono">{validationErrors.firstName}</p>
                         )}
                       </div>
                       <div>
                         <input
                           required
                           name="lastName"
                           placeholder="Last Name"
                           value={formData.lastName}
                           onChange={handleInputChange}
                           className={`w-full p-4 border text-base font-light text-carbon-900 bg-white placeholder:text-carbon-400 outline-none rounded-sm transition-colors ${validationErrors.lastName ? 'border-red-500 focus:border-red-600' : 'border-carbon-200 focus:border-carbon-900'}`}
                         />
                         {validationErrors.lastName && (
                           <p className="text-xs text-red-500 mt-1 font-mono">{validationErrors.lastName}</p>
                         )}
                       </div>
                    </div>
                    <div>
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-4 border text-base font-light text-carbon-900 bg-white placeholder:text-carbon-400 outline-none rounded-sm transition-colors ${validationErrors.email ? 'border-red-500 focus:border-red-600' : 'border-carbon-200 focus:border-carbon-900'}`}
                      />
                      {validationErrors.email && (
                        <p className="text-xs text-red-500 mt-1 font-mono">{validationErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <input
                        required
                        name="street"
                        placeholder="Street Address"
                        value={formData.street}
                        onChange={handleInputChange}
                        className={`w-full p-4 border text-base font-light text-carbon-900 bg-white placeholder:text-carbon-400 outline-none rounded-sm transition-colors ${validationErrors.street ? 'border-red-500 focus:border-red-600' : 'border-carbon-200 focus:border-carbon-900'}`}
                      />
                      {validationErrors.street && (
                        <p className="text-xs text-red-500 mt-1 font-mono">{validationErrors.street}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                       <div>
                         <div className="relative">
                           <select
                             required
                             name="country"
                             value={formData.country}
                             onChange={handleCountryChange}
                             className={`w-full p-4 pr-10 border text-base font-light text-carbon-900 bg-white outline-none appearance-none rounded-sm transition-colors cursor-pointer ${validationErrors.country ? 'border-red-500 focus:border-red-600' : 'border-carbon-200 focus:border-carbon-900'}`}
                           >
                             <option value="" disabled>Select Country</option>
                             {COUNTRIES.map((c) => (
                               <option key={c.name} value={c.name}>
                                 {c.name}
                               </option>
                             ))}
                           </select>
                           <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-carbon-400 pointer-events-none" />
                         </div>
                         {validationErrors.country && (
                           <p className="text-xs text-red-500 mt-1 font-mono">{validationErrors.country}</p>
                         )}
                       </div>

                       <div>
                         <input
                           required
                           name="zip"
                           placeholder="Zip Code"
                           value={formData.zip}
                           onChange={handleInputChange}
                           className={`w-full p-4 border text-base font-light text-carbon-900 bg-white placeholder:text-carbon-400 outline-none rounded-sm transition-colors ${validationErrors.zip ? 'border-red-500 focus:border-red-600' : 'border-carbon-200 focus:border-carbon-900'}`}
                         />
                         {validationErrors.zip && (
                           <p className="text-xs text-red-500 mt-1 font-mono">{validationErrors.zip}</p>
                         )}
                       </div>
                    </div>

                    {/* Estimated Delivery Display */}
                    {selectedCountryData && selectedCountryData.time && (
                      <div className="bg-carbon-50 border border-carbon-200 p-4 rounded-sm flex items-center justify-between animate-in fade-in duration-300">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-carbon-500" />
                          <span className="text-sm text-carbon-600">Estimated Delivery to {selectedCountryData.name}</span>
                        </div>
                        <span className="text-sm font-medium text-carbon-900">{selectedCountryData.time}</span>
                      </div>
                    )}
                 </div>

                 <button
                   type="submit"
                   disabled={isSubmitting}
                   className="w-full mt-8 bg-signal-600 text-white px-8 py-5 text-sm font-medium hover:bg-signal-900 transition-colors uppercase tracking-wider flex items-center justify-center disabled:opacity-50 rounded-sm shadow-sm"
                 >
                   {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Request"}
                 </button>
                 <button 
                   type="button" 
                   onClick={() => setShowCheckout(false)}
                   className="w-full mt-4 text-xs text-carbon-500 underline hover:text-carbon-900 text-center"
                 >
                   Cancel
                 </button>
              </form>
           )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  // Load cart from localStorage on mount
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('biosynth_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      return [];
    }
  });

  // Use a state object to manage the message AND the visual visibility separately for animations
  const [toastState, setToastState] = useState<{ message: string | null; isExiting: boolean }>({ message: null, isExiting: false });

  // Refs to store timer IDs for cleanup
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);
  const toastExitTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('biosynth_cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cart]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (toastExitTimerRef.current) clearTimeout(toastExitTimerRef.current);
    };
  }, []);

  const showToast = (message: string) => {
    // Clear any existing timers
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    if (toastExitTimerRef.current) clearTimeout(toastExitTimerRef.current);

    // 1. Reset state instantly to show new message
    setToastState({ message, isExiting: false });

    // 2. Schedule exit animation trigger
    toastTimerRef.current = setTimeout(() => {
        setToastState(prev => prev.message ? { ...prev, isExiting: true } : prev);

        // 3. Remove from DOM after exit animation completes
        toastExitTimerRef.current = setTimeout(() => {
            setToastState({ message: null, isExiting: false });
        }, CONFIG.TOAST_EXIT_ANIMATION);
    }, CONFIG.TOAST_DURATION);
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added ${quantity}x ${product.name} to Requisition`);
  };

  const updateQuantity = (productId: string, delta: number) => {
      setCart(prev => prev.map(item => {
          if (item.id === productId) {
              const newQty = item.quantity + delta;
              if (newQty < 1) return item; // Prevent going below 1, user must use 'Remove' button
              if (newQty > CONFIG.MAX_QUANTITY_PER_ITEM) return item; // Prevent exceeding max
              return { ...item, quantity: newQty };
          }
          return item;
      }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalItems }}>
        <HashRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-signal-100 selection:text-signal-900">
            {toastState.message && (
                <Toast 
                    message={toastState.message} 
                    isExiting={toastState.isExiting}
                    onClose={() => setToastState({ message: null, isExiting: false })} 
                />
            )}
            <DisclaimerBanner />
            <Navbar />
            <main className="flex-grow pt-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/coas" element={<PublicCoasPage />} />
                <Route path="/delivery" element={<DeliveryInfoPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </CartContext.Provider>
    </ToastContext.Provider>
  );
}