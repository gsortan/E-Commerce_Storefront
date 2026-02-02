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
- Next.js (App Router)
- React
- JavaScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Stripe Checkout
- Clerk Authentication

## 🛠️ Getting Started
Create an account through Clerk authentication and then you can access the store to purchase items. A Stripe test card number you can use for the checkout is: 4242 4242 4242 4242

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
<img width="1918" height="1051" alt="image" src="https://github.com/user-attachments/assets/ea05dc40-4172-4ee2-ab9e-76d82dad70a0" />
<img width="1918" height="1066" alt="image" src="https://github.com/user-attachments/assets/dd240f4a-e7ca-4ec2-b553-57ef431afd36" />
<img width="957" height="531" alt="Store4" src="https://github.com/user-attachments/assets/9c3d6c8b-5eda-45ad-9d6d-73f56f7e0e9d" />
<img width="956" height="531" alt="store6" src="https://github.com/user-attachments/assets/f17cc8ab-1bf7-4b85-aa16-858079c0ea1f" />
<img width="1914" height="1057" alt="image" src="https://github.com/user-attachments/assets/22bc8266-ef3c-4e8c-8295-212d724ef30b" />





