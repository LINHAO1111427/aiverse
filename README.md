npm# AIverse - AI Tools Directory

Discover 500+ AI tools to boost your productivity. AIverse is a comprehensive directory of AI tools designed to help users find the perfect AI solution for their needs.

## 🚀 Features

- **500+ AI Tools**: Curated collection of the best AI tools
- **Advanced Search**: Find tools quickly with real-time search
- **Categories**: Browse tools by category
- **Detailed Information**: Comprehensive details for each tool
- **User Reviews**: Community ratings and reviews
- **Comparison**: Compare multiple tools side-by-side
- **Responsive Design**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Analytics**: Vercel Analytics

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- PostgreSQL 15 or higher
- npm or yarn

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aiverse.git
cd aiverse
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/aiverse?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. (Optional) Seed the database:
```bash
npm run prisma:seed
```

## 🏃‍♂️ Running the Project

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm run start
```

## 🐛 Common Issues

### Port Permission Error on Windows

If you encounter "EACCES: permission denied" error:

1. Try running with administrator privileges
2. Or use a different port:
```bash
npm run dev -- -p 8081
```

3. Or modify the dev script in package.json:
```json
"dev": "next dev -H 127.0.0.1"
```

### Database Connection Issues

Make sure PostgreSQL is running and the connection string in `.env.local` is correct.

## 📁 Project Structure

```
aiverse/
├── src/
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── lib/          # Utility functions
│   ├── types/        # TypeScript types
│   └── styles/       # Global styles
├── prisma/           # Database schema
├── public/           # Static assets
└── ...config files
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 📧 Contact

For any questions or feedback, please reach out to us at hello@aiverse.com