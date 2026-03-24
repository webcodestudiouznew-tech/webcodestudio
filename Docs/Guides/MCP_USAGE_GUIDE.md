# MCP Usage Guide For Codex

Use this guide in new Codex sessions when you want Codex to actually use MCP servers instead of stopping after a shallow resource check.

## Goal

Make Codex:

- use a specific MCP server on purpose
- verify the server with a real MCP tool call
- diagnose failures from config and runtime, not only from `list_mcp_resources`

## Recommended Prompt Template

Use this exact pattern in a new session:

```text
Use MCP server <SERVER_NAME>.
First check the config with `codex mcp get <SERVER_NAME>`.
Then perform a real MCP tool call through that server.
Do not stop after `list_mcp_resources` or `list_mcp_resource_templates`.
If it fails, inspect the local MCP config and runtime cause.
```

## Examples

### Context7

```text
Use MCP server context7.
First check `codex mcp get context7`.
Then make a real MCP tool call through context7.
Do not stop after resource listing.
```

### shadcn

```text
Use MCP server shadcn.
First check `codex mcp get shadcn`.
Then make a real MCP tool call like reading project registries.
Do not stop after resource listing.
```

### chrome-devtools

```text
Use MCP server chrome-devtools.
First check `codex mcp get chrome-devtools`.
Then make a real MCP tool call such as `list_pages`.
Do not stop after resource listing.
If startup fails, inspect the local MCP config and the browser launch/runtime issue.
```

### OpenAI Developer Docs

```text
Use MCP server openaiDeveloperDocs.
First check `codex mcp get openaiDeveloperDocs`.
Then make a real MCP tool call such as `list_openai_docs`.
Do not stop after resource listing.
```

## Why This Is Needed

Some Codex sessions report MCP as unavailable too early because:

- `list_mcp_resources` can be empty even when the server tools work
- some MCP servers expose tools, not resources
- startup can be lazy or flaky
- a new session may not have enough context unless you explicitly request a real MCP call

## Minimal Diagnostic Flow

Ask Codex to do these in order:

1. `codex mcp list`
2. `codex mcp get <SERVER_NAME>`
3. a real MCP tool call through the target server
4. if failure persists, inspect:
   - `~/.codex/config.toml`
   - launch command
   - runtime logs
   - local dependencies like browser, keyring, or sandbox tools

## Strong Prompt Variant

Use this when Codex keeps giving shallow answers:

```text
Do a full MCP verification for <SERVER_NAME>.
Check `codex mcp get <SERVER_NAME>`, then execute a real MCP tool call.
Do not conclude failure only from empty resources/templates.
If it fails, identify the exact local cause from config, command, dependency, or runtime logs.
```

## Notes

- In Windows + VS Code + WSL setups, Codex may run inside WSL and use `~/.codex/config.toml` from Linux, not Windows-side MCP settings.
- `chrome-devtools` is more reliable when attached to a browser available in the same environment as Codex.
- Warnings about keyring or secret storage do not always block MCP usage, but they should still be noted.
