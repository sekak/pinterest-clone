import { vi } from 'vitest'

export const mockErrorServer = () => {
  vi.mock('@/components/handleErr/ErrorServer')
}