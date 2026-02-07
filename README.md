# 🛍️ E-commerce Storefront

A full-stack e-commerice storefront web application built with Next.js and Javascript. Users can browse products, search items, manage a shopping cart, and complete purchases through Stripe, with authentication handled by Clerk and data persisted using Prisma. They can also see there order history. 

## Demo Link:
https://e-commercestorefrontprod.vercel.app


## Features
- Product listing with assorted items from fakestoreapi.com
- Dynamic product detail pages
- Search functionality
- Shopping cart with quantity controls
- User authentication with Clerk
- Secure checkout using Stripe
- Checkout success page with order summary
- Order history section with pagination
- Mobile-first responsive design

## Tech Stack
- Next.js
- JavaScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Stripe Checkout
- Clerk Authentication
- HeroUI

## 🛠️ Getting Started
Create an account through Clerk authentication sign-up and then you can access the store to purchase items. A Stripe test card number you can use for the checkout is: 4242 4242 4242 4242

## Installation

```bash
# Clone the repo
git clone https://github.com/gsortan/e-commerce_storefront.git

# Install dependencies
npm install

# Set up environment variables
Create a .env file in the root directory and add the following variables:
APP_BASE_URL=<your_app_base_url>
DATABASE_URL=<your_database_url>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
CLERK_SECRET_KEY=<your_clerk_secret_key>
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=<your_sign_in_redirect_url>
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=<your_sign_up_redirect_url>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your_stripe_publishable_key>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>

# Prisma Setup
npx prisma generate

# Run database migrations
npm run migrate

# Run the development server
npm run dev
```

## Screenshots

<img width="1912" height="1059" alt="image" src="https://github.com/user-attachments/assets/af4b9180-0459-4066-88c4-8d9a7cc5c46e" />
<img width="1914" height="1063" alt="image" src="https://github.com/user-attachments/assets/6f7dcae8-cfe2-4854-8eaf-c924f319cfe8" />
<img width="1918" height="1062" alt="image" src="https://github.com/user-attachments/assets/2d576c18-e937-4de3-9c71-b2725b7d59ee" />
<img width="1915" height="1065" alt="image" src="https://github.com/user-attachments/assets/76c10452-54e1-44e6-9f55-287246f03f79" />
<img width="1918" height="1066" alt="image" src="https://github.com/user-attachments/assets/00c2c7bb-3b4d-4297-8ae1-4a6a4dedf846" />






