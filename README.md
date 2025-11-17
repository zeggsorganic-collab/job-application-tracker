# Job Application Tracker 🎯

AI-powered job application tracking system with auto-apply features, interview prep, and analytics.

## Features

- 📊 **Application Tracking** - Kanban board and list views
- 🔍 **Job Search** - Integrated Google Jobs search
- 🤖 **AI Cover Letters** - Generate personalized cover letters
- 📅 **Smart Reminders** - Auto follow-up scheduling
- 📈 **Analytics** - Track your job search progress
- 🎓 **Interview Prep** - Company research and common questions
- 🔌 **Chrome Extension** - One-click application capture

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: Clerk
- **AI**: Bhindi AI (OpenRouter, Firecrawl, Google Jobs)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Clerk account
- Bhindi AI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/zeggsorganic-collab/job-application-tracker.git
cd job-application-tracker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
BHINDI_API_KEY=your_bhindi_api_key
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Main dashboard
│   ├── jobs/              # Job search
│   ├── applications/      # Application management
│   ├── analytics/         # Stats and insights
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utilities and helpers
├── supabase/              # Database migrations
└── extension/             # Chrome extension
```

## Pricing

- **Free**: 10 applications, basic features
- **Pro ($19/mo)**: Unlimited apps, AI features
- **Premium ($49/mo)**: Auto-apply, coaching

## Contributing

Contributions welcome! Please read CONTRIBUTING.md first.

## License

MIT License - see LICENSE file

## Support

- Email: support@jobtracker.app
- Discord: [Join our community]
- Docs: [docs.jobtracker.app]

Built with ❤️ using Bhindi AI
