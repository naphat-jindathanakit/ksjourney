"use client";
import { ReactNode, useEffect, useState } from "react";
import { initI18n } from "@/lib/i18n";

// Wrap the component in a context to avoid running hooks before i18n initialization
export default function TranslationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await initI18n();
      setInitialized(true);
    };
    initialize();
  }, []);

  if (!initialized) {
    // You can show a loading screen or just return null while initializing
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
