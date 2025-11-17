# Setup Guide

Complete setup instructions for Job Application Tracker.

## Prerequisites

- Node.js 18+ installed
- Git installed
- Accounts needed:
  - Supabase (free tier)
  - Clerk (free tier)
  - Bhindi AI (API key)
  - Vercel (for deployment, optional)

## Step 1: Clone Repository

```bash
git clone https://github.com/zeggsorganic-collab/job-application-tracker.git
cd job-application-tracker
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (2-3 minutes)
3. Go to Project Settings → API
4. Copy your project URL and anon key
5. Go to SQL Editor and run the schema from `supabase/schema.sql`

## Step 4: Set Up Clerk

1. Go to [clerk.com](https://clerk.com) and create a new application
2. Choose "Email" and "Google" as sign-in methods
3. Go to API Keys
4. Copy your Publishable Key and Secret Key

## Step 5: Get Bhindi AI API Key

1. Go to [bhindi.io](https://bhindi.io)
2. Sign up or log in
3. Navigate to API Keys section
4. Generate a new API key
5. Copy the key

## Step 6: Configure Environment Variables

Create `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Bhindi AI
BHINDI_API_KEY=your_bhindi_api_key
BHINDI_API_URL=https://api.bhindi.io

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Step 7: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Step 8: Test the Application

1. Click "Get Started" to sign up
2. Complete the Clerk sign-up flow
3. You should be redirected to the dashboard
4. Try adding a test application
5. Search for jobs
6. Test AI features (requires Pro subscription)

## Step 9: Deploy to Vercel (Optional)

### Option A: Using Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Add environment variables from `.env.local`
5. Deploy

## Troubleshooting

### Database Connection Issues

- Verify Supabase URL and keys are correct
- Check if RLS policies are enabled
- Ensure schema was run successfully

### Authentication Issues

- Verify Clerk keys are correct
- Check if Clerk application is in production mode
- Ensure redirect URLs are configured in Clerk dashboard

### API Errors

- Check Bhindi API key is valid
- Verify API endpoints are accessible
- Check browser console for detailed errors

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

## Next Steps

1. **Customize Branding**: Update colors in `tailwind.config.js`
2. **Add Features**: Extend API routes and components
3. **Set Up Analytics**: Add Google Analytics or PostHog
4. **Configure Email**: Set up SendGrid for notifications
5. **Add Payments**: Integrate Stripe for subscriptions

## Support

- GitHub Issues: [Report a bug](https://github.com/zeggsorganic-collab/job-application-tracker/issues)
- Email: support@jobtracker.app
- Discord: [Join community]

## License

MIT License - see LICENSE file for details
