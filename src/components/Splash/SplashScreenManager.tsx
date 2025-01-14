'use client';
import SplashScreen from '@/components/Splash/SplashScreen';
import { Children, useEffect, useState } from 'react';

interface SplashScreenManagerProps {
  children: React.ReactNode;
}

export default function SplashScreenManager({
  children,
}: SplashScreenManagerProps) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  const finishLoading = () => {
    setShowSplash(false);
  };
  return showSplash ? (
    <SplashScreen finishLoading={finishLoading} />
  ) : (
    <>{children}</>
  );
}
