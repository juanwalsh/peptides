export enum ProductCategory {
    PEPTIDES = 'Synthetic Peptides',
    BLENDS = 'Peptide Blends',
    METABOLICS = 'Metabolics & Mitochondrial',
    LIPOLYTICS = 'Lipolytics',
    SOLVENTS = 'Solvents & Solutions',
    REAGENTS = 'Biochemical Reagents',
    KITS = 'Assay Kits',
  }
  
  export interface Product {
    id: string;
    name: string;
    chemicalName: string;
    casNumber: string;
    formula: string;
    molecularWeight: number | string; // Allow string for complex mixtures
    purity: number; // percentage
    sequence?: string;
    category: ProductCategory;
    price: number;
    description: string;
    storage: string;
    solubility: string;
    analysisMethod: 'HPLC' | 'MS' | 'NMR';
    inStock: boolean;
  }
  
  export interface Article {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    readTime: string;
    content?: string;
  }
  
  export interface GlossaryTerm {
    term: string;
    definition: string;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }