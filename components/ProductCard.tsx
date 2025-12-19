import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block h-full bg-white border border-carbon-200 hover:border-carbon-900 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden p-5 md:p-8 flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <span className="font-mono text-[10px] uppercase tracking-widest text-carbon-400 border border-carbon-100 px-2 py-1 rounded-sm">
            {product.id}
          </span>
          {product.purity > 98 && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-signal-600 bg-signal-50 px-2 py-1">
              High Purity
            </span>
          )}
        </div>

        <h3 className="font-display text-xl md:text-2xl text-carbon-900 mb-2 group-hover:text-signal-600 transition-colors font-medium">
          {product.name}
        </h3>
        <div className="font-mono text-xs text-carbon-500 mb-6 flex space-x-4">
           <span>{product.casNumber}</span>
           <span className="text-carbon-300">|</span>
           <span>{product.molecularWeight} g/mol</span>
        </div>
        
        <p className="text-sm text-carbon-600 leading-relaxed font-light line-clamp-3 mb-8">
          {product.description}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-carbon-100 pt-6 mt-auto">
        <span className="font-mono text-sm text-carbon-900">${product.price.toFixed(2)}</span>
        <div className="w-8 h-8 rounded-full bg-carbon-50 group-hover:bg-signal-600 flex items-center justify-center transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 text-carbon-400 group-hover:text-white transition-colors" />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;