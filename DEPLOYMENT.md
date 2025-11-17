# Deployment Guide

Step-by-step guide to deploy Job Application Tracker to production.

## Quick Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account with repository access
- Vercel account (free tier works)
- Supabase project set up
- Clerk application configured
- Bhindi AI API key

### Steps

1. **Push Code to GitHub** (Already done!)
   ```bash
   git clone https://github.com/zeggsorganic-collab/job-application-tracker.git
   cd job-application-tracker
   ```

2. **Deploy to Vercel**
   
   **Option A: Using Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import `zeggsorganic-collab/job-application-tracker`
   - Configure environment variables (see below)
   - Click "Deploy"

   **Option B: Using Vercel CLI**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

3. **Configure Environment Variables in Vercel**
   
   Go to Project Settings → Environment Variables and add:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
   CLERK_SECRET_KEY=sk_live_xxxxx
   BHINDI_API_KEY=your_bhindi_api_key
   BHINDI_API_URL=https://api.bhindi.io
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   NODE_ENV=production
   ```

4. **Update Clerk Redirect URLs**
   - Go to Clerk Dashboard → Paths
   - Add your Vercel URL to allowed redirect URLs:
     - `https://your-app.vercel.app`
     - `https://your-app.vercel.app/dashboard`

5. **Test Deployment**
   - Visit your Vercel URL
   - Sign up with a test account
   - Create a test application
   - Verify all features work

## Custom Domain Setup

### Add Custom Domain to Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `jobtracker.app`)
3. Configure DNS records as shown by Vercel
4. Wait for DNS propagation (5-60 minutes)

### Update Environment Variables

```
NEXT_PUBLIC_APP_URL=https://jobtracker.app
```

### Update Clerk Settings

Add custom domain to Clerk allowed URLs:
- `https://jobtracker.app`
- `https://jobtracker.app/dashboard`

## Database Migration

### Initial Setup

Run the schema in Supabase SQL Editor:

```sql
-- Copy contents from supabase/schema.sql
-- Paste into Supabase SQL Editor
-- Click "Run"
```

### Verify Tables Created

Check in Supabase Dashboard → Table Editor:
- users
- applications
- timeline_events
- user_profiles
- saved_jobs
- reminders
- ai_generations

## Post-Deployment Checklist

- [ ] Application loads without errors
- [ ] Sign up flow works
- [ ] Dashboard displays correctly
- [ ] Can create applications
- [ ] Job search works
- [ ] AI features work (with Pro subscription)
- [ ] Reminders can be created
- [ ] Email notifications work
- [ ] Mobile responsive
- [ ] SSL certificate active

## Monitoring Setup

### Vercel Analytics

1. Go to Project → Analytics
2. Enable Web Analytics
3. View real-time traffic

### Supabase Monitoring

1. Go to Supabase Dashboard
2. Check Database → Performance
3. Monitor API usage

### Error Tracking (Optional)

Add Sentry for error tracking:

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

## Performance Optimization

### Enable Vercel Speed Insights

```bash
npm install @vercel/speed-insights
```

Add to `app/layout.tsx`:
```tsx
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Database Optimization

1. Add indexes for common queries (already in schema)
2. Enable connection pooling in Supabase
3. Use database read replicas for scaling

## Backup Strategy

### Database Backups

Supabase automatically backs up daily. To manually backup:

1. Go to Supabase Dashboard → Database → Backups
2. Click "Create Backup"
3. Download backup file

### Code Backups

- GitHub repository is your source of truth
- Vercel keeps deployment history
- Tag releases: `git tag v1.0.0 && git push --tags`

## Scaling Considerations

### Current Limits (Free Tiers)

- **Vercel**: 100GB bandwidth/month
- **Supabase**: 500MB database, 1GB file storage
- **Clerk**: 10,000 MAU (Monthly Active Users)

### When to Upgrade

- **Vercel Pro ($20/mo)**: More bandwidth, better support
- **Supabase Pro ($25/mo)**: 8GB database, 100GB storage
- **Clerk Pro ($25/mo)**: 10,000+ MAU, advanced features

### Horizontal Scaling

- Vercel serverless functions scale automatically
- Add Redis for caching (Upstash)
- Use CDN for static assets
- Database read replicas for heavy traffic

## Troubleshooting

### Build Failures

```bash
# Clear cache and rebuild
vercel --force

# Check build logs
vercel logs
```

### Database Connection Issues

- Verify Supabase URL and keys
- Check RLS policies are enabled
- Ensure connection pooling is on

### Authentication Issues

- Verify Clerk keys (live vs test)
- Check redirect URLs match
- Clear browser cookies and retry

### API Rate Limits

- Monitor Bhindi API usage
- Implement caching for job searches
- Add rate limiting middleware

## Security Hardening

### Environment Variables

- Never commit `.env` files
- Rotate API keys regularly
- Use different keys for dev/prod

### Database Security

- RLS policies enabled (already done)
- Regular security audits
- Monitor for suspicious activity

### API Security

- Rate limiting on all endpoints
- Input validation
- CORS configuration

## Maintenance

### Regular Tasks

**Weekly:**
- Check error logs
- Monitor API usage
- Review user feedback

**Monthly:**
- Update dependencies: `npm update`
- Review database performance
- Analyze user metrics

**Quarterly:**
- Security audit
- Performance optimization
- Feature planning

### Dependency Updates

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update Next.js
npm install next@latest react@latest react-dom@latest

# Test thoroughly after updates
npm run build
npm run dev
```

## Rollback Procedure

If deployment fails:

1. Go to Vercel Dashboard → Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"
4. Investigate issue in failed deployment logs

## Support

- **Documentation**: See README.md and SETUP.md
- **Issues**: GitHub Issues
- **Email**: support@jobtracker.app
- **Discord**: [Community link]

## Next Steps

After successful deployment:

1. Set up monitoring and alerts
2. Configure email templates
3. Add payment integration (Stripe)
4. Implement analytics
5. Create marketing materials
6. Launch on Product Hunt

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Bhindi AI Documentation](https://docs.bhindi.io)
