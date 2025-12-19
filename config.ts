// Configuration file for application constants
// In production, these values should come from environment variables

export const CONFIG = {
  // WhatsApp contact number (format: country code + number, no spaces or special chars)
  WHATSAPP_PHONE: import.meta.env.VITE_WHATSAPP_PHONE || '5522998004156',

  // Free shipping threshold
  FREE_SHIPPING_THRESHOLD: 300,

  // Shipping warning threshold (how close to free shipping before warning)
  SHIPPING_WARNING_THRESHOLD: 50,

  // Toast display duration (ms)
  TOAST_DURATION: 4000,
  TOAST_EXIT_ANIMATION: 500,
} as const;
