import React from "react";

import { cn } from "../../utils/cn";

import * as styles from "./Avatar.css";

export interface AvatarProps {
  /** The name to generate initials from */
  name?: string;
  /** Custom initials to display instead of generated ones */
  initials?: string;
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Size variant of the avatar */
  size?: "sm" | "md" | "lg" | "xl";
  /** Background color variant */
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  /** Custom CSS class */
  className?: string;
  /** Whether the avatar should be clickable */
  onClick?: () => void;
}

export function Avatar({
  name,
  initials,
  src,
  alt,
  size = "md",
  variant = "primary",
  className,
  onClick,
}: AvatarProps) {
  // Generate initials from name if not provided
  const displayInitials = initials || generateInitials(name);

  const handleClick = onClick ? () => onClick() : undefined;
  const isClickable = !!onClick;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={cn(
        styles.avatar,
        styles.avatarSize[size],
        styles.avatarVariant[variant],
        isClickable && styles.avatarClickable,
        className,
      )}
      onClick={handleClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || "Avatar"}
          className={styles.avatarImage}
        />
      ) : (
        <span className={styles.avatarInitials}>{displayInitials}</span>
      )}
    </div>
  );
}

function generateInitials(name?: string): string {
  if (!name) return "??";

  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}
