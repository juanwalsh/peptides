import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { ProductCategory, Product } from '../types';
import { SlidersHorizontal, Search, X, ArrowUpDown, Heart, Clock } from 'lucide-react';

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
  'Solvents & Accessories': ['WA3', 'WA10', 'SYR', 'ALC', 'WIP', 'GLV']
};

// Sort options
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'purity-desc' | 'name-asc' | 'name-desc';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'purity-desc', label: 'Highest Purity' },
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
];

// Helper to highlight search terms
const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-signal-200 text-signal-900 px-0.5 rounded">{part}</mark>
    ) : part
  );
};

const CatalogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [minPurity, setMinPurity] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'sections' | 'grid'>('sections');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('biosynth_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('biosynth_recently_viewed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [showRecentlyViewed, setShowRecentlyViewed] = useState(false);

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem('biosynth_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites:', e);
    }
  }, [favorites]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const categories = ['All', ...Object.values(ProductCategory)];

  const filteredProducts = useMemo(() => {
    let products = PRODUCTS.filter(product => {
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

      // 4. Favorites filter
      const favoritesMatch = !showFavorites || favorites.includes(product.id);

      // 5. Recently viewed filter
      const recentMatch = !showRecentlyViewed || recentlyViewed.includes(product.id);

      return categoryMatch && purityMatch && searchMatch && favoritesMatch && recentMatch;
    });

    // Sort products
    if (sortOption !== 'default') {
      products = [...products].sort((a, b) => {
        switch (sortOption) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'purity-desc':
            return b.purity - a.purity;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    return products;
  }, [selectedCategory, minPurity, searchQuery, sortOption, showFavorites, favorites, showRecentlyViewed, recentlyViewed]);

  // Recently viewed products list
  const recentProducts = useMemo(() => {
    return recentlyViewed
      .map(id => PRODUCTS.find(p => p.id === id))
      .filter((p): p is Product => p !== undefined)
      .slice(0, 6);
  }, [recentlyViewed]);

  // Favorites products list
  const favoriteProducts = useMemo(() => {
    return favorites
      .map(id => PRODUCTS.find(p => p.id === id))
      .filter((p): p is Product => p !== undefined);
  }, [favorites]);

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

            <div className="flex items-center justify-between md:justify-end gap-4 flex-shrink-0">
               <div className="text-xs text-carbon-500 font-mono hidden md:block">
                  <span>{filteredProducts.length} RECORDS FOUND</span>
               </div>

               {/* Sort dropdown */}
               <div className="relative">
                  <select
                     value={sortOption}
                     onChange={(e) => setSortOption(e.target.value as SortOption)}
                     className="appearance-none bg-white border border-carbon-200 text-xs font-mono px-3 py-2 pr-8 rounded-sm cursor-pointer hover:border-carbon-900 focus:outline-none focus:border-carbon-900 transition-colors"
                  >
                     {SORT_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                     ))}
                  </select>
                  <ArrowUpDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-carbon-400 pointer-events-none" />
               </div>

               {/* Favorites toggle */}
               <button
                 onClick={() => { setShowFavorites(!showFavorites); setShowRecentlyViewed(false); }}
                 className={`flex items-center space-x-1.5 text-xs font-mono px-3 py-2 border rounded-sm transition-colors ${showFavorites ? 'bg-signal-50 border-signal-600 text-signal-600' : 'border-carbon-200 text-carbon-500 hover:border-carbon-900 hover:text-carbon-900'}`}
                 title="Show Favorites"
               >
                 <Heart className={`w-3.5 h-3.5 ${showFavorites ? 'fill-signal-600' : ''}`} />
                 <span className="hidden sm:inline">{favorites.length}</span>
               </button>

               {/* Recently viewed toggle */}
               <button
                 onClick={() => { setShowRecentlyViewed(!showRecentlyViewed); setShowFavorites(false); }}
                 className={`flex items-center space-x-1.5 text-xs font-mono px-3 py-2 border rounded-sm transition-colors ${showRecentlyViewed ? 'bg-signal-50 border-signal-600 text-signal-600' : 'border-carbon-200 text-carbon-500 hover:border-carbon-900 hover:text-carbon-900'}`}
                 title="Recently Viewed"
               >
                 <Clock className="w-3.5 h-3.5" />
                 <span className="hidden sm:inline">{recentlyViewed.length}</span>
               </button>

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
         {/* Recently Viewed Section */}
         {recentProducts.length > 0 && !showFavorites && !showRecentlyViewed && !searchQuery && selectedCategory === 'All' && (
            <div className="mb-16">
               <div className="mb-6 pb-3 border-b border-carbon-200 flex items-center justify-between">
                  <div>
                     <h2 className="text-2xl font-display font-medium text-carbon-900 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-carbon-400" />
                        Recently Viewed
                     </h2>
                     <p className="text-sm text-carbon-500 mt-1 font-mono">{recentProducts.length} PRODUCTS</p>
                  </div>
                  <button
                     onClick={() => setShowRecentlyViewed(true)}
                     className="text-xs font-mono uppercase tracking-widest text-carbon-500 hover:text-carbon-900 transition-colors"
                  >
                     View All
                  </button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-carbon-200 border border-carbon-200">
                  {recentProducts.slice(0, 3).map(product => (
                     <ProductCard
                        key={product.id}
                        product={product}
                        searchQuery=""
                        isFavorite={favorites.includes(product.id)}
                        onToggleFavorite={toggleFavorite}
                     />
                  ))}
               </div>
            </div>
         )}

         {viewMode === 'sections' && !searchQuery && selectedCategory === 'All' && !showFavorites && !showRecentlyViewed && sortOption === 'default' ? (
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
                              <ProductCard
                                 key={product.id}
                                 product={product}
                                 searchQuery=""
                                 isFavorite={favorites.includes(product.id)}
                                 onToggleFavorite={toggleFavorite}
                              />
                           ))}
                        </div>
                     </div>
                  );
               })}
            </div>
         ) : (
            // Grid view (filtered, search, favorites, or recently viewed mode)
            <>
               {/* Show header for favorites/recently viewed */}
               {(showFavorites || showRecentlyViewed) && (
                  <div className="mb-8 pb-4 border-b border-carbon-200 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        {showFavorites && <Heart className="w-5 h-5 text-signal-600 fill-signal-600" />}
                        {showRecentlyViewed && <Clock className="w-5 h-5 text-signal-600" />}
                        <h2 className="text-2xl font-display font-medium text-carbon-900">
                           {showFavorites ? 'Your Favorites' : 'Recently Viewed'}
                        </h2>
                     </div>
                     <button
                        onClick={() => { setShowFavorites(false); setShowRecentlyViewed(false); }}
                        className="text-xs font-mono uppercase tracking-widest text-carbon-500 hover:text-carbon-900 flex items-center gap-1 transition-colors"
                     >
                        <X className="w-3 h-3" /> Clear Filter
                     </button>
                  </div>
               )}

               {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-carbon-200 border border-carbon-200">
                     {filteredProducts.map(product => (
                        <ProductCard
                           key={product.id}
                           product={product}
                           searchQuery={searchQuery}
                           isFavorite={favorites.includes(product.id)}
                           onToggleFavorite={toggleFavorite}
                        />
                     ))}
                  </div>
               ) : (
                  <div className="py-32 text-center">
                     <p className="text-carbon-400 text-lg font-light">
                        {showFavorites ? 'No favorites yet. Click the heart icon on any product to add it.' :
                         showRecentlyViewed ? 'No recently viewed products.' :
                         'No records match your criteria.'}
                     </p>
                     <button onClick={() => {setSelectedCategory('All'); setMinPurity(0); setSearchQuery(''); setShowFavorites(false); setShowRecentlyViewed(false);}} className="mt-4 text-carbon-900 underline">Reset Search</button>
                  </div>
               )}
            </>
         )}
      </div>
    </div>
  );
};

export default CatalogPage;