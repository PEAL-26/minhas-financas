import { useEffect, useState } from 'react';

const matchMedia = (query: string) => typeof window !== 'undefined' && window.matchMedia(query);

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean>(() => {
    const mql = matchMedia(query);
    if (!mql) {
      return false;
    }
    return mql.matches;
  });

  useEffect(() => {
    const mediaQueryList = matchMedia(query);
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    if (!mediaQueryList) {
      return;
    }
    mediaQueryList.addEventListener('change', handleChange);
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
