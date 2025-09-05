# Cipher MCP Usage Guide for ras-UI

## 🔄 Automatic Usage (Default Mode)

Cipher MCP works automatically in the background when using Claude Code. No manual intervention needed!

**What happens automatically:**

- **Auto-captures** memories as you code and chat with Claude
- **Auto-retrieves** relevant memories based on current context
- **Maintains continuity** across all Claude Code sessions
- **Learns** design system patterns, React Aria implementations, and Style Dictionary workflows

**Just work normally on ras-UI - Cipher handles the rest!**

## 🛠️ Manual Usage Options

### 1. Command Line Interface

```bash
# Interactive mode - chat with your memory layer
cipher

# One-shot query about your project
cipher "What did I learn about React Aria components?"

# Query with specific memory search
cipher "Show me Style Dictionary multibrand patterns"

# Start new session
cipher --new-session

# Use specific configuration
cipher -a memAgent/cipher.yml
```

### 2. Web UI Mode

```bash
# Start web interface with UI
cipher --mode ui

# Custom ports
cipher --mode ui --port 3001 --ui-port 3000
```

**Then open in browser:**

- **UI**: http://localhost:3000
- **API**: http://localhost:3001/api

### 3. API Mode (for integrations)

```bash
# Start REST API + WebSocket server
cipher --mode api

# Custom configuration
cipher --mode api --port 3001 --host localhost
```

**Available endpoints:**

- **REST API**: http://localhost:3001/api
- **WebSocket**: ws://localhost:3001/ws
- **Health**: http://localhost:3001/api/health

### 4. MCP Mode (What you have configured)

```bash
# This runs automatically through Claude Code
cipher --mode mcp
```

## 🎯 Usage Examples

### Memory Search

```bash
# Search for specific design patterns
cipher "How do I implement brand switching in ras-UI?"

# Find React Aria examples
cipher "Show me accessible button implementations"

# Style Dictionary queries
cipher "What are the token naming conventions?"
```

### Project-Specific Usage

```bash
# Use ras-UI specific configuration
cipher -a memAgent/cipher.yml "Help me with multibrand theming"

# Start with project context
cipher --new-session ras-ui-development
```

## 📊 Monitoring & Debug

### Check Status

```bash
# Verify installation
cipher --version

# Test MCP mode
cipher --mode mcp --help

# Check configuration
cipher -a memAgent/cipher.yml --help
```

### Debug Mode

```bash
# Enable verbose output
cipher --verbose

# Check logs (when running as MCP server)
tail -f /var/folders/*/T/cipher-mcp.log
```

## 🔧 Configuration Files

- **Main Config**: `memAgent/cipher.yml` (ras-UI optimized)
- **Environment**: `.env` (API keys)
- **Claude Code MCP**: `~/.claude.json` (auto-configured)

## 🚀 Integration with ras-UI Development

**Automatic capture of:**

- Design token patterns and Style Dictionary workflows
- React Aria component implementations and best practices
- vanilla-extract styling techniques and patterns
- Multibrand architecture and theme switching logic
- Build automation and error handling workflows
- Accessibility patterns and WCAG compliance strategies
- Testing strategies for design systems

**Memory retrieval during:**

- Component development and debugging
- Style Dictionary token modifications
- Brand configuration updates
- Accessibility implementation
- Build system troubleshooting

## 💡 Pro Tips

1. **Ask specific questions** - Cipher learns from detailed interactions
2. **Document learnings** - Complex solutions get captured automatically
3. **Use consistent terminology** - Helps with memory retrieval
4. **Test memory recall** - Ask about previous work to verify capture
5. **Cross-session continuity** - Knowledge persists across Claude Code restarts

## 🔍 Troubleshooting

**If memories aren't capturing:**

- Check API keys in `.env` file
- Verify `memAgent/cipher.yml` exists
- Restart Claude Code completely
- Check API quota/billing status

**If MCP server not connecting:**

- Verify `cipher --mode mcp` runs without errors
- Check Claude Code configuration: `~/.claude.json`
- Ensure no port conflicts (default MCP uses stdio)
- Review logs in `/var/folders/*/T/cipher-mcp.log`
