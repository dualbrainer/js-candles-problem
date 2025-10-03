import { describe, it, expect } from 'vitest';
import { packBags } from '../src/packBags.js';

function totalCandles(bags) {
  return bags.reduce((sum, b) => sum + b.size, 0);
}

function recomputeTypeTotals(bags) {
  const map = new Map();
  for (const b of bags) {
    for (const it of b.items) {
      map.set(it.type, (map.get(it.type) || 0) + it.quantity);
    }
  }
  return map;
}

describe('packBags', () => {
  it('packs the provided example optimally and preserves order', () => {
    const input = {
      batch_id: 'b1',
      items: [
        { type: 't1', quantity: 1 },
        { type: 't2', quantity: 3 },
      ],
    };
    const out = packBags(input);
    expect(out.length).toBe(2);
    expect(out[0].size).toBe(3);
    expect(out[1].size).toBe(1);
    expect(out[0].items[0].type).toBe('t1');
    const totals = recomputeTypeTotals(out);
    expect(totals.get('t1')).toBe(1);
    expect(totals.get('t2')).toBe(3);
  });

  it('returns [] for empty or all-zero', () => {
    expect(packBags({ batch_id: 'x', items: [] })).toEqual([]);
    expect(packBags({ batch_id: 'x', items: [{ type: 'a', quantity: 0 }] })).toEqual([]);
  });

  it('packs multiple types and uses minimal number of bags', () => {
    const input = {
      batch_id: 'b2',
      items: [
        { type: 'a', quantity: 2 },
        { type: 'b', quantity: 3 },
      ],
    };
    const out = packBags(input);
    expect(out.length).toBe(2);
    expect(totalCandles(out)).toBe(5);
    const totals = recomputeTypeTotals(out);
    expect(totals.get('a')).toBe(2);
    expect(totals.get('b')).toBe(3);
  });

  it('handles large counts linearly (sanity check)', () => {
    const input = {
      batch_id: 'big',
      items: [{ type: 'z', quantity: 1000 }],
    };
    const out = packBags(input);
    expect(out.length).toBe(Math.ceil(1000 / 3));
    expect(totalCandles(out)).toBe(1000);
    const totals = recomputeTypeTotals(out);
    expect(totals.get('z')).toBe(1000);
  });

  it('preserves input order when splitting across bags', () => {
    const input = {
      batch_id: 'order',
      items: [
        { type: 'x', quantity: 4 },
        { type: 'y', quantity: 2 },
      ],
    };
    const out = packBags(input);
    expect(out.length).toBe(2);
    expect(out[0].items.every(it => it.type === 'x')).toBe(true);
    expect(out[1].items[0].type).toBe('x');
    expect(out[1].items[1].type).toBe('y');
  });
});
