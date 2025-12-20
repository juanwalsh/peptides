import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { ProductCategory } from '../types';
import { SlidersHorizontal, Search, X } from 'lucide-react';

// Product sections by use case
const PRODUCT_SECTIONS = {
  'Fat Burn': ['LC600', 'LC1200', '5AM', 'LC216', 'LB', 'AP5', '5AD', '10AD'],
  'Tanning': ['MT1', 'ML10'],
  'Growth & Recovery': ['H10', 'H15', 'CND2', 'CND5', 'CND10', 'CD2', 'CD5', 'IP5', 'IP10', 'G25', 'G210', 'G65', 'G610', 'HX5', 'SMO5', 'SMO10', 'TSM5', 'TSM10', 'IG01', 'IG1', 'FM2', 'FMP2', 'MK15', 'MK20', 'MK25'],
  'Tissue Repair & Healing': ['KLOW', 'BBG70', 'BB10', 'BB20', 'MS10', 'MS40', '2S10', '2S50', 'CU', 'CU100', 'P41'],
  'Metabolic & Longevity': ['NJ100', 'NJ500', 'NJ1000', 'AR50', 'GTT600', 'GTT', 'ET10', 'ET50', 'F410'],
  'Cognitive & Neuroprotective': ['XA5', 'XA10', 'SK5', 'SK10', 'DS5', 'DS10', 'VP10'],
  'Immune & Thymic': ['TA5', 'TA10', 'TY10', 'RA10', '375'],
  'GLP-1 & Weight Management': ['CS10', 'MDT10', 'SUR10'],
  'Hormonal & Reproductive': ['KS5', 'KS10', 'OT2', 'OT5', 'G75', 'ARIM100', 'ARIM200', 'ARIM300', 'ARIM500', 'ARIM1000'],
  'Cosmetic & Anti-Aging': ['NP810', 'KP10', 'DR5'],
  'Research Blends': ['KLOW', 'BBG70', 'BB10', 'BB20', 'CS10', 'CP10'],
  'Solvents & Accessories': ['WA3', 'WA10']
};

const CatalogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [minPurity, setMinPurity] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'sections' | 'grid'>('sections');

  const categories = ['All', ...Object.values(ProductCategory)];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // 1. Category Filter
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      
      // 2. Purity Filter
      const purityMatch = product.purity >= minPurity;

      // 3. Search Query (Name, ID, CAS)
      const query = searchQuery.toLowerCase();
      const searchMatch = 
        product.name.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query) ||
        product.casNumber.toLowerCase().includes(query) ||
        product.chemicalName.toLowerCase().includes(query);

      return categoryMatch && purityMatch && searchMatch;
    });
  }, [selectedCategory, minPurity, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 md:px-12 py-12 md:py-20 border-b border-carbon-100 max-w-screen-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-display font-medium text-carbon-900 mb-6">Inventory</h1>
        <p className="text-carbon-500 font-light max-w-2xl text-lg">
          Browse our database of research-grade peptides and biochemicals. 
          Use the filters to narrow by category or purity specification.
        </p>
      </div>

      {/* Controls */}
      <div className="sticky top-20 z-40 bg-white/90 backdrop-blur border-b border-carbon-200">
         <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Bar */}
            <div className="relative flex-grow max-w-lg">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-carbon-400" />
               </div>
               <input
                  type="text"
                  placeholder="Search by Name, CAS, or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-carbon-200 rounded-sm leading-5 bg-white placeholder-carbon-400 focus:outline-none focus:placeholder-carbon-300 focus:border-carbon-900 focus:ring-0 sm:text-sm font-mono transition-colors"
               />
               {searchQuery && (
                 <button 
                   onClick={() => setSearchQuery('')}
                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
                 >
                   <X className="h-4 w-4 text-carbon-400 hover:text-carbon-900" />
                 </button>
               )}
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6 flex-shrink-0">
               <div className="text-xs text-carbon-500 font-mono hidden md:block">
                  <span>{filteredProducts.length} RECORDS FOUND</span>
               </div>
               
               <button 
                 onClick={() => setShowFilters(!showFilters)}
                 className={`flex items-center space-x-2 text-sm font-medium transition-colors ${showFilters ? 'text-signal-600' : 'text-carbon-900 hover:text-signal-600'}`}
               >
                 <SlidersHorizontal className="w-4 h-4" />
                 <span>FILTER</span>
               </button>
            </div>
         </div>
         
         {/* Expandable Filter Panel */}
         {showFilters && (
            <div className="border-t border-carbon-100 bg-carbon-50 px-6 md:px-12 py-8 animate-in slide-in-from-top-2 duration-200">
               <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                  <div className="col-span-1 md:col-span-3">
                     <h3 className="font-mono text-xs text-carbon-400 uppercase tracking-widest mb-4">Category</h3>
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
                        {categories.map(cat => (
                           <label key={cat} className="flex items-center group cursor-pointer">
                              <input 
                                type="radio" 
                                name="cat" 
                                className="peer sr-only"
                                checked={selectedCategory === cat}
                                onChange={() => setSelectedCategory(cat)}
                              />
                              <span className="w-3 h-3 border border-carbon-300 rounded-full mr-3 peer-checked:bg-carbon-900 peer-checked:border-carbon-900 transition-colors"></span>
                              <span className={`text-sm ${selectedCategory === cat ? 'text-carbon-900' : 'text-carbon-500 group-hover:text-carbon-700'}`}>
                                 {cat}
                              </span>
                           </label>
                        ))}
                     </div>
                  </div>
                  <div>
                     <h3 className="font-mono text-xs text-carbon-400 uppercase tracking-widest mb-4">Purity Threshold</h3>
                     <input 
                        type="range" 
                        min="90" 
                        max="99" 
                        step="0.5"
                        value={minPurity === 0 ? 90 : minPurity}
                        onChange={(e) => setMinPurity(parseFloat(e.target.value))}
                        className="w-full h-1 bg-carbon-200 rounded-lg appearance-none cursor-pointer accent-carbon-900"
                     />
                     <div className="flex justify-between mt-2 text-xs font-mono text-carbon-500">
                        <span>90%</span>
                        <span className="text-carbon-900">{minPurity === 0 ? 'All' : `>${minPurity}%`}</span>
                        <span>99%</span>
                     </div>
                  </div>
                  <div className="md:col-span-4 flex items-end justify-end mt-4">
                     <button 
                       onClick={() => {setSelectedCategory('All'); setMinPurity(0); setSearchQuery('');}}
                       className="text-xs font-mono uppercase tracking-widest text-carbon-400 hover:text-carbon-900 border-b border-transparent hover:border-carbon-900 pb-1 transition-all"
                     >
                       Clear Filters
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>

      {/* Grid */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
         {viewMode === 'sections' && !searchQuery && selectedCategory === 'All' ? (
            // Sections view
            <div className="space-y-16">
               {Object.entries(PRODUCT_SECTIONS).map(([sectionName, productIds]) => {
                  const sectionProducts = PRODUCTS.filter(p =>
                     productIds.includes(p.id) && p.purity >= minPurity
                  );

                  if (sectionProducts.length === 0) return null;

                  return (
                     <div key={sectionName}>
                        <div className="mb-6 pb-3 border-b border-carbon-200">
                           <h2 className="text-2xl font-display font-medium text-carbon-900">{sectionName}</h2>
                           <p className="text-sm text-carbon-500 mt-1 font-mono">{sectionProducts.length} PRODUCTS</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-carbon-200 border border-carbon-200">
                           {sectionProducts.map(product => (
                              <ProductCard key={product.id} product={product} />
                           ))}
                        </div>
                     </div>
                  );
               })}
            </div>
         ) : (
            // Grid view (filtered or search mode)
            filteredProducts.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-carbon-200 border border-carbon-200">
                  {filteredProducts.map(product => (
                     <ProductCard key={product.id} product={product} />
                  ))}
               </div>
            ) : (
               <div className="py-32 text-center">
                  <p className="text-carbon-400 text-lg font-light">No records match your criteria.</p>
                  <button onClick={() => {setSelectedCategory('All'); setMinPurity(0); setSearchQuery('');}} className="mt-4 text-carbon-900 underline">Reset Search</button>
               </div>
            )
         )}
      </div>
    </div>
  );
};

export default CatalogPage;