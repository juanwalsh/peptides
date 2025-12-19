import React from 'react';
import { ARTICLES, GLOSSARY } from '../constants';
import { ArrowRight, Book } from 'lucide-react';

const EducationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <header className="mb-24 max-w-3xl">
           <span className="font-mono text-xs text-signal-600 uppercase tracking-widest mb-4 block">Knowledge Base</span>
           <h1 className="text-5xl md:text-7xl font-display font-medium text-carbon-900 mb-8 leading-none">
             Methods & <br/>
             <span className="text-carbon-400">Methodology.</span>
           </h1>
           <p className="text-xl text-carbon-600 font-light leading-relaxed">
             A repository of technical definitions, protocols, and regulatory frameworks guiding modern peptide synthesis.
           </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
           {/* Articles Feed */}
           <div className="lg:col-span-8 space-y-16">
              {ARTICLES.map(article => (
                 <article key={article.id} className="group cursor-pointer">
                    <div className="flex items-center space-x-4 mb-4 text-xs font-mono uppercase tracking-widest text-carbon-400">
                       <span className="text-carbon-900">{article.category}</span>
                       <span>—</span>
                       <span>{article.readTime}</span>
                    </div>
                    <h2 className="text-3xl font-display font-medium text-carbon-900 mb-4 group-hover:text-signal-600 transition-colors">
                       {article.title}
                    </h2>
                    <p className="text-carbon-600 font-light leading-relaxed mb-6 max-w-2xl">
                       {article.excerpt}
                    </p>
                    <div className="flex items-center text-sm font-medium text-carbon-900 group-hover:underline decoration-1 underline-offset-4">
                       Read Paper <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                 </article>
              ))}
           </div>

           {/* Glossary Sidebar */}
           <aside className="lg:col-span-4">
              <div className="sticky top-32 p-8 bg-carbon-50 border border-carbon-100">
                 <div className="flex items-center space-x-2 mb-8 text-carbon-900">
                    <Book className="w-5 h-5" />
                    <h3 className="font-display text-lg font-medium">Lexicon</h3>
                 </div>
                 
                 <div className="space-y-8">
                    {GLOSSARY.map((item, idx) => (
                       <div key={idx}>
                          <dt className="font-mono text-sm font-bold text-carbon-900 mb-2">{item.term}</dt>
                          <dd className="text-sm text-carbon-600 font-light leading-relaxed border-l-2 border-carbon-200 pl-4">
                             {item.definition}
                          </dd>
                       </div>
                    ))}
                 </div>
              </div>
           </aside>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;