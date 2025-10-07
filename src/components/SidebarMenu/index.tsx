"use client";

import cn from "@/utils/cn";
import { ChevronDown, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  children?: MenuItem[];
}

export interface SidebarMenuProps {
  /**
   * Is the sidebar open
   */
  isOpen: boolean;
  /**
   * Callback when sidebar should close
   */
  onClose: () => void;
  /**
   * Menu items
   */
  items: MenuItem[];
  /**
   * Sidebar title
   */
  title?: string;
  /**
   * Additional class name
   */
  className?: string;
}

const SidebarMenu = ({
  isOpen,
  onClose,
  items,
  title = "Menu",
  className = "",
}: SidebarMenuProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle mount/unmount with animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Delay to trigger animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Wait for animation to finish before unmounting
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      toggleExpanded(item.id);
    } else {
      item.onClick?.();
      if (item.href) {
        onClose();
      }
    }
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const paddingLeft = level * 16 + 16;

    return (
      <div key={item.id}>
        <button
          onClick={() => handleItemClick(item)}
          className={cn(
            "flex w-full cursor-pointer items-center justify-between gap-3 py-3 text-left transition-colors",
            "hover:bg-gray-100",
            level === 0 && "border-b border-gray-200",
          )}
          style={{ paddingLeft: `${paddingLeft}px`, paddingRight: "16px" }}
        >
          <div className="flex items-center gap-3">
            {item.icon && (
              <span className="flex-shrink-0 text-gray-600">{item.icon}</span>
            )}
            <span className="text-sm font-medium text-gray-900">
              {item.label}
            </span>
          </div>
          {hasChildren && (
            <ChevronDown
              size={16}
              className={cn(
                "flex-shrink-0 text-gray-500 transition-transform",
                isExpanded && "rotate-180",
              )}
            />
          )}
        </button>

        {/* Nested items */}
        {hasChildren && (
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              isExpanded ? "max-h-screen" : "max-h-0",
            )}
          >
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black transition-opacity duration-300",
          isVisible ? "opacity-50" : "opacity-0",
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Sidebar */}
      <aside
        aria-labelledby="sidebar-title"
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-2xl transition-transform duration-300",
          isVisible ? "translate-x-0" : "translate-x-full",
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2
            id="sidebar-title"
            className="text-lg font-semibold text-gray-900"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className={cn(
              "flex cursor-pointer items-center justify-center rounded p-1 transition-colors",
              "text-gray-500 hover:bg-gray-100 hover:text-gray-700",
            )}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="h-[calc(100%-65px)] overflow-y-auto">
          {items.map((item) => renderMenuItem(item))}
        </nav>
      </aside>
    </>
  );
};

export default SidebarMenu;
