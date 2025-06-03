# 🛒 Grocery Shopping Webpage

## 🧾 Overview
This project is a responsive Grocery Shopping Web Application. It includes a **Search Results Page** and a **Checkout Page**, allowing users to browse items, manage their cart, and view applicable discounts.



## 🛠 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/shellygarg10/grocery-shop.git
   cd grocery-shop

2. **Install dependencies**
    ```bash
    npm install

3. **Start the development server**
    ```bash
    npm run dev

## 📄 Pages

###  Search Results Page
- Fetches data from: https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all
- Filters: fruit, drinks, bakery
- Displays name, price, stock, and "Add to Cart" button

### Checkout Page
- Shows cart items, subtotal, discount, and total
- Offer logic applies automatically
- Quantity adjustment + cart state persistence


## Tech Stack
#### Framework & Tooling:
- React 19
- Vite 6 – for fast builds and dev server
- TypeScript

#### Routing & State:
- React Router 
- React Query (TanStack) – for data fetching and caching

#### Styling:
- Tailwind CSS 4
- Lucide React – for icons


