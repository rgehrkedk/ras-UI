import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { KeyboardShortcut } from './KeyboardShortcut';

const meta: Meta<typeof KeyboardShortcut> = {
  title: 'Components/KeyboardShortcut',
  component: KeyboardShortcut,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Lightweight, platform‑aware shortcut label and optional handler. Renders a compact “kbd” chip and (optionally) binds a key combo to an action.\n\n'
          + 'Use inline for quick hints, or set `align="end"` in menus to right‑align the chip.\n\n'
          + '### When To Use\n'
          + '- Inline hints for power actions: show the shortcut next to the action label (e.g., “Edit ⌘E”) to teach muscle memory.\n'
          + '- Menus and command palettes: right‑align with `align="end"` for clean scanning; bind `onTrigger` only while the context is active.\n'
          + '- Power‑user workflows: mount app‑level shortcuts for frequent actions; keep `ignoreWhenTyping` enabled to avoid conflicts in inputs.\n'
          + '- Discoverability: render the chip without `onTrigger` first to introduce shortcuts before global binding.\n\n'
          + '### When Not To Use\n'
          + '- Avoid overriding common browser/OS combos (e.g., `mod+W`, `mod+R`, `mod+Tab`, `F5`).\n'
          + '- Don’t show irrelevant shortcuts; only display those that actually work in the current context.\n'
          + '- Don’t trigger while typing — leave `ignoreWhenTyping` at its default (true).\n\n'
          + '### Scope & Binding\n'
          + '- **Scoped (preferred):** Mount within the active context (menu/dialog/section) so it unbinds on unmount.\n'
          + '- **Global:** Mount at the app shell only for core shortcuts; consider a help panel listing app‑wide combos.\n\n'
          + '### Design & Placement\n'
          + '- Alignment: inline next to labels; `align="end"` for menus/lists.\n'
          + '- Consistency: reuse combos (e.g., `mod+K` for command palette).\n'
          + '- Readability: keep chips short; component uses tabular numerals and a subtle border.\n\n'
          + '### Examples\n'
          + '```tsx\n'
          + '// Inline\n'
          + '<KeyboardShortcut combo="mod+K" />\n\n'
          + '// Right‑aligned in a menu\n'
          + '<MenuItem>\n'
          + '  Rename\n'
          + '  <KeyboardShortcut combo="mod+E" align="end" />\n'
          + '</MenuItem>\n\n'
          + '// Functional\n'
          + '<KeyboardShortcut combo="mod+Backspace" onTrigger={handleDelete} />\n'
          + '```',
      },
    },
  },
  argTypes: {
    combo: {
      control: { type: 'select' },
      options: ['mod+E', 'mod+C', 'mod+K', 'mod+Backspace', 'shift+alt+S', 'K', 'Enter', 'Escape', 'F1', 'space'],
      description: 'Key combo (platform-aware: ⌘ = mod on mac, Ctrl on win)',
    },
    align: {
      control: { type: 'inline-radio' },
      options: ['inline', 'end'],
    },
    ignoreWhenTyping: {
      control: { type: 'boolean' },
      description: 'Prevent triggering while typing in inputs/textarea/contentEditable',
    },
    onTrigger: {
      action: 'trigger',
      description: 'Handler fired when the combo is pressed (if provided)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KeyboardShortcut>;

export const Basic: Story = {
  args: {
    combo: 'mod+E',
    align: 'inline',
    ignoreWhenTyping: true,
  },
  render: (args) => <KeyboardShortcut {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Inline visual chip only. Use to hint available shortcuts near related UI.',
      },
    },
  },
};

export const WithTrigger: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <div style={{ display: 'inline-flex', gap: 12, alignItems: 'center' }}>
        <KeyboardShortcut combo="mod+E" onTrigger={() => setCount(c => c + 1)} />
        <span>Press ⌘E / Ctrl+E → {count}</span>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Functional binding example. Shortcut increments the counter when pressed. Defaults to ignoring keypresses while typing.',
      },
    },
  },
};

// Control-driven story to surface Actions panel events for onTrigger
export const ActionControl: Story = {
  args: {
    combo: 'mod+E',
    align: 'inline',
    ignoreWhenTyping: true,
  },
  render: (args) => <KeyboardShortcut {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Use Controls to tweak props. Press the configured combo to see an entry in the Actions panel under the "trigger" event.',
      },
    },
  },
};

export const PlainKeyTrigger: Story = {
  args: {
    ignoreWhenTyping: true
  },

  render: () => {
    const [count, setCount] = useState(0);
    return (
      <div style={{ display: 'inline-flex', gap: 12, alignItems: 'center' }}>
        <KeyboardShortcut combo="K" onTrigger={() => setCount(c => c + 1)} />
        <span>Press K → {count}</span>
      </div>
    );
  },

  parameters: {
    docs: {
      description: {
        story: 'Plain key example (no modifier). Any single letter/number, named key (Enter, Escape), function keys (F1–F12), and space are supported.',
      },
    },
  }
};
