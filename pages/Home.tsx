import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Hexagon, Activity, FileCheck, Layers } from 'lucide-react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-40 md:pb-48 px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-carbon-100">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-carbon-900 tracking-tight leading-[1.1] mb-12">
            Precision Materials <br/>
            <span className="text-carbon-400">for Modern Research.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <p className="text-lg md:text-xl text-carbon-600 font-light max-w-xl leading-relaxed">
              We supply verified, high-purity peptides and biochemical reagents for the advancement of molecular science. 
              <span className="block mt-4 font-normal text-carbon-900">Strictly for laboratory use.</span>
            </p>
            <Link to="/catalog" className="group flex items-center space-x-3 text-carbon-900 hover:text-signal-600 transition-colors">
              <span className="text-sm font-mono uppercase tracking-widest border-b border-carbon-900 group-hover:border-signal-600 pb-1 transition-all">View Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        
        {/* Abstract Deco */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-[0.03] pointer-events-none hidden lg:block">
           <svg viewBox="0 0 400 400" className="w-full h-full">
             <defs>
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
        </div>
      </section>

      {/* Philosophy / Grid */}
      <section className="border-b border-carbon-100 bg-carbon-50/50">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-carbon-200 border-b border-carbon-200">
          <div className="p-6 md:p-10 md:min-h-72 flex flex-col justify-between hover:bg-white transition-colors duration-500">
            <Hexagon className="w-6 h-6 text-carbon-400 stroke-1 mb-4" />
            <div>
              <h3 className="font-display text-xl text-carbon-900 mb-2">Purity Verification</h3>
              <p className="text-sm text-carbon-500 leading-relaxed">Every lot is analyzed via HPLC & MS. Data is transparent and available per batch.</p>
            </div>
          </div>
          <div className="p-6 md:p-10 md:min-h-72 flex flex-col justify-between hover:bg-white transition-colors duration-500">
            <Layers className="w-6 h-6 text-carbon-400 stroke-1 mb-4" />
            <div>
              <h3 className="font-display text-xl text-carbon-900 mb-2">Controlled Origins</h3>
              <p className="text-sm text-carbon-500 leading-relaxed">Synthesized in regulated environments to minimize endotoxins and impurities.</p>
            </div>
          </div>
          <div className="p-6 md:p-10 md:min-h-72 flex flex-col justify-between hover:bg-white transition-colors duration-500">
             <FileCheck className="w-6 h-6 text-carbon-400 stroke-1 mb-4" />
            <div>
              <h3 className="font-display text-xl text-carbon-900 mb-2">Regulatory Compliance</h3>
              <p className="text-sm text-carbon-500 leading-relaxed">Strict adherence to research-only protocols. We do not sell for therapeutic use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Reagents */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
             <h2 className="text-3xl md:text-4xl font-display font-medium text-carbon-900 mb-2">Featured Lots</h2>
             <p className="text-carbon-500 font-light">Current availability for immediate dispatch.</p>
          </div>
          <Link to="/catalog" className="hidden md:flex items-center text-sm font-mono uppercase tracking-widest text-carbon-400 hover:text-carbon-900 transition-colors">
            Full Inventory <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-carbon-200 border border-carbon-200">
           {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
           ))}
        </div>
        
        <div className="mt-12 md:hidden flex justify-center">
           <Link to="/catalog" className="text-sm font-mono uppercase tracking-widest text-carbon-900 border-b border-carbon-900 pb-1">
             View All Products
           </Link>
        </div>
      </section>

      {/* Statement */}
      <section className="bg-carbon-950 text-white py-32 px-6 md:px-12">
         <div className="max-w-4xl mx-auto text-center">
            <Activity className="w-12 h-12 text-signal-500 mx-auto mb-8 stroke-1" />
            <h2 className="text-2xl md:text-4xl font-display font-light leading-snug mb-8">
              "We provide the constants in your variables. By ensuring absolute consistency in our reagents, we allow you to focus on the science."
            </h2>
            <p className="text-carbon-400 font-mono text-sm uppercase tracking-widest">
              BioSynth Standards
            </p>
         </div>
      </section>
    </div>
  );
};

export default HomePage;