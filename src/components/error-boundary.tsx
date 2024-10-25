"use client";

import { isRedirectError } from "next/dist/client/components/redirect";
import { ErrorBoundary } from "react-error-boundary";

export default function CustomErrorBoundary({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => {
        if (isRedirectError(error)) {
          throw error;
        } else return fallback;
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
