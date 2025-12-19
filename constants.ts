import { Product, Article, GlossaryTerm } from './types';
import { PEPTIDES_LIST } from './data_peptides';
import { METABOLICS_AND_OTHERS } from './data_metabolics';

export const PRODUCTS: Product[] = [
  ...PEPTIDES_LIST,
  ...METABOLICS_AND_OTHERS
];

export const ARTICLES: Article[] = [
  {
    id: 'ART-001',
    title: 'Research vs. Clinical Grade: Understanding the Difference',
    excerpt: 'An in-depth analysis of regulatory requirements, purity standards, and why research peptides must never be used for human trials without approvals.',
    date: '2023-10-15',
    category: 'Regulatory',
    readTime: '5 min'
  },
  {
    id: 'ART-002',
    title: 'Interpreting HPLC Chromatograms for Peptide Purity',
    excerpt: 'A technical guide on reading retention times, peak areas, and identifying impurities in high-performance liquid chromatography reports.',
    date: '2023-11-02',
    category: 'Technical',
    readTime: '8 min'
  },
  {
    id: 'ART-003',
    title: 'Lyophilization and Storage Protocols',
    excerpt: 'Best practices for storing freeze-dried peptides to maintain stability and prevent degradation over long-term research projects.',
    date: '2023-12-10',
    category: 'Methods',
    readTime: '4 min'
  }
];

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Lyophilization',
    definition: 'A water removal process typically used to preserve perishable material or make the material more convenient for transport (freeze-drying).'
  },
  {
    term: 'HPLC',
    definition: 'High-Performance Liquid Chromatography. A technique to separate, identify, and quantify each component in a mixture.'
  },
  {
    term: 'Mass Spectrometry (MS)',
    definition: 'An analytical technique that measures the mass-to-charge ratio of ions to identify and quantify molecules in simple and complex mixtures.'
  },
  {
    term: 'Peptide Bond',
    definition: 'A chemical bond formed between two molecules when the carboxyl group of one molecule reacts with the amino group of the other molecule, releasing a molecule of water.'
  },
  {
    term: 'Reconstitution',
    definition: 'The process of adding a solvent (diluent) to a powdered medication or substance to transform it into a liquid.'
  }
];
