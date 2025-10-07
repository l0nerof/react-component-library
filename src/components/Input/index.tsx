"use client";

import cn from "@/utils/cn";
import { Eye, EyeOff, X } from "lucide-react";
import React, { InputHTMLAttributes, useRef, useState } from "react";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /**
   * Type of the input
   */
  type?: "text" | "password" | "number" | "email" | "tel";
  /**
   * Show the clear button
   */
  clearable?: boolean;
  /**
   * Placeholder
   */
  placeholder?: string;
  /**
   * Value of the input
   */
  value?: string;
  /**
   * Change handler
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Is the input disabled
   */
  disabled?: boolean;
  /**
   * Label for the input
   */
  label?: string;
  /**
   * Error text
   */
  error?: string;
  /**
   * Additional class name
   */
  className?: string;
}

const Input = ({
  type = "text",
  clearable = false,
  placeholder,
  value,
  onChange,
  disabled = false,
  label,
  error,
  className = "",
  ...rest
}: InputProps) => {
  const [internalValue, setInternalValue] = useState(value || "");
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleClear = () => {
    const syntheticEvent = {
      target: { value: "" },
      currentTarget: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;

    if (!isControlled) {
      setInternalValue("");
    }
    onChange?.(syntheticEvent);
    inputRef.current?.focus();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  const showClearButton = clearable && currentValue && !disabled;
  const showPasswordToggle = type === "password" && currentValue && !disabled;

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      {label && (
        <label
          className={cn(
            "text-sm font-medium text-gray-500",
            disabled && "cursor-not-allowed opacity-60",
          )}
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          "relative flex items-center rounded-lg border-2 bg-white transition-all",
          "focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100",
          error
            ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-100"
            : "border-gray-300",
          disabled && "cursor-not-allowed bg-gray-100 opacity-60",
        )}
      >
        <input
          ref={inputRef}
          type={inputType}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "min-w-0 flex-1 bg-transparent px-3 py-2 text-base text-gray-800",
            "border-none outline-none placeholder:text-gray-400",
            "disabled:cursor-not-allowed",
          )}
          {...rest}
        />
        <div className="mr-2 flex items-center gap-1">
          {showClearButton && (
            <button
              type="button"
              onClick={handleClear}
              className={cn(
                "flex items-center justify-center rounded p-1",
                "cursor-pointer border-none bg-transparent text-gray-500",
                "transition-all hover:bg-gray-100 hover:text-gray-700",
              )}
              aria-label="Clear the input"
            >
              <X size={16} />
            </button>
          )}
          {showPasswordToggle && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={cn(
                "flex items-center justify-center rounded p-1",
                "cursor-pointer border-none bg-transparent text-gray-500",
                "transition-all hover:bg-gray-100 hover:text-gray-700",
              )}
              aria-label={
                showPassword ? "Hide the password" : "Show the password"
              }
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
