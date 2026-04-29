"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}

export function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  href,
  target,
  rel,
}: ButtonProps) {
  const baseStyles =
  "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 shadow-sm",
    secondary:
      "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700",
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`${baseStyles} ${variants[variant]}`}
      >
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {icon}
      {children}
    </button>
  );
}