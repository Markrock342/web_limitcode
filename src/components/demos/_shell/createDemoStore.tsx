"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type StoreApi<T> = {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  reset: () => void;
  hydrated: boolean;
};

export function createDemoStore<T>(storageKey: string, initialState: T) {
  const Ctx = createContext<StoreApi<T> | null>(null);

  function Provider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<T>(initialState);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) setState(JSON.parse(raw) as T);
      } catch {
        /* ignore corrupt storage */
      }
      setHydrated(true);
    }, []);

    useEffect(() => {
      if (!hydrated) return;
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
      } catch {
        /* quota / private mode */
      }
    }, [state, hydrated]);

    const reset = useCallback(() => {
      setState(initialState);
      try {
        localStorage.removeItem(storageKey);
      } catch {
        /* ignore */
      }
    }, []);

    const value = useMemo(
      () => ({ state, setState, reset, hydrated }),
      [state, reset, hydrated],
    );

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
  }

  function useStore() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error(`Demo store missing for ${storageKey}`);
    return ctx;
  }

  return { Provider, useStore };
}
