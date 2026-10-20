import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { LANGUAGE_STORAGE_KEY } from '../i18n/languages'

export const TEST_LANGUAGE = 'pt'

const REDUCED_MOTION_FRAGMENT = 'prefers-reduced-motion'
const LIGHT_SCHEME_FRAGMENT = 'prefers-color-scheme: light'
const DARK_SCHEME_FRAGMENT = 'prefers-color-scheme: dark'

function resolveMatch(query, { prefersLight, prefersReducedMotion }) {
  if (query.includes(REDUCED_MOTION_FRAGMENT)) return prefersReducedMotion
  if (query.includes(LIGHT_SCHEME_FRAGMENT)) return prefersLight
  if (query.includes(DARK_SCHEME_FRAGMENT)) return !prefersLight
  return false
}

export function mockMatchMedia({ prefersLight = false, prefersReducedMotion = false } = {}) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: resolveMatch(query, { prefersLight, prefersReducedMotion }),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

class IntersectionObserverStub {
  constructor(callback) {
    this.callback = callback
  }

  observe() {}

  unobserve() {}

  disconnect() {}

  takeRecords() {
    return []
  }
}

beforeEach(() => {
  mockMatchMedia()
  window.IntersectionObserver = IntersectionObserverStub
  window.scrollTo = vi.fn()
  document.documentElement.removeAttribute('data-theme')
  localStorage.clear()
  localStorage.setItem(LANGUAGE_STORAGE_KEY, TEST_LANGUAGE)
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})
