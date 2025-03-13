"use client";

import { Button } from "../button";
import { Loader2 } from "lucide-react";

export function LoadingButton({
  children,
  loading,
  loadingText = "Processando...",
  className = "",
  ...props
}) {
  return (
    <Button
      className={`relative ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}