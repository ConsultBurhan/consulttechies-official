import { ViewTransition, type ReactNode } from "react";

/** Wraps a page so route changes fade the old page out and the new one in with a slight rise. */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
