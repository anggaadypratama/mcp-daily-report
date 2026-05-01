import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { DailyReportMcpServer } from "./app/presentation/mcp/mcp.server.js";

async function main() {
  const mcpServer = new DailyReportMcpServer();
  const server = mcpServer.getServer();
  
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Daily report MCP Server running on stdio (Clean Architecture Mode)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
