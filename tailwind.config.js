/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Neutral Scale (Carbon / Vapor)
        carbon: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        // Accent (Signal Blue - Clinical & Sharp)
        signal: {
          50: '#eff6ff',
          100: '#dbeafe',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        // Emerald for success states
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          400: '#34d399',
          600: '#059669',
          700: '#047857',
          900: '#064e3b',
        },
        // Amber for warnings
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          900: '#78350f',
        },
        // Red for errors
        red: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #f3f4f6 1px, transparent 1px), linear-gradient(to bottom, #f3f4f6 1px, transparent 1px)",
      },
      animation: {
        in: 'in 0.2s ease-out',
        'slide-in-from-top-4': 'slide-in-from-top-4 0.3s ease-out',
        'slide-in-from-bottom-2': 'slide-in-from-bottom-2 0.5s ease-out',
        'slide-in-from-bottom-3': 'slide-in-from-bottom-3 0.5s ease-out',
        'slide-in-from-bottom-4': 'slide-in-from-bottom-4 0.5s ease-out',
        'slide-in-from-right-4': 'slide-in-from-right-4 0.7s ease-out',
        'slide-in-from-top-10': 'slide-in-from-top-10 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'zoom-in-95': 'zoom-in-95 0.2s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'modal-in': 'modalIn 0.3s ease-out forwards',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        in: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-from-top-4': {
          '0%': { transform: 'translateY(-1rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-from-bottom-2': {
          '0%': { transform: 'translateY(0.5rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-from-bottom-3': {
          '0%': { transform: 'translateY(0.75rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-from-bottom-4': {
          '0%': { transform: 'translateY(1rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-from-right-4': {
          '0%': { transform: 'translateX(1rem)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-from-top-10': {
          '0%': { transform: 'translateY(-2.5rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'zoom-in-95': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        modalIn: {
          '0%': { transform: 'scale(0.95) translateY(10px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
