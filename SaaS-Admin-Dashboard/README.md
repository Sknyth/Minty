# Minty — Admin Dashboard

Internal admin panel for managing products, orders, and users for the Minty e-commerce platform.

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Pinia (state management)
- Vue Router

## Prerequisites

- Node.js 18+
- Backend API running (see backend README)
- A user account with the `ADMIN` role

## Setup

1. Install dependencies

```bash
npm install
```

2. Configure the API URL in `src/api/config.ts`:

```ts
export const API_URL = 'http://localhost:3000'
```

3. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5174` (or the port shown in your terminal).

## Access Control

Only users with `role = ADMIN` in the database can sign in. To grant admin access to a user, update their role directly in the database:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'user@example.com';
```

## Features

- Sign in (admin only)
- Product management (create, edit, delete, sort, search)
- Order management (view all orders, update order status)
- User management (view users, update roles)

## Build for Production

```bash
npm run build
```

Output is generated in the `dist/` folder.