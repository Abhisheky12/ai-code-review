# 🚀 CodeOrbit – AI-Powered GitHub Code Review Platform

CodeOrbit is an AI-powered GitHub code review platform that automates Pull Request reviews using Google Gemini. It integrates with GitHub using webhooks, indexes repositories in the background, retrieves relevant code context, and posts intelligent review comments directly on GitHub Pull Requests.

---

## ✨ Features

- 🔐 GitHub Authentication
- 📂 Connect GitHub Repositories
- 🔗 Automatic GitHub Webhook Integration
- 🤖 AI-powered Pull Request Reviews
- 🧠 Context-aware Code Analysis
- ⚡ Background Repository Indexing
- 💬 Automatic GitHub Review Comments
- 📊 Repository Dashboard
- 🔄 Retry-safe Background Processing with Inngest
- 🗄️ PostgreSQL Database using Prisma ORM

---

# 🛠 Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend

- Next.js API Routes
- Prisma ORM
- PostgreSQL (Neon)
- Inngest
- Octokit

### AI

- Google Gemini
- Pinecone Vector Database

### Authentication

- Better Auth

---

# 🏗 System Architecture

```mermaid
flowchart LR

User[User]

GitHub[GitHub]

App[CodeOrbit]

DB[(PostgreSQL)]

Inngest[Inngest]

Pinecone[Pinecone]

Gemini[Google Gemini]

User --> App

App --> GitHub

App --> DB

App --> Inngest

Inngest --> GitHub

Inngest --> Pinecone

Inngest --> Gemini

Gemini --> GitHub
```

---

# 🔄 Repository Connection Flow

```mermaid
sequenceDiagram

actor User

participant CodeOrbit

participant GitHub

participant PostgreSQL

participant Inngest

User->>CodeOrbit: Connect Repository

CodeOrbit->>GitHub: Authenticate

GitHub-->>CodeOrbit: Access Token

CodeOrbit->>GitHub: Create Webhook

GitHub-->>CodeOrbit: Webhook Created

CodeOrbit->>PostgreSQL: Save Repository

CodeOrbit->>Inngest: repository.connected

Inngest->>GitHub: Fetch Repository Files

GitHub-->>Inngest: Source Files

Inngest->>Pinecone: Store Repository Context
```

---

# ⚡ Repository Indexing Workflow

```mermaid
flowchart TD

A[Repository Connected]

-->

B[Trigger Inngest Event]

-->

C[Fetch Repository Files]

-->

D[Filter Files]

-->

E[Generate Embeddings]

-->

F[Store in Pinecone]

-->

G[Repository Ready]
```

---

# 🤖 Pull Request Review Workflow

```mermaid
sequenceDiagram

actor Developer

participant GitHub

participant CodeOrbit

participant Inngest

participant Pinecone

participant Gemini

Developer->>GitHub: Open / Update Pull Request

GitHub->>CodeOrbit: Webhook Event

CodeOrbit->>Inngest: Trigger Review Job

Inngest->>GitHub: Fetch PR Diff

GitHub-->>Inngest: Changed Files

Inngest->>Pinecone: Retrieve Repository Context

Pinecone-->>Inngest: Relevant Context

Inngest->>Gemini: PR Diff + Context

Gemini-->>Inngest: AI Review

Inngest->>GitHub: Post Review Comments
```

---

# 🚀 Complete Workflow

```mermaid
flowchart TD

A[User Login]

-->

B[Connect Repository]

-->

C[GitHub OAuth]

-->

D[Create Webhook]

-->

E[Save Repository]

-->

F[Index Repository]

-->

G[Developer Creates Pull Request]

-->

H[GitHub Sends Webhook]

-->

I[Trigger Inngest Review Workflow]

-->

J[Fetch Pull Request Diff]

-->

K[Retrieve Relevant Context]

-->

L[Google Gemini Analysis]

-->

M[Generate Review]

-->

N[Post Comments to GitHub]
```

---

# 📂 Project Structure

```text
src
│
├── app
│   ├── api
│   ├── dashboard
│   ├── login
│   └── settings
│
├── actions
├── components
├── inngest
├── lib
├── modules
│   ├── ai
│   ├── auth
│   ├── github
│   ├── repository
│   ├── review
│   ├── payment
│   └── settings
│
├── prisma
└── types
```

---

# ⚙ How It Works

### 1. Connect Repository

- Authenticate with GitHub.
- Select a repository.
- Create a GitHub webhook.
- Store repository information in PostgreSQL.

### 2. Repository Indexing

- Trigger an Inngest background workflow.
- Fetch repository source code.
- Process supported files.
- Generate vector embeddings.
- Store repository context in Pinecone.

### 3. Pull Request Review

- Developer opens or updates a Pull Request.
- GitHub sends a webhook event.
- Inngest starts the review workflow.
- Fetch the Pull Request diff.
- Retrieve relevant repository context.
- Google Gemini analyzes the changes.
- AI-generated review comments are posted back to GitHub.

---

# 🚀 Getting Started

```bash
git clone https://github.com/your-username/codeorbit.git

cd codeorbit

npm install

npm run dev
```

---

# 🔑 Environment Variables

```env
DATABASE_URL=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GEMINI_API_KEY=

BETTER_AUTH_SECRET=

PINECONE_API_KEY=

INNGEST_EVENT_KEY=

NEXT_PUBLIC_APP_URL=
```

---

---

# 👨‍💻 Author

**Abhishek Yadav**

Final Year B.Tech CSE Student  
Full Stack Developer | MERN | AI | Competitive Programmer
