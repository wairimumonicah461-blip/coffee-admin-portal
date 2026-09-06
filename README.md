# Coffee Admin Portal

A React SPA for managing a coffee shop's product catalog. Includes a public shop page for browsing/searching products, and an admin portal for adding, editing, and removing products — all backed by a simulated REST API.

## Tech Stack

- React (functional components + custom hooks)
- React Router (client-side routing)
- Vite
- json-server (simulated backend)

## Project Structure
src/
├── components/
│ └── Navbar.jsx # Nav links to Home, Shop, Admin Portal
├── hooks/
│ └── useProducts.js # Custom hook: fetch, add, update, delete products
├── pages/
│ ├── Home.jsx # Landing page
│ ├── Shop.jsx # Product list + live search
│ └── AdminPortal.jsx # Add/edit/delete products
├── App.jsx # Routes
├── main.jsx # Entry point, wraps App in BrowserRouter
db.json # Simulated backend data


## Features

- Browse products with live search
- Add new products (name, description, price)
- Edit a product's price
- Delete products
- All changes persist via the simulated backend

## Getting Started

Run the backend and frontend in two separate terminals:

```bash
npm run server   # starts json-server on port 3001
npm run dev       # starts the React app
```

## Notes

- Product data lives in `db.json`, served locally via json-server — not a real production backend.


