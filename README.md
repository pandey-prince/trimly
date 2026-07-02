# Trimly

A modern URL shortener service built with Next.js, TypeScript, and Prisma. Create short, memorable links for your long URLs with analytics and management features.

## Live Demo

[https://trimly-4kw9.vercel.app](https://trimly-4kw9.vercel.app)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Deployment**: Vercel

## Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **Custom Aliases**: Create memorable custom short URLs
- **Analytics**: Track clicks and visitor statistics
- **Link Management**: View, edit, and delete your shortened URLs
- **Modern UI**: Clean and intuitive interface built with shadcn/ui
- **Responsive Design**: Works seamlessly on all devices
- **Database Persistence**: Reliable storage with PostgreSQL

## Project Structure

```
trimly/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   └── ...             # Pages and layouts
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── lib/                # Utility functions
├── prisma/             # Database schema and migrations
├── public/             # Static assets
└── daily/              # Additional resources
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pandey-prince/trimly.git
cd trimly
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/trimly"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

1. **Shorten a URL**: Paste your long URL in the input field
2. **Custom Alias** (optional): Add a custom short code
3. **Generate**: Click to create your shortened URL
4. **Share**: Copy and share your short link
5. **Manage**: View analytics and manage your links from the dashboard

## Database Schema

The application uses Prisma with PostgreSQL. Key models include:
- **URL**: Stores original URLs, short codes, and metadata
- **Click**: Tracks click analytics for each shortened URL

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Database ORM by [Prisma](https://www.prisma.io)
