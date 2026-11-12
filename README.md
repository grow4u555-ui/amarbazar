# BazaarConnect - Multi-Vendor E-Commerce Marketplace

A modern, scalable multi-vendor marketplace platform built for India. Connect buyers and sellers with secure payments, fast delivery, and powerful seller tools.

## 🚀 Features

### For Buyers
- **Wide Product Selection** - Thousands of products across multiple categories
- **Secure Payments** - UPI, Cards, NetBanking, Wallets, and Cash on Delivery
- **Fast Delivery** - Pan-India shipping with real-time tracking
- **Easy Returns** - 7-day return policy with hassle-free pickup
- **Verified Reviews** - Authentic customer feedback and ratings
- **Multi-language** - English, Hindi, and Bengali support

### For Sellers
- **Easy Onboarding** - Quick registration with guided KYC process
- **Dashboard** - Comprehensive analytics and sales insights
- **Inventory Management** - Product variants, stock tracking, low stock alerts
- **Order Management** - Confirm, pack, ship, and track orders
- **Fair Commission** - Transparent 5-10% flat fee per order
- **Timely Payouts** - Weekly settlements to bank account
- **Buyer Communication** - Built-in chat system

### For Admins
- **Platform Analytics** - GMV, revenue, user growth metrics
- **User Management** - Customer and seller management
- **KYC Verification** - Approve/reject seller documents
- **Dispute Resolution** - Mediate buyer-seller disputes
- **Payout Management** - Process seller settlements
- **Platform Settings** - Configure commissions, categories, coupons

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js v5
- **Payments**: Razorpay (UPI, Cards, NetBanking, Wallets)
- **Real-time**: Socket.io
- **File Storage**: AWS S3 / Cloudinary
- **Email**: Resend / Nodemailer
- **Deployment**: Vercel + Railway/Render

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bazaarconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration (database, Razorpay keys, etc.)

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   # Or run migrations
   npx prisma migrate dev
   ```

5. **Seed the database (optional)**
   ```bash
   npm run db:seed
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Open [http://localhost:3000](http://localhost:3000)**

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema changes to database |
| `npm run db:migrate` | Run database migrations |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Seed database with sample data |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── seller/            # Seller dashboard
│   ├── admin/             # Admin panel
│   └── (pages)/           # Public pages
├── components/
│   ├── ui/                # Reusable UI components
│   ├── forms/             # Form components
│   └── layout/            # Layout components
├── lib/
│   ├── auth.ts            # NextAuth configuration
│   ├── prisma.ts          # Prisma client
│   ├── utils.ts           # Utility functions
│   └── validations/       # Zod schemas
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
└── styles/                # Global styles
prisma/
├── schema.prisma          # Database schema
└── migrations/            # Database migrations
public/                    # Static assets
```

## 🌐 Environment Variables

See `.env.example` for all required environment variables.

### Required
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Secret for NextAuth (min 32 chars)
- `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET` - Razorpay credentials

### Optional
- OAuth providers (Google, GitHub)
- Email/SMS services
- File storage (AWS S3, Cloudinary)
- Redis for caching
- Monitoring (Sentry)

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Type checking
npm run type-check
```

## 🚀 Deployment

### Vercel (Frontend)
1. Connect repository to Vercel
2. Configure environment variables
3. Deploy

### Railway/Render (Background Workers)
1. Create new service
2. Set build command: `npm run build`
3. Set start command: `npm run start`
4. Configure environment variables
5. Deploy

### Database (Managed PostgreSQL)
- Neon, Supabase, or AWS RDS
- Run migrations: `npx prisma migrate deploy`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

- Email: support@bazaarconnect.in
- Documentation: [docs.bazaarconnect.in](https://docs.bazaarconnect.in)
- Issues: [GitHub Issues](https://github.com/your-org/bazaarconnect/issues)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Razorpay](https://razorpay.com/)
- [NextAuth.js](https://next-auth.js.org/)