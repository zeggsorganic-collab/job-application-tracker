// Bhindi AI Client
class BhindiClient {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.BHINDI_API_KEY || ''
    this.baseUrl = process.env.BHINDI_API_URL || 'https://api.bhindi.io'
  }

  // Google Jobs Search
  async searchJobs(params: {
    query: string
    location?: string
    datePosted?: 'today' | 'week' | 'month'
    employmentType?: 'FULLTIME' | 'PARTTIME' | 'CONTRACTOR' | 'INTERN'
    limit?: number
  }) {
    return this.request('google-jobs/search', params)
  }

  // Scrape job page for full details
  async scrapeJobPage(url: string) {
    return this.request('firecrawl/scrape', {
      url,
      formats: ['markdown'],
      onlyMainContent: true,
    })
  }

  // Generate AI text (cover letters, interview prep, etc.)
  async generateText(prompt: string, model: string = 'claude-3.5-sonnet') {
    return this.request('openrouter/chat', {
      model: `anthropic/${model}`,
      messages: [{ role: 'user', content: prompt }],
    })
  }

  // Generate cover letter
  async generateCoverLetter(jobDescription: string, userProfile: any) {
    const prompt = `Generate a professional, personalized cover letter for this job:

Job Description:
${jobDescription}

Candidate Profile:
- Name: ${userProfile.name}
- Experience: ${userProfile.experience || 'Not provided'}
- Skills: ${userProfile.skills || 'Not provided'}
- LinkedIn: ${userProfile.linkedin_url || 'Not provided'}

Requirements:
- Make it professional but personable
- Highlight relevant experience and skills
- Keep it concise (250-300 words)
- Include specific examples where possible
- End with a strong call to action

Format as a complete cover letter ready to send.`

    return this.generateText(prompt)
  }

  // Generate interview prep guide
  async generateInterviewPrep(companyName: string, jobTitle: string, companyInfo?: string) {
    const prompt = `Create a comprehensive interview preparation guide for:

Position: ${jobTitle}
Company: ${companyName}
${companyInfo ? `Company Info: ${companyInfo}` : ''}

Include:
1. 10 common interview questions for this role
2. Suggested answers framework (STAR method)
3. 5 insightful questions to ask the interviewer
4. Company culture insights (if available)
5. Key skills to emphasize
6. Red flags to watch for

Format as a structured guide.`

    return this.generateText(prompt)
  }

  // Schedule reminder
  async scheduleReminder(content: string, date: Date, type: 'reminder' | 'action' = 'reminder') {
    return this.request('scheduler/create', {
      content,
      cronExpression: this.dateToCron(date),
      type,
      recurring: false,
    })
  }

  // Send email
  async sendEmail(params: {
    to: string
    subject: string
    html: string
    from?: string
  }) {
    return this.request('sendgrid/send', {
      to: [{ email: params.to }],
      from: { email: params.from || 'noreply@jobtracker.app', name: 'Job Tracker' },
      subject: params.subject,
      content: [{ type: 'text/html', value: params.html }],
    })
  }

  // Search web for company info
  async searchCompanyInfo(companyName: string) {
    return this.request('firecrawl/search', {
      query: `${companyName} company culture values mission careers`,
      limit: 3,
      scrapeOptions: {
        formats: ['markdown'],
        onlyMainContent: true,
      },
    })
  }

  // Helper: Convert Date to cron expression
  private dateToCron(date: Date): string {
    const d = new Date(date)
    return `${d.getMinutes()} ${d.getHours()} ${d.getDate()} ${d.getMonth() + 1} *`
  }

  // Generic request method
  private async request(endpoint: string, data: any) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Bhindi API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Bhindi API request failed:', error)
      throw error
    }
  }
}

// Export singleton instance
export const bhindiClient = new BhindiClient()
