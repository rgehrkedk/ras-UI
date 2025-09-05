#!/usr/bin/env node
/*
  Scaffold a new component folder under packages/react/src/components.
  Usage: node scripts/scaffold-component.js ComponentName
*/
const fs = require('fs');
const path = require('path');

const name = process.argv[2];
if (!name) {
  console.error('Usage: node scripts/scaffold-component.js ComponentName');
  process.exit(1);
}

const ROOT = path.join(__dirname, '..');
const COMP_DIR = path.join(ROOT, 'packages', 'react', 'src', 'components', name);

if (fs.existsSync(COMP_DIR)) {
  console.error('Component folder already exists:', COMP_DIR);
  process.exit(1);
}
fs.mkdirSync(COMP_DIR, { recursive: true });

function w(file, content) {
  fs.writeFileSync(path.join(COMP_DIR, file), content, 'utf8');
}

const pascal = name;
const kebab = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

w(`${pascal}.tsx`, `import React from 'react';
import { cn } from '../../utils/cn';
import * as styles from './${pascal}.css';

export interface ${pascal}Props {
  className?: string;
  children?: React.ReactNode;
}

export const ${pascal}: React.FC<${pascal}Props> = ({ className, children, ...props }) => {
  return (
    <div className={cn(styles.root, className)} {...props}>
      {children}
    </div>
  );
};

${pascal}.displayName = '${pascal}';

export default ${pascal};
`);

w(`${pascal}.css.ts`, `import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'block',
});
`);

w(`${pascal}.stories.tsx`, `import type { Meta, StoryObj } from '@storybook/react';
import { ${pascal} } from './${pascal}';

const meta: Meta<typeof ${pascal}> = {
  title: 'Components/${pascal}',
  component: ${pascal},
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '${pascal} basic component stub.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ${pascal}>;

export const Basic: Story = {
  render: (args) => <${pascal} {...args}>Hello ${pascal}</${pascal}>,
};
`);

w(`${pascal}.test.tsx`, `import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { ${pascal} } from './${pascal}';

describe('${pascal}', () => {
  it('renders children', () => {
    render(<${pascal}>Content</${pascal}>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
`);

w('index.ts', `export { ${pascal} } from './${pascal}';
export type { ${pascal}Props } from './${pascal}';
`);

console.log('Scaffolded component at', COMP_DIR);

