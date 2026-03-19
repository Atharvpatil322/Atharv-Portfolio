"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function LoadNoticeToast() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      toast("If this took few seconds to load... blame free hosting");
    }, 150);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}

