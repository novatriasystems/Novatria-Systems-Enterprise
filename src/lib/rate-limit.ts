export interface RateLimiter {
  check: (key: string) => boolean;
}

export function createRateLimiter({
  windowMs,
  max,
}: {
  windowMs: number;
  max: number;
}): RateLimiter {
  const store = new Map<string, number[]>();

  function purge(key: string, now: number): void {
    const timestamps = store.get(key);
    if (!timestamps) return;
    const valid = timestamps.filter((ts) => now - ts < windowMs);
    if (valid.length === 0) {
      store.delete(key);
    } else {
      store.set(key, valid);
    }
  }

  return {
    check(key: string): boolean {
      const now = Date.now();
      purge(key, now);
      const timestamps = store.get(key) ?? [];
      if (timestamps.length >= max) {
        return false;
      }
      timestamps.push(now);
      store.set(key, timestamps);
      return true;
    },
  };
}
