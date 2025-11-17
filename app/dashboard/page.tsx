'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

interface Application {
  id: string
  job_title: string
  company_name: string
  status: string
  applied_date?: string
  created_at: string
}

export default function Dashboard() {
  const { user } = useUser()
  const [applications, setApplications] = useState<Application[]>([])
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interviewing: 0,
    offers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications')
      const data = await response.json()
      setApplications(data.applications || [])
      
      // Calculate stats
      const total = data.applications?.length || 0
      const applied = data.applications?.filter((a: Application) => a.status === 'applied').length || 0
      const interviewing = data.applications?.filter((a: Application) => a.status === 'interviewing').length || 0
      const offers = data.applications?.filter((a: Application) => a.status === 'offer').length || 0
      
      setStats({ total, applied, interviewing, offers })
    } catch (error) {
      console.error('Failed to fetch applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      saved: 'bg-gray-100 text-gray-800',
      applied: 'bg-blue-100 text-blue-800',
      interviewing: 'bg-yellow-100 text-yellow-800',
      offer: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-indigo-600">
            JobTracker
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600">
              Dashboard
            </Link>
            <Link href="/jobs" className="text-gray-700 hover:text-indigo-600">
              Job Search
            </Link>
            <Link href="/applications" className="text-gray-700 hover:text-indigo-600">
              Applications
            </Link>
            <Link href="/analytics" className="text-gray-700 hover:text-indigo-600">
              Analytics
            </Link>
            <div className="text-sm text-gray-600">
              {user?.firstName || user?.emailAddresses[0].emailAddress}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || 'there'}! 👋
          </h1>
          <p className="text-gray-600">Here's your job search overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Total Applications</div>
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Applied</div>
            <div className="text-3xl font-bold text-blue-600">{stats.applied}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Interviewing</div>
            <div className="text-3xl font-bold text-yellow-600">{stats.interviewing}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Offers</div>
            <div className="text-3xl font-bold text-green-600">{stats.offers}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/jobs" className="bg-indigo-600 text-white p-6 rounded-lg shadow-md hover:bg-indigo-700 transition">
            <div className="text-2xl mb-2">🔍</div>
            <h3 className="text-xl font-bold mb-1">Search Jobs</h3>
            <p className="text-indigo-100">Find your next opportunity</p>
          </Link>
          <Link href="/applications/new" className="bg-green-600 text-white p-6 rounded-lg shadow-md hover:bg-green-700 transition">
            <div className="text-2xl mb-2">➕</div>
            <h3 className="text-xl font-bold mb-1">Add Application</h3>
            <p className="text-green-100">Track a new application</p>
          </Link>
          <Link href="/ai/cover-letter" className="bg-purple-600 text-white p-6 rounded-lg shadow-md hover:bg-purple-700 transition">
            <div className="text-2xl mb-2">✍️</div>
            <h3 className="text-xl font-bold mb-1">Generate Cover Letter</h3>
            <p className="text-purple-100">AI-powered in seconds</p>
          </Link>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Recent Applications</h2>
              <Link href="/applications" className="text-indigo-600 hover:text-indigo-800">
                View All →
              </Link>
            </div>
          </div>
          
          {applications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">No applications yet</h3>
              <p className="text-gray-600 mb-6">Start tracking your job applications to see them here</p>
              <Link href="/applications/new">
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Add Your First Application
                </button>
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {applications.slice(0, 5).map((app) => (
                <Link
                  key={app.id}
                  href={`/applications/${app.id}`}
                  className="p-6 hover:bg-gray-50 transition block"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{app.job_title}</h3>
                      <p className="text-gray-600">{app.company_name}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {app.applied_date ? `Applied: ${new Date(app.applied_date).toLocaleDateString()}` : `Added: ${new Date(app.created_at).toLocaleDateString()}`}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
