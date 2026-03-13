/**
 * Input validation & sanitization utilities for API endpoints.
 * Prevents injection attacks, enforces data constraints, and ensures type safety.
 */

/** Sanitize string input: trim whitespace and limit length */
export function sanitizeString(value: unknown, maxLength: number = 500): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

/** Validate email format */
export function isValidEmail(email: string): boolean {
  // RFC 5322 simplified — good enough for server-side validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 254;
}

/** Validate phone — allows international formats (+974XXXXXXXX) */
export function isValidPhone(phone: string): boolean {
  const re = /^\+?[0-9\s\-()]{7,20}$/;
  return re.test(phone);
}

/** Validate positive integer (for quantity fields) */
export function isPositiveInt(value: unknown): boolean {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

/** Checkout customer validation */
export interface CheckoutCustomer {
  name: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  area?: string;
  notes?: string;
}

export function validateCheckoutCustomer(raw: Record<string, unknown>): { valid: true; data: CheckoutCustomer } | { valid: false; error: string } {
  const name = sanitizeString(raw.name, 100);
  const email = sanitizeString(raw.email, 254);
  const phone = sanitizeString(raw.phone, 20);
  const address = sanitizeString(raw.address, 300);
  const company = sanitizeString(raw.company, 100);
  const area = sanitizeString(raw.area, 100);
  const notes = sanitizeString(raw.notes, 500);

  if (!name || name.length < 2) return { valid: false, error: 'Name is required (min 2 characters)' };
  if (!email || !isValidEmail(email)) return { valid: false, error: 'Valid email is required' };
  if (!phone || !isValidPhone(phone)) return { valid: false, error: 'Valid phone number is required' };
  if (!address || address.length < 3) return { valid: false, error: 'Delivery address is required' };

  return {
    valid: true,
    data: { name, email, phone, company: company || undefined, address, area: area || undefined, notes: notes || undefined },
  };
}

/** Cart item validation */
export interface ValidCartItem {
  id: string;
  qty: number;
}

export function validateCartItems(raw: unknown): { valid: true; data: ValidCartItem[] } | { valid: false; error: string } {
  if (!Array.isArray(raw) || raw.length === 0) {
    return { valid: false, error: 'Cart is empty' };
  }
  if (raw.length > 50) {
    return { valid: false, error: 'Too many items in cart (max 50)' };
  }

  const items: ValidCartItem[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') return { valid: false, error: 'Invalid cart item' };
    const id = sanitizeString((item as Record<string, unknown>).id, 50);
    const qty = (item as Record<string, unknown>).qty;
    if (!id) return { valid: false, error: 'Cart item missing id' };
    if (typeof qty !== 'number' || !Number.isInteger(qty) || qty < 1 || qty > 9999) {
      return { valid: false, error: `Invalid quantity for item ${id}` };
    }
    items.push({ id, qty });
  }

  return { valid: true, data: items };
}

/** Quote form validation */
export interface ValidQuoteInput {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  description: string;
  quantity?: string;
}

export function validateQuoteInput(raw: Record<string, unknown>): { valid: true; data: ValidQuoteInput } | { valid: false; error: string } {
  const name = sanitizeString(raw.name, 100);
  const email = sanitizeString(raw.email, 254);
  const phone = sanitizeString(raw.phone, 20);
  const company = sanitizeString(raw.company, 100);
  const serviceType = sanitizeString(raw.serviceType, 100);
  const description = sanitizeString(raw.description, 2000);
  const quantity = sanitizeString(raw.quantity, 50);

  if (!name || name.length < 2) return { valid: false, error: 'Name is required' };
  if (!email || !isValidEmail(email)) return { valid: false, error: 'Valid email is required' };
  if (!phone || !isValidPhone(phone)) return { valid: false, error: 'Valid phone is required' };
  if (!serviceType) return { valid: false, error: 'Service type is required' };
  if (!description || description.length < 5) return { valid: false, error: 'Description is required (min 5 characters)' };

  return {
    valid: true,
    data: { name, email, phone, company: company || undefined, serviceType, description, quantity: quantity || undefined },
  };
}

/** Contact form validation */
export interface ValidContactInput {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export function validateContactInput(raw: Record<string, unknown>): { valid: true; data: ValidContactInput } | { valid: false; error: string } {
  const name = sanitizeString(raw.name, 100);
  const email = sanitizeString(raw.email, 254);
  const phone = sanitizeString(raw.phone, 20);
  const subject = sanitizeString(raw.subject, 200);
  const message = sanitizeString(raw.message, 5000);

  if (!name || name.length < 2) return { valid: false, error: 'Name is required' };
  if (!email || !isValidEmail(email)) return { valid: false, error: 'Valid email is required' };
  if (!message || message.length < 5) return { valid: false, error: 'Message is required (min 5 characters)' };

  return {
    valid: true,
    data: { name, email, phone: phone || undefined, subject: subject || undefined, message },
  };
}
