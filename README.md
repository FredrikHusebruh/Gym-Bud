# Gym Bud

A personal fitness tracking app for planning and logging workouts.

## Background

Gym Bud was built as a personal project during the easter break 2026, to explore full-stack development with a modern cloud-native stack. The goal was to create a mobile-first app where users can create workout templates, track exercises, and manage their training over time — authenticated and personalised per user.

## How to run locally

### Prerequisites
- .NET 9 SDK
- Node.js 20+
- A Supabase project (for auth + database)

### Backend

The database runs in a personal Supabase project. You'd need to set the following user secrets before running:

```bash
cd Bud/Bud.Api
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "<your supabase connection string>"
dotnet user-secrets set "Authentication:Authority" "https://<your-project>.supabase.co/auth/v1"
dotnet user-secrets set "Authentication:ValidIssuer" "https://<your-project>.supabase.co/auth/v1"
dotnet user-secrets set "Authentication:ValidAudience" "authenticated"
dotnet run
```

Backend runs on `http://localhost:5000`.

### Frontend

Create `Bud/BudApp/.env` with your Supabase credentials:

```
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

Then run:

```bash
cd Bud/BudApp
npm install
npm run dev
```
---

## Architecture

```
┌─────────────────────┐        ┌──────────────────────┐
│   React Frontend    │  HTTP  │   .NET 9 Backend     │
│  (TypeScript/Vite)  │───────▶│   (ASP.NET Core)     │
└─────────────────────┘        └──────────┬───────────┘
                                           │ Dapper + Npgsql
                                           ▼
                                ┌──────────────────────┐
                                │      Supabase        │
                                │  (Postgres + Auth)   │
                                └──────────────────────┘
```

### Frontend — `Bud/BudApp`
- **React 19** with **TypeScript**
- **Tailwind CSS v4** for styling
- **Vite** as the build tool
- **Supabase JS client** for authentication (sign up, login, session management)
- JWT access tokens from Supabase are attached to every authenticated API request via a shared `apiFetch` wrapper

### Backend — `Bud/Bud.Api`
- **ASP.NET Core 9** Web API
- **Dapper** for SQL queries against Postgres
- **Npgsql** as the Postgres driver
- **JWT Bearer authentication** — validates Supabase-issued ES256 tokens via JWKS (fetched automatically from the Supabase Authority URL)
- User identity is extracted from the JWT `sub` claim on every protected request
- Ownership checks are enforced at the SQL level (`INSERT...SELECT...WHERE user_id = @UserId`)

### Database — Supabase (Postgres)
More later...

## CI/CD

Deployments are triggered automatically on push to `main` via **GitHub Actions** (`.github/workflows/deploy.yml`).

### Pipeline steps
1. Build and push **backend** Docker image to **Azure Container Registry**
2. Update **`budapi`** Azure Container App with the new image
3. Build and push **frontend** Docker image (`VITE_API_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` baked in at build time via build args)
4. Update **`budapp`** Azure Container App with the new image

### Required GitHub secrets

| Secret | Description |
|--------|-------------|
| `AZURE_CREDENTIALS` | Azure service principal JSON |
| `AZURE_REGISTRY_NAME` | Azure Container Registry name |
| `AZURE_REGISTRY_USERNAME` | ACR username |
| `AZURE_REGISTRY_PASSWORD` | ACR password |
| `BACKEND_URL` | Public URL of the deployed backend |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/publishable key |

### Infrastructure
- **Azure Container Registry** — stores Docker images
- **Azure Container Apps** — runs both `budapi` and `budapp` as serverless containers
- Environment variables (connection strings, JWT config, CORS origins) are configured directly on the Container Apps
