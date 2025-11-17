import Link from 'next/link'
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600">JobTracker</div>
        <div className="space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-indigo-600 hover:text-indigo-800">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Get Started
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Go to Dashboard
              </button>
            </Link>
          </SignedIn>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Land Your Dream Job with AI
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Track applications, generate cover letters, prep for interviews, and never miss a follow-up.
            All powered by AI.
          </p>
          
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="px-8 py-4 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 shadow-lg">
                Start Tracking Free
              </button>
            </SignUpButton>
          </SignedOut>
          
          <SignedIn>
            <Link href="/dashboard">
              <button className="px-8 py-4 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 shadow-lg">
                Go to Dashboard
              </button>
            </Link>
          </SignedIn>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Track Everything</h3>
            <p className="text-gray-600">
              Kanban boards, timelines, and analytics to manage your job search in one place.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
            <p className="text-gray-600">
              Generate personalized cover letters and get interview prep guides instantly.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="text-xl font-bold mb-2">Never Miss Out</h3>
            <p className="text-gray-600">
              Smart reminders for follow-ups, interviews, and important deadlines.
            </p>
          </div>
        </div>

        <div className="mt-20 bg-white rounded-xl shadow-lg p-12">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">✅</div>
              <div>
                <h4 className="font-bold mb-1">Application Tracking</h4>
                <p className="text-gray-600">Organize applications with status tracking and notes</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">🔍</div>
              <div>
                <h4 className="font-bold mb-1">Job Search</h4>
                <p className="text-gray-600">Search thousands of jobs from Google Jobs</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">✍️</div>
              <div>
                <h4 className="font-bold mb-1">AI Cover Letters</h4>
                <p className="text-gray-600">Generate personalized cover letters in seconds</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">🎓</div>
              <div>
                <h4 className="font-bold mb-1">Interview Prep</h4>
                <p className="text-gray-600">Get company research and practice questions</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">📈</div>
              <div>
                <h4 className="font-bold mb-1">Analytics</h4>
                <p className="text-gray-600">Track your progress with detailed insights</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">🔔</div>
              <div>
                <h4 className="font-bold mb-1">Smart Reminders</h4>
                <p className="text-gray-600">Automated follow-up and interview reminders</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-4">$0</div>
              <ul className="text-left space-y-2 mb-6">
                <li>✓ 10 applications</li>
                <li>✓ Basic tracking</li>
                <li>✓ Job search</li>
                <li>✓ Email reminders</li>
              </ul>
              <SignUpButton mode="modal">
                <button className="w-full px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
                  Get Started
                </button>
              </SignUpButton>
            </div>
            
            <div className="bg-indigo-600 text-white p-8 rounded-xl shadow-lg transform scale-105">
              <div className="bg-yellow-400 text-indigo-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-4">$19<span className="text-lg">/mo</span></div>
              <ul className="text-left space-y-2 mb-6">
                <li>✓ Unlimited applications</li>
                <li>✓ AI cover letters (10/mo)</li>
                <li>✓ Interview prep</li>
                <li>✓ Chrome extension</li>
                <li>✓ Advanced analytics</li>
              </ul>
              <button className="w-full px-6 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 font-bold">
                Start Free Trial
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <div className="text-4xl font-bold mb-4">$49<span className="text-lg">/mo</span></div>
              <ul className="text-left space-y-2 mb-6">
                <li>✓ Everything in Pro</li>
                <li>✓ Unlimited AI features</li>
                <li>✓ Auto-apply</li>
                <li>✓ Salary coach</li>
                <li>✓ Priority support</li>
              </ul>
              <button className="w-full px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="container mx-auto px-6 py-8 mt-20 border-t">
        <div className="text-center text-gray-600">
          <p>© 2024 JobTracker. Built with ❤️ using Bhindi AI</p>
        </div>
      </footer>
    </main>
  )
}
