import { useSyncExternalStore } from 'react'

/** Mini store reactivo, sin dependencias */
export function createStore<T>(initial: T) {
  let state = initial
  const subs = new Set<() => void>()
  return {
    get: () => state,
    set: (next: T | ((s: T) => T)) => {
      state = typeof next === 'function' ? (next as (s: T) => T)(state) : next
      subs.forEach((f) => f())
    },
    subscribe: (f: () => void) => {
      subs.add(f)
      return () => subs.delete(f)
    },
  }
}

export function useStore<T>(store: ReturnType<typeof createStore<T>>) {
  return useSyncExternalStore(store.subscribe, store.get, store.get)
}

export function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
export function safeWrite(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* modo privado: la demo sigue funcionando en memoria */
  }
}
