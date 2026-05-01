# GitLab & Email MCP Server

A robust Model Context Protocol (MCP) server designed to streamline daily reporting by integrating GitLab activity tracking with a secure Email notification system. This project follows the **Clean Architecture** principles to ensure maintainability, scalability, and testability.

---

## 🚀 Overview

This server provides a set of tools for Large Language Models (LLMs) and developers to interact with GitLab repositories and send automated reports via SMTP. It is built using the **Bun** runtime and **TypeScript** for high performance and type safety.

## ✨ Key Features

### 1. GitLab Integration

- `gitlab_list_projects`: Retrieve a comprehensive list of accessible GitLab projects.
- `gitlab_list_branches`: Fetch all branches for a specific project.
- `gitlab_get_commits`: Retrieve recent commit history and metadata.

### 2. Email Notification System

- `send_email`: Send formatted daily reports or notifications via SMTP (supports Yahoo Bizmail, Gmail, and other providers).

### 3. Dual Execution Modes

- **MCP Mode**: Standard interface for MCP-compliant clients (Gemini, Claude Desktop, etc.).
- **CLI Mode**: Interactive Command Line Interface for manual execution and testing.

---

## 🛠️ Installation & Setup

### Prerequisites

- [Bun](https://bun.sh/) (v1.0.0 or higher)

### Step 1: Install Dependencies

```bash
bun install
```

### Step 2: Environment Configuration

Create a `.env` file in the root directory and configure the following variables:

```env
GITLAB_URL=https://your-gitlab-instance.com/api/v4
GITLAB_TOKEN=your_personal_access_token
SMTP_USER=your_email@example.com
SMTP_PASSWORD=your_app_password
```

---

## 📖 Usage

### Running as an MCP Server

To start the server using the standard input/output transport:

```bash
bun run index.ts
```

### Running as a CLI Tool

To execute specific commands manually via the terminal:

```bash
bun cli.ts list-projects
bun cli.ts list-branches <project_id>
bun cli.ts get-commits <project_id> <branch_name>
bun cli.ts send-email <to> <subject> <message> <title>
```

---

## 🤖 MCP Client Registration

To register this server with a Gemini or Claude CLI client, use the following configuration:

```bash
gemini mcp add daily-report-server \
  --env GITLAB_URL="https://..." \
  --env GITLAB_TOKEN="..." \
  --env SMTP_USER="..." \
  --env SMTP_PASSWORD="..." \
  bun run /absolute/path/to/project/index.ts
```

---

## 🛡️ License

This project is licensed under the MIT License.
