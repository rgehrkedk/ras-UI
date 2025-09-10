import React from "react";
import { Icon } from "@ras-ui/react";

export function StatPill({
  icon,
  value,
  label,
  gradient,
}: {
  icon: string;
  value: string;
  label: string;
  gradient?: string;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        borderRadius: 999,
        border: "1px solid var(--color-semantic-border-default)",
        background:
          gradient ||
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0))",
        boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
      }}
    >
      <Icon name={icon as any} />
      <div style={{ display: "grid", lineHeight: 1 }}>
        <strong style={{ fontSize: "1.05rem" }}>{value}</strong>
        <span
          style={{
            color: "var(--color-semantic-text-secondary)",
            fontSize: "0.8rem",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export default StatPill;
