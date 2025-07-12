import { useEffect, useRef } from "react";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <div className="smooth-scroll-container">
      {children}
    </div>
  );
}
