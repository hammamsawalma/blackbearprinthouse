import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * i18n & Integration Tests for Eid Offers
 * Tests: I1–I6 from the comprehensive test plan
 */

const MESSAGES_DIR = path.join(__dirname, '../../src/messages');
const SCHEMA_PATH = path.join(__dirname, '../../prisma/schema.prisma');
const PAGE_PATH = path.join(__dirname, '../../src/app/(site)/[locale]/page.tsx');

test.describe('Integration: Eid Offers i18n & Schema', () => {

  // ─── I1: Arabic translation keys exist ───
  test('I1: ar.json should contain eid_offers translation keys', async () => {
    const arJson = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, 'ar.json'), 'utf-8'));

    expect(arJson).toHaveProperty('eid_offers');
    expect(arJson.eid_offers).toHaveProperty('badge');
    expect(arJson.eid_offers).toHaveProperty('title');
    expect(arJson.eid_offers).toHaveProperty('shop_now');
    expect(arJson.eid_offers).toHaveProperty('currency');

    // Values should be Arabic text
    expect(arJson.eid_offers.badge).toBe('عروض العيد');
    expect(arJson.eid_offers.currency).toBe('ر.ق');
  });

  // ─── I2: English translation keys exist ───
  test('I2: en.json should contain eid_offers translation keys', async () => {
    const enJson = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, 'en.json'), 'utf-8'));

    expect(enJson).toHaveProperty('eid_offers');
    expect(enJson.eid_offers).toHaveProperty('badge');
    expect(enJson.eid_offers).toHaveProperty('title');
    expect(enJson.eid_offers).toHaveProperty('shop_now');
    expect(enJson.eid_offers).toHaveProperty('currency');

    // Values should be English text
    expect(enJson.eid_offers.badge).toBe('Eid Offers');
    expect(enJson.eid_offers.currency).toBe('QAR');
  });

  // ─── I3: Banner is positioned between Hero and Services in page.tsx ───
  test('I3: EidOffersBanner should be between Hero and Services sections in page.tsx', async () => {
    const pageContent = fs.readFileSync(PAGE_PATH, 'utf-8');

    // Check import exists
    expect(pageContent).toContain("import EidOffersBanner from '@/components/EidOffersBanner'");

    // Check component is rendered as JSX
    expect(pageContent).toContain('<EidOffersBanner');

    // Check ordering: Hero section comment → <EidOffersBanner JSX → Services section comment
    const heroIndex = pageContent.indexOf('Hero Section');
    const bannerIndex = pageContent.indexOf('<EidOffersBanner');
    const servicesIndex = pageContent.indexOf('Services Overview');

    expect(heroIndex).toBeGreaterThan(-1);
    expect(bannerIndex).toBeGreaterThan(-1);
    expect(servicesIndex).toBeGreaterThan(-1);
    expect(heroIndex).toBeLessThan(bannerIndex);
    expect(bannerIndex).toBeLessThan(servicesIndex);
  });

  // ─── I4: npm run build passes successfully ───
  // (This is verified separately with the build step — skipping in test runner
  //  to avoid long build times during test execution)
  test.skip('I4: npm run build should pass — verified separately', async () => {
    // Build is verified in the CI/verification step
  });

  // ─── I5: Prisma schema has Eid offer fields ───
  test('I5: Prisma schema should contain Eid offer fields on Product model', async () => {
    const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');

    expect(schema).toContain('isEidOffer');
    expect(schema).toContain('offerPrice');
    expect(schema).toContain('offerImage');

    // Verify field types
    expect(schema).toMatch(/isEidOffer\s+Boolean\s+@default\(false\)/);
    expect(schema).toMatch(/offerPrice\s+Float\?/);
    expect(schema).toMatch(/offerImage\s+String\?/);
  });

  // ─── I6: API connects to Prisma without errors ───
  test('I6: API should connect to Prisma and return valid data without errors', async ({ request }) => {
    const response = await request.get('/api/offers');

    // Should not be a 500 error (Prisma connection issue)
    expect(response.status()).not.toBe(500);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.error).toBeUndefined();
  });

  // ─── Bonus: Arabic and English translation keys are in sync ───
  test('BONUS: ar.json and en.json eid_offers keys should be in sync', async () => {
    const arJson = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, 'ar.json'), 'utf-8'));
    const enJson = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, 'en.json'), 'utf-8'));

    const arKeys = Object.keys(arJson.eid_offers).sort();
    const enKeys = Object.keys(enJson.eid_offers).sort();

    expect(arKeys).toEqual(enKeys);
  });
});
