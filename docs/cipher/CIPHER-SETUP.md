# Cipher MCP Setup Instructions for ras-UI

## ✅ Completed Setup Steps

1. **Installed Cipher MCP globally**: `@byterover/cipher`
2. **Configured Claude Code**: Added Cipher MCP server to ras-UI project configuration
3. **Created configuration files**:
   - `memAgent/cipher.yml` - Tailored for ras-UI design system development
   - `.env.example` - Template for environment variables

## 🔧 Required User Action: Set Up API Keys

To activate Cipher MCP, you need to provide API keys for the LLM provider:

### Step 1: Create .env file

```bash
cp .env.example .env
```

### Step 2: Add your API keys to .env

Open `.env` and add one of these options:

**Option A: OpenAI (Recommended)**

```bash
OPENAI_API_KEY=sk-your-openai-api-key-here
```

**Option B: Anthropic Claude**

```bash
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key-here
```

### Step 3: Restart Claude Code

After adding API keys, restart Claude Code completely for the MCP server to connect.

## 🚀 Testing the Integration

Once API keys are configured, test the integration:

1. **Restart Claude Code** (important!)
2. **Check MCP connection**: Look for Cipher in the available tools
3. **Test memory capture**: Start working on design system components
4. **Verify memory retrieval**: Ask questions about previous work

## 🧠 What Cipher Will Remember

The configuration is optimized for ras-UI development:

- **Design Tokens**: Style Dictionary patterns, brand configurations
- **React Aria**: Component implementation best practices
- **vanilla-extract**: CSS-in-JS styling patterns
- **Multibrand Architecture**: Brand/theme switching mechanisms
- **Build System**: Turbo workflows, error checking patterns
- **Accessibility**: WCAG compliance strategies
- **Testing**: Unit, visual, and integration test approaches

## 📁 Configuration Files Created

- `memAgent/cipher.yml` - Main configuration optimized for design system work
- `.env.example` - Template for environment variables
- `update-claude-config.py` - Script used to configure Claude Code MCP
- `/Users/rasmus/.claude.json` - Updated with Cipher MCP server (backup created)

## 🔍 Troubleshooting

**If Cipher doesn't appear in Claude Code:**

1. Verify `.env` file has valid API keys
2. Restart Claude Code completely
3. Check that `cipher --mode mcp` runs without errors
4. Review Claude Code logs for MCP connection issues

**If memory isn't being captured:**

1. Ensure you're working in the ras-UI project directory
2. Check that file patterns in `cipher.yml` match your workflow
3. Verify API keys are valid and have usage quota

## 📚 Benefits for ras-UI Development

Once active, Cipher will:

- **Auto-capture** your design system patterns and learnings
- **Remember** React Aria implementation details across sessions
- **Retain context** about Style Dictionary and multibrand configurations
- **Share knowledge** with team members working on the same project
- **Maintain continuity** when switching between different development tasks

The memory layer will be particularly valuable for the complex ras-UI architecture with its multibrand system, React Aria components, and comprehensive tooling setup.
