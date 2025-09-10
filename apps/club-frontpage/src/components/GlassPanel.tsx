import React from "react";

export interface GlassPanelProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  style,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        // Card-like glass without inner light layer
        background: "transparent",
        backdropFilter: "saturate(180%) blur(10px)",
        WebkitBackdropFilter: "saturate(180%) blur(10px)",
        border: "1px solid var(--color-semantic-border-default)",
        borderRadius: 16,
        padding: "1.5rem",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default GlassPanel;
