// test/__mocks__/mockErrorServer.ts
import { vi } from 'vitest'


export const mockErrorServer = () => {
  vi.mock('@/components/handleErr/ErrorServer')
}

