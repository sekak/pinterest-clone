import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('App', () => {
  it('calculates the sum of 1 and 2 correctly', () => {
    const sum = 1 + 2;
    expect(sum).toBe(3);
  }
  );
});