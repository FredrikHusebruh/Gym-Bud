# Gym Bud

A personal fitness tracking app for planning and logging workouts.

<div align="center">
<table>
  <tr>
    <td><img width="180" alt="IMG_6670" src="https://github.com/user-attachments/assets/a86f3ab9-61bd-48f8-94f4-2ddfea3f69b2" /></td>
    <td><img width="180" alt="IMG_6666" src="https://github.com/user-attachments/assets/689bbded-d8ea-462f-941c-a2da064517fb" /></td>
    <td><img width="180" alt="IMG_6667" src="https://github.com/user-attachments/assets/904f97c8-1b17-4193-9fb2-8d1cca6c7732" /></td>
    <td><img width="180" alt="IMG_6669" src="https://github.com/user-attachments/assets/08d95492-f9f3-4b3e-b4f5-c55e52fcc7ab" /></td>
    <td><img width="180" alt="IMG_6668" src="https://github.com/user-attachments/assets/b4f8134a-8875-4616-8412-c39104e15176" /></td>
    <td><img width="180" alt="IMG_6672" src="https://github.com/user-attachments/assets/11915e17-5afe-423e-b106-1d6291bb1bd7" /></td>
    <td><img width="180" alt="IMG_6671" src="https://github.com/user-attachments/assets/80970490-93ee-41d8-891b-aaf6a74ce0b9" /></td>
  </tr>
</table>
</div>

The Azure Container App has cold starts as it scales to zero, so the first load might be slow for visitors. [Check out the project here](https://budapp.gentlesand-7c9a41c5.norwayeast.azurecontainerapps.io/)


## Background

Gym Bud was built as a personal project during the easter break 2026, to explore full-stack development with a modern cloud-native stack. The goal was to create a mobile-first app where users can create workout templates, track exercises, and manage their training over time — authenticated and personalised per user.


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
