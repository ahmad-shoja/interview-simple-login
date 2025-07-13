"use client";

import React from "react";
import { Toaster as HotToaster, toast as hotToast } from "react-hot-toast";
import styles from "./index.module.sass";

// Custom toast types
export type ToastType = "success" | "error" | "warning" | "info";

// Custom toast function
export const toast = {
  success: (message: string, options?: any) => {
    return hotToast.success(message, {
      duration: 4000,
      style: {
        background: "#10b981",
        color: "#ffffff",
        border: "1px solid #059669",
      },
      iconTheme: {
        primary: "#ffffff",
        secondary: "#10b981",
      },
      ...options,
    });
  },

  error: (message: string, options?: any) => {
    return hotToast.error(message, {
      duration: 5000,
      style: {
        background: "#ef4444",
        color: "#ffffff",
        border: "1px solid #dc2626",
      },
      iconTheme: {
        primary: "#ffffff",
        secondary: "#ef4444",
      },
      ...options,
    });
  },

  warning: (message: string, options?: any) => {
    return hotToast(message, {
      duration: 4000,
      icon: "⚠️",
      style: {
        background: "#f59e0b",
        color: "#ffffff",
        border: "1px solid #d97706",
      },
      ...options,
    });
  },

  info: (message: string, options?: any) => {
    return hotToast(message, {
      duration: 3000,
      icon: "ℹ️",
      style: {
        background: "#3b82f6",
        color: "#ffffff",
        border: "1px solid #2563eb",
      },
      ...options,
    });
  },

  loading: (message: string, options?: any) => {
    return hotToast.loading(message, {
      style: {
        background: "#6b7280",
        color: "#ffffff",
        border: "1px solid #4b5563",
      },
      ...options,
    });
  },

  dismiss: (toastId: string) => {
    hotToast.dismiss(toastId);
  },
};

// Toast container component
export const Toaster: React.FC = () => {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        className: styles.toast,
        duration: 4000,
        style: {
          background: "#1f2937",
          color: "#f9fafb",
          border: "1px solid #374151",
          borderRadius: "8px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
      }}
    />
  );
};

export default Toaster;
