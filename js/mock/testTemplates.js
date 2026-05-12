export const mockTemplates = {
    unit: {
        jest: `import { calculateTotal } from './source';

describe('calculateTotal', () => {
    it('should calculate total with tax correctly', () => {
        expect(calculateTotal(100, 0.2)).toBe(120);
        expect(calculateTotal(50, 0.1)).toBe(55);
    });

    it('should throw an error for negative price', () => {
        expect(() => calculateTotal(-10, 0.2)).toThrow('Invalid input');
    });

    it('should throw an error for negative tax rate', () => {
        expect(() => calculateTotal(100, -0.1)).toThrow('Invalid input');
    });
});`,
        mocha: `const { expect } = require('chai');
const { calculateTotal } = require('./source');

describe('calculateTotal', function() {
    it('should calculate total with tax correctly', function() {
        expect(calculateTotal(100, 0.2)).to.equal(120);
    });

    it('should throw an error for negative inputs', function() {
        expect(() => calculateTotal(-10, 0.2)).to.throw('Invalid input');
    });
});`,
        vitest: `import { describe, it, expect } from 'vitest';
import { calculateTotal } from './source';

describe('calculateTotal', () => {
    it('calculates total correctly', () => {
        expect(calculateTotal(100, 0.2)).toBe(120);
    });
    
    it('throws on invalid inputs', () => {
        expect(() => calculateTotal(-1, 0.2)).toThrowError('Invalid input');
    });
});`,
        pytest: `import pytest
from source import calculate_total

def test_calculate_total_success():
    assert calculate_total(100, 0.2) == 120

def test_calculate_total_negative_price():
    with pytest.raises(ValueError, match='Invalid input'):
        calculate_total(-10, 0.2)`
    },
    integration: {
        jest: `import request from 'supertest';
import app from './app';

describe('POST /api/calculate', () => {
    it('should respond with 200 and calculated total', async () => {
        const response = await request(app)
            .post('/api/calculate')
            .send({ price: 100, taxRate: 0.2 });
            
        expect(response.status).toBe(200);
        expect(response.body.total).toBe(120);
    });
});`,
        vitest: `// Vitest integration mock
import { describe, test, expect } from 'vitest';
import { api } from './api';

describe('API Integration', () => {
    test('calculate endpoint', async () => {
        const res = await api.post('/calculate', { price: 100, taxRate: 0.2 });
        expect(res.data.total).toBe(120);
    });
});`
    },
    e2e: {
        jest: `// Puppeteer / Playwright E2E with Jest
describe('Checkout Flow E2E', () => {
    it('should calculate total on the frontend', async () => {
        await page.goto('http://localhost:3000/checkout');
        await page.type('#price-input', '100');
        await page.type('#tax-input', '0.2');
        await page.click('#calculate-btn');
        
        const result = await page.$eval('#total-output', el => el.textContent);
        expect(result).toBe('120');
    });
});`,
        vitest: `// Playwright + Vitest E2E
import { test, expect } from '@playwright/test';

test('Checkout calculation', async ({ page }) => {
    await page.goto('/checkout');
    await page.fill('#price-input', '100');
    await page.fill('#tax-input', '0.2');
    await page.click('#calculate-btn');
    
    await expect(page.locator('#total-output')).toHaveText('120');
});`
    }
};

export function getMockTest(framework, type) {
    // Fallback logic
    if (mockTemplates[type] && mockTemplates[type][framework]) {
        return mockTemplates[type][framework];
    }
    
    // Default fallback if combination doesn't exist in mock
    return `// Tests pour ${framework} (${type}) non disponibles dans ce mock.
// Essayez Jest + Unitaire pour voir un exemple complet.`;
}
