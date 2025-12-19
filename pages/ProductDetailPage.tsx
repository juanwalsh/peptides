import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useCart, useToast } from '../App';
import { FileText, Download, AlertTriangle, CheckCircle, ChevronDown, Microscope, Lock, X, ArrowLeft, Truck, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { COUNTRIES, getShippingEstimate } from '../data_countries';

const PasswordModal = ({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'A7#f9Q!2') {
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-sm shadow-2xl w-full max-w-md p-8 relative animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-carbon-400 hover:text-carbon-900">
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="bg-carbon-50 p-3 rounded-full mb-4">
             <Lock className="w-6 h-6 text-carbon-900" />
          </div>
          <h3 className="text-xl font-display font-medium text-carbon-900">Restricted Access</h3>
          <p className="text-sm text-carbon-500 mt-2">Enter Admin Credentials to access technical documentation.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="password" 
            placeholder="Admin Password"
            value={password}
            onChange={(e) => {setPassword(e.target.value); setError(false);}}
            className={`w-full p-3 border text-sm font-mono outline-none focus:ring-1 ${error ? 'border-red-500 focus:ring-red-500' : 'border-carbon-200 focus:border-carbon-900 focus:ring-carbon-900'}`}
            autoFocus
          />
          {error && <p className="text-xs text-red-500 font-mono">Invalid credentials.</p>}
          <button type="submit" className="w-full bg-carbon-900 text-white py-3 text-sm font-medium hover:bg-signal-600 transition-colors uppercase tracking-widest">
            Authenticate & Download
          </button>
        </form>
      </div>
    </div>
  );
};

// New Component for Shipping Calc
const ShippingCalculator = () => {
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [estimate, setEstimate] = useState<string | null>(null);

    const handleCheck = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const country = e.target.value;
        setSelectedCountry(country);
        if (country) {
            setEstimate(getShippingEstimate(country));
        } else {
            setEstimate(null);
        }
    };

    return (
        <div className="mt-8 border-t border-carbon-100 pt-6">
            <h4 className="flex items-center text-xs font-mono uppercase tracking-widest text-carbon-500 mb-3">
                <Truck className="w-3 h-3 mr-2" />
                Shipping Estimator
            </h4>
            <div className="relative mb-3">
                <select 
                    className="w-full p-2.5 text-xs text-carbon-900 bg-carbon-50 border border-carbon-200 outline-none focus:border-carbon-900 appearance-none rounded-sm"
                    value={selectedCountry}
                    onChange={handleCheck}
                >
                    <option value="" disabled>Select Destination Country</option>
                    {COUNTRIES.map(c => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                </select>
                <ChevronDown className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 text-carbon-400 pointer-events-none" />
            </div>
            
            {estimate && (
                <div className="flex items-start space-x-2 bg-emerald-50 border border-emerald-100 p-3 rounded-sm animate-in fade-in slide-in-from-top-2 duration-300">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                         <p className="text-xs font-medium text-emerald-900">Estimated Arrival</p>
                         <p className="text-xs text-emerald-700">{estimate}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'specs' | 'handling' | 'analysis'>('specs');
  const [qty, setQty] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadType, setDownloadType] = useState<'MSDS' | 'CoA' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  if (!product) return <div className="p-12 text-center text-carbon-500">Product not found.</div>;

  const handleDownloadClick = (type: 'MSDS' | 'CoA') => {
    setDownloadType(type);
    setIsModalOpen(true);
  };

  const handleDownloadSuccess = () => {
    showToast(`${downloadType} Download Started`);
    setDownloadType(null);
  };

  const handleAddToCart = () => {
    setIsAnimating(true);
    addToCart(product, qty);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Mock HPLC Data
  const hplcData = [
    { time: 0, absorbance: 0 },
    { time: 2, absorbance: 5 },
    { time: 4, absorbance: 10 },
    { time: 5, absorbance: 100 },
    { time: 6, absorbance: 15 },
    { time: 8, absorbance: 5 },
    { time: 10, absorbance: 2 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PasswordModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleDownloadSuccess} 
      />

      {/* Header Info */}
      <div className="border-b border-carbon-200 bg-carbon-50">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12 md:py-16 mt-16 lg:mt-0">
           
           {/* Back Button */}
           <button 
             onClick={() => navigate(-1)} 
             className="group flex items-center text-sm font-mono uppercase tracking-widest text-carbon-500 hover:text-carbon-900 transition-colors mb-6"
           >
             <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
             Back to Catalog
           </button>

           <div className="mb-6 flex items-center space-x-2 text-xs font-mono text-carbon-500 uppercase tracking-widest">
              <Link to="/catalog" className="hover:text-carbon-900">Catalog</Link>
              <span>/</span>
              <span>{product.category}</span>
              <span>/</span>
              <span className="text-carbon-900">{product.id}</span>
           </div>
           
           <h1 className="text-4xl md:text-5xl font-display font-medium text-carbon-900 mb-4">{product.name}</h1>
           <p className="font-mono text-carbon-500 text-sm">CAS: <span className="text-carbon-900">{product.casNumber}</span></p>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
             <div className="mb-12">
                <h3 className="text-sm font-mono text-carbon-400 uppercase tracking-widest mb-4">Description</h3>
                <p className="text-lg text-carbon-700 font-light leading-relaxed">{product.description}</p>
             </div>

             {/* Tabs */}
             <div className="border-b border-carbon-200 mb-8 flex space-x-8 overflow-x-auto">
                {(['specs', 'analysis', 'handling'] as const).map((tab) => (
                   <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 text-sm font-medium transition-colors whitespace-nowrap ${
                         activeTab === tab
                            ? 'text-carbon-900 border-b-2 border-carbon-900'
                            : 'text-carbon-400 hover:text-carbon-600'
                      }`}
                   >
                      {tab === 'specs' ? 'Specifications' : tab === 'analysis' ? 'Analytical Data' : 'Handling'}
                   </button>
                ))}
             </div>

             <div className="min-h-[400px]">
                {activeTab === 'specs' && (
                   <div className="bg-white border border-carbon-200 p-8 rounded-sm">
                      <table className="w-full text-sm text-left">
                         <tbody className="divide-y divide-carbon-100">
                            <tr className="group">
                               <td className="py-4 text-carbon-500 font-mono w-1/3">Chemical Name</td>
                               <td className="py-4 text-carbon-900 font-medium">{product.chemicalName}</td>
                            </tr>
                            <tr className="group">
                               <td className="py-4 text-carbon-500 font-mono">Formula</td>
                               <td className="py-4 text-carbon-900 font-mono">{product.formula}</td>
                            </tr>
                            <tr className="group">
                               <td className="py-4 text-carbon-500 font-mono">Molecular Weight</td>
                               <td className="py-4 text-carbon-900">{product.molecularWeight} g/mol</td>
                            </tr>
                            <tr className="group">
                               <td className="py-4 text-carbon-500 font-mono">Sequence</td>
                               <td className="py-4 text-carbon-900 font-mono text-xs">{product.sequence || 'N/A'}</td>
                            </tr>
                            <tr className="group">
                               <td className="py-4 text-carbon-500 font-mono">Form</td>
                               <td className="py-4 text-carbon-900">Lyophilized Powder</td>
                            </tr>
                         </tbody>
                      </table>
                   </div>
                )}

                {activeTab === 'analysis' && (
                   <div className="space-y-8">
                      <div className="border border-carbon-200 p-8 rounded-sm">
                         <div className="flex justify-between items-center mb-6">
                            <h4 className="font-mono text-xs uppercase tracking-widest text-carbon-500">HPLC Chromatogram</h4>
                            <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 border border-emerald-100 uppercase tracking-wide">Pass > {product.purity}%</span>
                         </div>
                         <div className="h-64 w-full">
                           <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={hplcData}>
                                 <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                 <XAxis dataKey="time" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                                 <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                                 <Tooltip 
                                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#1f2937', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                 />
                                 <Line type="monotone" dataKey="absorbance" stroke="#0f172a" strokeWidth={1.5} dot={false} />
                              </LineChart>
                           </ResponsiveContainer>
                         </div>
                      </div>
                   </div>
                )}

                {activeTab === 'handling' && (
                   <div className="prose prose-sm max-w-none text-carbon-600 font-light">
                      <div className="bg-amber-50 border border-amber-100 p-4 mb-6 text-amber-900 text-xs">
                         <p className="font-medium">Safety Precaution</p>
                         <p>Wear protective gloves/clothing/eye protection. Avoid breathing dust.</p>
                      </div>
                      <p className="mb-4"><strong className="text-carbon-900 font-medium">Storage:</strong> {product.storage}.</p>
                      <p className="mb-4"><strong className="text-carbon-900 font-medium">Solubility:</strong> {product.solubility}.</p>
                      <p>For research use only. Reconstitute immediately prior to use for best results.</p>
                   </div>
                )}
             </div>
          </div>

          {/* Sidebar / Actions */}
          <div className="lg:col-span-4">
             <div className="bg-white border border-carbon-200 p-8 sticky top-32 shadow-sm">
                <div className="mb-8 pb-8 border-b border-carbon-100">
                   <div className="flex justify-between items-baseline mb-2">
                      <span className="text-sm text-carbon-500">Total Price</span>
                      {/* Price changes immediately based on qty */}
                      <span className="text-3xl font-display text-carbon-900 font-medium">${(product.price * qty).toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-xs text-carbon-400">
                      <span>Unit Price: ${product.price.toFixed(2)}</span>
                      <span>Excl. Shipping & Tax</span>
                   </div>
                </div>

                <div className="space-y-4 mb-8">
                   <div className="flex items-center justify-between border border-carbon-200 p-2">
                      <button onClick={() => setQty(Math.max(1, qty-1))} className="px-4 py-2 text-carbon-400 hover:text-carbon-900 transition-colors">-</button>
                      <span className="font-mono text-carbon-900">{qty}</span>
                      <button onClick={() => setQty(qty+1)} className="px-4 py-2 text-carbon-400 hover:text-carbon-900 transition-colors">+</button>
                   </div>
                   <button 
                      onClick={handleAddToCart}
                      className={`w-full bg-carbon-900 text-white py-4 text-sm font-medium uppercase tracking-widest hover:bg-signal-600 transition-all duration-200 ${isAnimating ? 'scale-95 bg-signal-600' : 'scale-100'}`}
                   >
                      {isAnimating ? 'Added' : 'Add to Requisition'}
                   </button>
                </div>

                {/* Added Shipping Calculator Here */}
                <ShippingCalculator />
                
                <div className="space-y-3 pt-6 border-t border-carbon-100 mt-6">
                   <button 
                     onClick={() => handleDownloadClick('MSDS')}
                     className="w-full flex items-center justify-between text-xs text-carbon-500 hover:text-carbon-900 border border-transparent hover:border-carbon-200 p-2 transition-all group"
                   >
                      <span className="flex items-center"><FileText className="w-4 h-4 mr-2" /> Download MSDS</span>
                      <Download className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                   </button>
                   <button 
                     onClick={() => handleDownloadClick('CoA')}
                     className="w-full flex items-center justify-between text-xs text-carbon-500 hover:text-carbon-900 border border-transparent hover:border-carbon-200 p-2 transition-all group"
                   >
                      <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Sample CoA</span>
                      <Download className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                   </button>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;