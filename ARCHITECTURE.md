# Architecture Documentation

## System Overview

Job Application Tracker is a full-stack Next.js application with AI-powered features for job seekers.

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query + Zustand
- **UI Components**: Custom components with Lucide icons

### Backend
- **API**: Next.js API Routes (serverless)
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Clerk
- **AI Services**: Bhindi AI Platform
  - Google Jobs (job search)
  - Firecrawl (web scraping)
  - OpenRouter (AI text generation)
  - Scheduler (reminders)
  - SendGrid (emails)

### Infrastructure
- **Hosting**: Vercel
- **Database**: Supabase (managed PostgreSQL)
- **Storage**: Supabase Storage (resumes, documents)
- **CDN**: Vercel Edge Network

## Database Schema

### Core Tables

**users**
- Synced with Clerk authentication
- Stores subscription tier
- Links to all user data

**applications**
- Main job application records
- Tracks status, dates, notes
- Links to timeline events

**timeline_events**
- Application activity log
- Tracks all status changes
- Stores interview dates, follow-ups

**user_profiles**
- Extended user information
- Resume, cover letter templates
- Saved application answers

**saved_jobs**
- Jobs bookmarked for later
- Full job data from APIs
- Not yet applied

**reminders**
- Scheduled tasks and notifications
- Links to Bhindi Scheduler
- Follow-ups, interviews, etc.

**ai_generations**
- Tracks AI feature usage
- Monitors token consumption
- Enforces subscription limits

### Security

- **Row Level Security (RLS)**: Enabled on all tables
- **Policies**: Users can only access their own data
- **Authentication**: Clerk handles auth, Supabase enforces RLS

## API Routes

### Applications
- `GET /api/applications` - List user's applications
- `POST /api/applications` - Create new application
- `GET /api/applications/[id]` - Get application details
- `PATCH /api/applications/[id]` - Update application
- `DELETE /api/applications/[id]` - Delete application

### Jobs
- `POST /api/jobs/search` - Search jobs via Google Jobs
- `POST /api/jobs/scrape` - Scrape job details from URL

### AI Features
- `POST /api/ai/cover-letter` - Generate cover letter
- `POST /api/ai/interview-prep` - Generate interview guide
- `POST /api/ai/company-research` - Research company

### Reminders
- `POST /api/reminders` - Create reminder
- `GET /api/reminders` - List reminders
- `PATCH /api/reminders/[id]` - Mark complete

### User
- `GET /api/user/profile` - Get user profile
- `PATCH /api/user/profile` - Update profile
- `GET /api/user/stats` - Get analytics

## Bhindi AI Integration

### Job Search Flow
1. User enters search query
2. Frontend calls `/api/jobs/search`
3. Backend calls Bhindi Google Jobs agent
4. Results returned and displayed
5. User can save jobs to database

### Cover Letter Generation
1. User provides job description
2. System fetches user profile
3. Bhindi OpenRouter generates personalized letter
4. Usage tracked in database
5. Letter displayed for editing

### Interview Prep
1. User selects application
2. System scrapes company website (Firecrawl)
3. Bhindi AI generates prep guide
4. Questions, tips, and insights provided

### Reminders
1. User schedules follow-up
2. System creates Bhindi schedule
3. Reminder sent via email/notification
4. User can mark complete

## Data Flow

### Application Creation
```
User Input → Frontend Form → API Route → Supabase Insert → Timeline Event → Response
```

### Job Search
```
Search Query → API Route → Bhindi Google Jobs → Parse Results → Display → Save Option
```

### AI Generation
```
User Request → Check Subscription → Fetch Profile → Bhindi AI → Track Usage → Return Result
```

## Security Considerations

### Authentication
- Clerk handles all auth flows
- JWT tokens validated on every request
- Session management automatic

### Authorization
- RLS policies enforce data isolation
- API routes verify user ownership
- Subscription tiers checked for premium features

### Data Protection
- Environment variables for secrets
- HTTPS only in production
- Supabase connection pooling
- Rate limiting on AI endpoints

## Performance Optimizations

### Frontend
- Server components for static content
- Client components only when needed
- Image optimization with Next.js Image
- Code splitting automatic

### Backend
- Database indexes on common queries
- Connection pooling
- Caching with React Query
- Serverless functions scale automatically

### AI Features
- Rate limiting to prevent abuse
- Token usage tracking
- Subscription tier enforcement
- Async processing for long operations

## Monitoring & Logging

### Application Monitoring
- Vercel Analytics for performance
- Error tracking with Sentry (optional)
- Database metrics in Supabase dashboard

### User Analytics
- Track feature usage
- Monitor conversion rates
- Analyze user behavior

## Scalability

### Current Capacity
- Serverless functions scale automatically
- Database can handle 10k+ users
- AI features rate-limited per user

### Future Scaling
- Add Redis for caching
- Implement job queues for heavy tasks
- CDN for static assets
- Database read replicas

## Development Workflow

### Local Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run linter
```

### Deployment
- Push to main branch
- Vercel auto-deploys
- Environment variables in Vercel dashboard
- Database migrations run manually

## Future Enhancements

### Planned Features
1. Chrome extension for one-click tracking
2. Email integration (Gmail API)
3. Calendar integration (Google Calendar)
4. Mobile app (React Native)
5. Team collaboration features
6. Advanced analytics dashboard
7. Salary negotiation coach
8. Resume builder

### Technical Improvements
1. Add Redis caching
2. Implement WebSockets for real-time updates
3. Add full-text search
4. Optimize database queries
5. Add comprehensive testing
6. Implement CI/CD pipeline

## Contributing

See CONTRIBUTING.md for development guidelines.

## License

MIT License - see LICENSE file
