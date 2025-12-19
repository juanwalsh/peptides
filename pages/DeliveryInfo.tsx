import React, { useState } from 'react';
import { Truck, MapPin, Globe, Clock, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { DELIVERY_DATA, Region } from '../data_countries';

const RegionSection = ({ region }: { region: Region }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showAllCountries, setShowAllCountries] = useState(false);

  // Flatten countries for the summary view
  const allCountriesInRegion = region.subregions.flatMap(s => s.countries);
  const previewCount = 5;

  return (
    <div className="border border-carbon-200 rounded-sm overflow-hidden mb-6 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Header - Always Visible */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-carbon-50 hover:bg-carbon-100 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Globe className="w-5 h-5 text-carbon-400" />
          <h3 className="font-display text-xl font-medium text-carbon-900">{region.name}</h3>
          <span className="text-xs font-mono bg-white border border-carbon-200 px-2 py-0.5 rounded-full text-carbon-500">
             {allCountriesInRegion.length} locations
          </span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-carbon-500" /> : <ChevronDown className="w-5 h-5 text-carbon-500" />}
      </button>

      {/* Content - Collapsible */}
      {isOpen && (
        <div className="p-6 md:p-8 animate-in slide-in-from-top-2 duration-300">
           
           {!showAllCountries ? (
              // PREVIEW VIEW
              <div>
                  <div className="space-y-3 mb-6">
                      {allCountriesInRegion.slice(0, previewCount).map((country) => (
                          <div key={country.name} className="flex justify-between items-center py-2 border-b border-carbon-100 last:border-0">
                              <span className="text-carbon-700">{country.name}</span>
                              <span className="font-mono text-sm font-medium text-signal-600">{country.time}</span>
                          </div>
                      ))}
                  </div>
                  <button 
                    onClick={() => setShowAllCountries(true)}
                    className="w-full py-3 border border-dashed border-carbon-300 text-sm font-mono text-carbon-500 hover:text-carbon-900 hover:border-carbon-900 hover:bg-carbon-50 transition-all uppercase tracking-widest"
                  >
                    View Full Country List (+{allCountriesInRegion.length - previewCount})
                  </button>
              </div>
           ) : (
              // FULL VIEW - Grouped by Subregion
              <div className="animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                      {region.subregions.map((sub) => (
                          <div key={sub.name} className="break-inside-avoid">
                              <h4 className="font-mono text-xs font-bold text-carbon-400 uppercase tracking-widest mb-4 border-b border-carbon-200 pb-2">
                                  {sub.name}
                              </h4>
                              <div className="space-y-2">
                                  {sub.countries.map((country) => (
                                      <div key={country.name} className="flex justify-between items-baseline group hover:bg-carbon-50 px-2 py-1 rounded-sm -mx-2 transition-colors">
                                          <span className="text-sm text-carbon-700 group-hover:text-carbon-900">{country.name}</span>
                                          <span className="font-mono text-xs text-carbon-500 group-hover:text-signal-600">{country.time}</span>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      ))}
                  </div>
                  <button 
                    onClick={() => setShowAllCountries(false)}
                    className="mt-8 text-xs font-mono text-carbon-400 hover:text-carbon-900 underline decoration-carbon-300 underline-offset-4"
                  >
                    Collapse List
                  </button>
              </div>
           )}

        </div>
      )}
    </div>
  );
};

const DeliveryInfoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <header className="mb-16 max-w-3xl">
           <span className="font-mono text-xs text-signal-600 uppercase tracking-widest mb-4 block">Logistics Network</span>
           <h1 className="text-4xl md:text-6xl font-display font-medium text-carbon-900 mb-6 leading-none">
             Global Shipping & <br/>
             <span className="text-carbon-400">Transit Standards.</span>
           </h1>
           <p className="text-xl text-carbon-600 font-light leading-relaxed">
             We utilize specialized cold-chain logistics for domestic and international research deliveries. 
             Delivery times below are estimates based on standard clearance procedures.
           </p>
        </header>

        {/* Legend / Info */}
        <div className="flex items-start space-x-3 bg-carbon-50 p-4 border border-carbon-200 rounded-sm mb-12 text-sm text-carbon-600">
            <AlertCircle className="w-5 h-5 text-signal-600 flex-shrink-0" />
            <p>
                <strong>Research Use Only Declaration:</strong> All international shipments are declared as "Biochemical Reagents for Laboratory Use - Non-Hazardous". 
                Customs clearance times are included in estimates but may vary depending on local regulations.
            </p>
        </div>

        {/* Regions Grid */}
        <div className="space-y-2">
            {DELIVERY_DATA.map((region) => (
                <RegionSection key={region.name} region={region} />
            ))}
        </div>
        
      </div>
    </div>
  );
};

export default DeliveryInfoPage;