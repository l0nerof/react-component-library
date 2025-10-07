"use client";

import cn from "@/utils/cn";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export interface ToastProps {
  /**
   * Type of the toast
   */
  type?: "success" | "error" | "warning" | "info";
  /**
   * Toast message
   */
  message: string;
  /**
   * Toast description (optional)
   */
  description?: string;
  /**
   * Duration in milliseconds (0 means no auto-dismiss)
   */
  duration?: number;
  /**
   * Show close button
   */
  closable?: boolean;
  /**
   * Callback when toast is closed
   */
  onClose?: () => void;
  /**
   * Additional class name
   */
  className?: string;
}

const Toast = ({
  type = "info",
  message,
  description,
  duration = 3000,
  closable = true,
  onClose,
  className = "",
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    setIsVisible(true);

    // Auto-dismiss after duration
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  const icons = {
    success: <CheckCircle2 size={20} />,
    error: <AlertCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />,
  };

  const styles = {
    success: {
      container: "border-green-500 bg-green-200",
      icon: "text-green-600",
      text: "text-green-900",
      description: "text-green-700",
      closeButton: "text-green-600 hover:bg-green-100",
    },
    error: {
      container: "border-red-500 bg-red-200",
      icon: "text-red-600",
      text: "text-red-900",
      description: "text-red-700",
      closeButton: "text-red-600 hover:bg-red-100",
    },
    warning: {
      container: "border-yellow-500 bg-yellow-200",
      icon: "text-yellow-600",
      text: "text-yellow-900",
      description: "text-yellow-700",
      closeButton: "text-yellow-600 hover:bg-yellow-100",
    },
    info: {
      container: "border-blue-500 bg-blue-200",
      icon: "text-blue-600",
      text: "text-blue-900",
      description: "text-blue-700",
      closeButton: "text-blue-600 hover:bg-blue-100",
    },
  };

  const currentStyle = styles[type];

  if (!isVisible && !isExiting) return null;

  return (
    <div
      role="alert"
      className={cn(
        "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border-l-4 p-4 shadow-lg transition-all duration-300",
        currentStyle.container,
        isVisible && !isExiting
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0",
        !description && "items-center",
        className,
      )}
    >
      {/* Icon */}
      <div className={cn("flex-shrink-0", currentStyle.icon)}>
        {icons[type]}
      </div>

      {/* Content */}
      <div className="flex-1 gap-1">
        <p className={cn("text-sm font-semibold", currentStyle.text)}>
          {message}
        </p>
        {description && (
          <p className={cn("text-sm", currentStyle.description)}>
            {description}
          </p>
        )}
      </div>

      {/* Close Button */}
      {closable && (
        <button
          type="button"
          onClick={handleClose}
          className={cn(
            "flex-shrink-0 cursor-pointer rounded p-1 transition-colors",
            currentStyle.closeButton,
          )}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default Toast;
