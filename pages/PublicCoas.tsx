import React, { useState } from 'react';
import { FileCheck, X } from 'lucide-react';

const PublicCoasPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{url: string, batch: number} | null>(null);
  // CoA images data
  const coaData = [
    { id: 1, imageUrl: 'https://i.ibb.co/v4w94xtN/purity-test-6.jpg', batch: 1001 },
    { id: 2, imageUrl: 'https://i.ibb.co/FqVRH5CR/purity-test-7.jpg', batch: 1002 },
    { id: 3, imageUrl: 'https://i.ibb.co/svqGBcPv/purity-test-8.jpg', batch: 1003 },
    { id: 4, imageUrl: 'https://i.ibb.co/1tZHtJn1/purity-test-9.jpg', batch: 1004 },
    { id: 5, imageUrl: 'https://i.ibb.co/Hfs5ssGF/purity-test-10.jpg', batch: 1005 },
    { id: 6, imageUrl: 'https://i.ibb.co/FqVRH5CR/purity-test-7.jpg', batch: 1006 },
    { id: 7, imageUrl: 'https://i.ibb.co/7JpkJDq9/purity-test-12.jpg', batch: 1007 },
    { id: 8, imageUrl: 'https://i.ibb.co/1tZHtJn1/purity-test-9.jpg', batch: 1008 },
    { id: 9, imageUrl: 'https://i.ibb.co/Hfs5ssGF/purity-test-10.jpg', batch: 1009 },
    { id: 10, imageUrl: 'https://i.ibb.co/F4RGkPMZ/purity-test-3.jpg', batch: 1010 },
    { id: 11, imageUrl: 'https://i.ibb.co/tPvC4cxP/purity-test-4.jpg', batch: 1011 },
    { id: 12, imageUrl: 'https://i.ibb.co/QxzfsSs/purity-test-5.jpg', batch: 1012 }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <header className="mb-16 max-w-3xl pt-12 md:pt-0">
           <span className="font-mono text-xs text-signal-600 uppercase tracking-widest mb-4 block">Transparency</span>
           <h1 className="text-5xl md:text-7xl font-display font-medium text-carbon-900 mb-8 leading-none">
             Public <br/>
             <span className="text-carbon-400">CoAs & Data.</span>
           </h1>
           <p className="text-xl text-carbon-600 font-light leading-relaxed">
             Verified batch analysis for recent production runs. Access limited to registered institutional partners.
           </p>
        </header>

        <div>
            {/* Main Content: CoA Grid */}
            <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {coaData.map((coa) => (
                        <div
                            key={coa.id}
                            className="group relative aspect-[3/4] bg-carbon-50 border border-carbon-100 overflow-hidden cursor-pointer hover:border-carbon-300 transition-colors"
                            onClick={() => setSelectedImage({url: coa.imageUrl, batch: coa.batch})}
                        >
                            <img
                                src={coa.imageUrl}
                                alt={`Certificate of Analysis - Batch #${coa.batch}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-2 right-2">
                                <span className="bg-white/90 text-carbon-900 font-mono text-[10px] px-2 py-1 rounded">BATCH #{coa.batch}</span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-xs font-bold text-carbon-900">Certificate of Analysis</p>
                                <p className="text-[10px] text-carbon-500 font-mono">Purity: 99.5%</p>
                                <p className="text-[10px] text-carbon-400 font-mono mt-1">Click to expand</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Modal for expanded image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage.url}
              alt={`Certificate of Analysis - Batch #${selectedImage.batch}`}
              className="max-w-full max-h-full object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-sm">
              <p className="font-mono text-sm">BATCH #{selectedImage.batch}</p>
              <p className="text-xs text-gray-300 mt-1">Certificate of Analysis - Purity: 99.5%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicCoasPage;