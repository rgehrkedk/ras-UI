import React from "react";

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        border: "1px solid var(--color-semantic-border-default)",
        borderRadius: 12,
        padding: "1rem",
        background: "var(--color-semantic-surface-raised)",
      }}
    >
      <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{value}</div>
      <div style={{ color: "var(--color-semantic-text-secondary)" }}>
        {label}
      </div>
    </div>
  );
}

export default StatCard;
