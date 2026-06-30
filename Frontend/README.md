# Minty — Frontend

Customer-facing e-commerce storefront built with Vue 3, TypeScript, and Pinia.

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Pinia (state management)
- Vue Router

## Prerequisites

- Node.js 18+
- Backend API running (see backend README)

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

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## Project Structure

- `src/stores` — Pinia stores (auth, cart, products, wishlist, etc.)
- `src/views` — page-level components
- `src/components` — reusable UI components
- `src/router` — route definitions
- `src/api` — API configuration and request helpers
- `src/types` — shared TypeScript types

## Features

- Product browsing, search, and filtering
- Cart with quantity and size selection
- User authentication (sign in / sign up)
- Saved addresses and payment methods
- Order checkout and history
- Wishlist

## Build for Production

```bash
npm run build
```

Output is generated in the `dist/` folder.