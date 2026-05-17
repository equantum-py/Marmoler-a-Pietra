'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function AnalyticsLiveRefresh({ seconds = 10 }: { seconds?: number }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(seconds);

  useEffect(() => {
    const countdownTimer = window.setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          return seconds;
        }

        return current - 1;
      });
    }, 1000);

    const refreshTimer = window.setInterval(() => {
      router.refresh();
    }, seconds * 1000);

    return () => {
      window.clearInterval(countdownTimer);
      window.clearInterval(refreshTimer);
    };
  }, [router, seconds]);

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-pietra-border bg-white px-4 py-2 text-xs font-bold text-pietra-green shadow-sm">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pietra-green opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pietra-green" />
      </span>
      En vivo · actualiza en {countdown}s
    </div>
  );
}
