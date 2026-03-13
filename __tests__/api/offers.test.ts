import { test, expect } from '@playwright/test';

/**
 * API Tests for /api/offers endpoint
 * Tests: A1–A7 from the comprehensive test plan
 */

const API_URL = '/api/offers';

test.describe('API: /api/offers — Eid Offers Endpoint', () => {

  // A1: GET /api/offers returns offers successfully
  test('A1: should return offers with success=true and status 200', async ({ request }) => {
    const response = await request.get(API_URL);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.offers)).toBe(true);
  });

  // A2: Offers are limited to a maximum of 5 items
  test('A2: should return at most 5 offers', async ({ request }) => {
    const response = await request.get(API_URL);
    const data = await response.json();
    expect(data.offers.length).toBeLessThanOrEqual(5);
  });

  // A3: Each offer contains all required fields
  test('A3: each offer should have required fields', async ({ request }) => {
    const response = await request.get(API_URL);
    const data = await response.json();

    for (const offer of data.offers) {
      expect(offer).toHaveProperty('id');
      expect(offer).toHaveProperty('nameAr');
      expect(offer).toHaveProperty('nameEn');
      expect(offer).toHaveProperty('descriptionAr');
      expect(offer).toHaveProperty('descriptionEn');
      expect(offer).toHaveProperty('price');
      expect(offer).toHaveProperty('offerPrice');
      expect(offer).toHaveProperty('image');
      expect(offer).toHaveProperty('offerImage');
      expect(offer).toHaveProperty('isEidOffer');
      expect(offer.isEidOffer).toBe(true);
    }
  });

  // A4: Offers are ordered by updatedAt descending (most recent first)
  test('A4: offers should be ordered by updatedAt descending', async ({ request }) => {
    const response = await request.get(API_URL);
    const data = await response.json();

    if (data.offers.length > 1) {
      for (let i = 0; i < data.offers.length - 1; i++) {
        const current = new Date(data.offers[i].updatedAt).getTime();
        const next = new Date(data.offers[i + 1].updatedAt).getTime();
        expect(current).toBeGreaterThanOrEqual(next);
      }
    }
  });

  // A5: Price values are positive numbers
  test('A5: price and offerPrice should be positive numbers', async ({ request }) => {
    const response = await request.get(API_URL);
    const data = await response.json();

    for (const offer of data.offers) {
      expect(typeof offer.price).toBe('number');
      expect(offer.price).toBeGreaterThan(0);

      if (offer.offerPrice !== null) {
        expect(typeof offer.offerPrice).toBe('number');
        expect(offer.offerPrice).toBeGreaterThan(0);
        expect(offer.offerPrice).toBeLessThan(offer.price); // Offer must be cheaper
      }
    }
  });

  // A6: POST method is not allowed
  test('A6: POST method should return 405 or be rejected', async ({ request }) => {
    const response = await request.post(API_URL, {
      data: { test: true },
    });
    // Next.js returns 405 for unsupported methods on route handlers
    expect(response.status()).toBe(405);
  });

  // A7: Response time is under 200ms
  test('A7: response time should be under 500ms', async ({ request }) => {
    const start = Date.now();
    await request.get(API_URL);
    const responseTime = Date.now() - start;

    // Allow 500ms for dev server (200ms for production SLA)
    expect(responseTime).toBeLessThan(500);
  });
});
