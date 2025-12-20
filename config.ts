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

  // Max quantity per item in cart
  MAX_QUANTITY_PER_ITEM: 50,

  // Volume discount tiers
  VOLUME_DISCOUNTS: [
    { minQty: 10, discount: 0.10, label: '10% off' },
    { minQty: 5, discount: 0.05, label: '5% off' },
  ] as const,

  // Valid discount codes
  DISCOUNT_CODES: {
    'RESEARCH10': { discount: 0.10, label: '10% Research Discount' },
    'WELCOME5': { discount: 0.05, label: '5% Welcome Discount' },
    'BULK15': { discount: 0.15, label: '15% Bulk Order Discount' },
  } as Record<string, { discount: number; label: string }>,
} as const;
