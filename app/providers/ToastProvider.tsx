"use client";

import React, { useEffect } from "react";
import { toast } from "../components/Toast";
import { setToastFunction } from "../api";

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  useEffect(() => {
    setToastFunction(toast);
  }, []);

  return <>{children}</>;
};
