/**
 * KeyboardShortcut component
 * 
 * Lightweight, platform‑aware shortcut label and optional handler.
 * Renders a compact “kbd” chip and (optionally) binds a key combo to an action.
 * Designed for inline usage and right‑aligned chips in menus.
 *
 * Examples
 * ```tsx
 * // Inline shortcut (visual only)
 * <KeyboardShortcut combo="mod+K" />
 *
 * // Right‑aligned inside a menu item
 * <MenuItem>
 *   Edit
 *   <KeyboardShortcut combo="mod+E" align="end" />
 * </MenuItem>
 *
 * // Functional (fires handler when combo is pressed)
 * <KeyboardShortcut combo="mod+Backspace" onTrigger={handleDelete} />
 *
 * // Plain keys without modifiers
 * <KeyboardShortcut combo="K" onTrigger={() => console.log('K pressed')} />
 * <KeyboardShortcut combo="Enter" />
 * <KeyboardShortcut combo="space" />
 * ```
 */
import React, { useEffect, useMemo } from 'react';

import { shortcut, alignEnd } from './KeyboardShortcut.css';

/**
 * Props for KeyboardShortcut
 */
export interface KeyboardShortcutProps {
  /**
   * Shortcut combo string.
   * Supports modifiers (mod, meta, ctrl, alt/option, shift) and keys (letters/numbers, Enter, Escape, Backspace, Arrow*, F1–F12, space).
   * Examples: `mod+E`, `mod+Backspace`, `shift+alt+S`, `K`, `Enter`, `space`.
   */
  combo: string; // e.g., 'mod+E', 'shift+alt+S', 'mod+Backspace'
  /** Optional custom display label (overrides automatic formatting). */
  label?: string; // optional custom label
  /** Optional handler invoked on keydown when the combo matches. */
  onTrigger?: () => void; // optional handler invoked on keydown
  className?: string;
  align?: 'inline' | 'end';
  /**
   * When true, shortcut will not fire while typing in inputs/textareas/contentEditable elements.
   * @default true
   */
  ignoreWhenTyping?: boolean;
}

function isMac() {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform);
}

function formatLabel(combo: string, mac: boolean): string {
  let parts = combo.split('+').map(p => p.trim());
  parts = parts.map(p => {
    const low = p.toLowerCase();
    if (low === 'mod') return mac ? '⌘' : 'Ctrl';
    if (low === 'meta') return '⌘';
    if (low === 'ctrl') return 'Ctrl';
    if (low === 'alt' || low === 'option') return mac ? '⌥' : 'Alt';
    if (low === 'shift') return mac ? '⇧' : 'Shift';
    if (low === 'backspace') return '⌫';
    if (low === 'space') return mac ? '␣' : 'Space';
    return p.toUpperCase();
  });
  return mac ? parts.join('') : parts.join(' + ');
}

function matchesCombo(e: KeyboardEvent, combo: string): boolean {
  const mac = isMac();
  const parts = combo.split('+').map(p => p.trim().toLowerCase());
  let needMeta = false, needCtrl = false, needAlt = false, needShift = false;
  let key: string | null = null;
  for (const p of parts) {
    if (p === 'mod') { if (mac) needMeta = true; else needCtrl = true; }
    else if (p === 'meta') needMeta = true;
    else if (p === 'ctrl') needCtrl = true;
    else if (p === 'alt' || p === 'option') needAlt = true;
    else if (p === 'shift') needShift = true;
    else if (p === 'space') key = ' ';
    else key = p.length === 1 ? p.toUpperCase() : p;
  }
  const eventKey = e.key.length === 1 ? e.key.toUpperCase() : e.key;
  if (key && eventKey.toLowerCase() !== key.toLowerCase()) return false;
  if (!!needMeta !== !!e.metaKey) return false;
  if (!!needCtrl !== !!e.ctrlKey) return false;
  if (!!needAlt !== !!e.altKey) return false;
  if (!!needShift !== !!e.shiftKey) return false;
  return true;
}

/**
 * Platform‑aware keyboard shortcut chip and optional keybinding.
 */
export const KeyboardShortcut: React.FC<KeyboardShortcutProps> = ({ combo, label, onTrigger, className, align = 'inline', ignoreWhenTyping = true }) => {
  useEffect(() => {
    if (!onTrigger) return;
    const handler = (e: KeyboardEvent) => {
      if (ignoreWhenTyping) {
        const target = e.target as HTMLElement | null;
        const tag = target?.tagName?.toLowerCase();
        const isEditable = (target as HTMLElement | null)?.isContentEditable;
        if (isEditable || tag === 'input' || tag === 'textarea' || tag === 'select') {
          return;
        }
      }
      if (matchesCombo(e, combo)) {
        e.preventDefault();
        onTrigger();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [combo, onTrigger, ignoreWhenTyping]);

  const mac = isMac();
  const display = useMemo(() => label ?? formatLabel(combo, mac), [label, combo, mac]);
  return (
    <span className={[shortcut, align === 'end' ? alignEnd : '', className].filter(Boolean).join(' ')}>
      {display}
    </span>
  );
};

KeyboardShortcut.displayName = 'KeyboardShortcut';

export default KeyboardShortcut;
