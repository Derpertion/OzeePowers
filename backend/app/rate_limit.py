import threading
import time
from collections import defaultdict, deque


class InMemoryRateLimiter:
    """Per-process sliding-window limiter.

    This is intentionally simple for the showcase MVP. If the API runs with
    multiple workers or instances, move the counter to a shared store.
    """

    def __init__(self, limit: int, window_seconds: int = 3600) -> None:
        self.limit = limit
        self.window_seconds = window_seconds
        self._hits: dict[str, deque[float]] = defaultdict(deque)
        self._lock = threading.Lock()

    def allow(self, key: str) -> bool:
        now = time.monotonic()
        cutoff = now - self.window_seconds

        with self._lock:
            hits = self._hits[key]
            while hits and hits[0] < cutoff:
                hits.popleft()

            if len(hits) >= self.limit:
                return False

            hits.append(now)
            return True

    def reset(self) -> None:
        with self._lock:
            self._hits.clear()
