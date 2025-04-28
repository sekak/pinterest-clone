import { vi } from 'vitest'

export const mockLoading = () => {
  vi.mock('@/utils/loading', () => ({
    default: () => {
      return <h1>Loading...</h1>;
    }
  }));
};