# FOXAL Frontend

> Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Zustand · React Hook Form · Zod · TanStack Query · Axios

## Stack

| Tool | Purpose |
|---|---|
| Next.js 14 App Router | Framework & routing |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations |
| Zustand | Client state (cart, auth) |
| TanStack Query | Server state & caching |
| Axios | HTTP client |
| React Hook Form + Zod | Forms & validation |
| Prettier + ESLint | Code quality |

## Quick Start

```bash
# 1. Copy env
cp .env.example .env.local

# 2. Edit .env.local (set NEXT_PUBLIC_API_URL)

# 3. Install dependencies
npm install --legacy-peer-deps

# 4. Run dev server
npm run dev          # → http://localhost:3000

# 5. Lint & format
npm run lint
npm run format
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Laravel backend URL (no trailing slash) | `http://localhost:8000` |

## Project Structure

```
src/
├── app/            # Next.js App Router pages & layouts
├── components/     # Shared UI components (Phase 1+)
├── hooks/          # Custom React hooks
├── lib/
│   └── api.ts      # Axios client — withCredentials, CSRF, error mapping
├── providers/
│   └── ReactQueryProvider.tsx
├── store/          # Zustand stores (Phase 1+)
└── types/          # Shared TypeScript types (Phase 1+)
```

## Key Conventions

- **`lib/api.ts`**: All HTTP calls go through this axios instance.  
  Call `initCsrf()` before any login/register mutation to seed the `XSRF-TOKEN` cookie.
- **`mapValidationErrors(error)`**: Converts Laravel 422 responses to `{ field: 'message' }` for `react-hook-form`'s `setError`.
- **React Query**: Wrap server data in `useQuery`/`useMutation` hooks inside `src/hooks/`.
- **Framer Motion**: Page transitions live in `src/app/layout.tsx`; component animations are co-located.

## Development Phases

| Phase | Scope |
|---|---|
| **0** ✅ | Project setup, CORS, health endpoint, `lib/api.ts`, React Query provider, placeholder home |
| 1 | Auth (register / login / logout), cart (Zustand), product listing |
| 2 | Product detail, checkout flow, Razorpay integration |
| 3 | My orders, admin panel |
