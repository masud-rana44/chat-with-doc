"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950  h-[calc(100vh-72px)]">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Organize, Analyze, and Chat with Your Documents
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-400  mb-8">
            Transform your documents and notes into interactive knowledge with
            AI-powered insights
          </p>

          <div className="flex justify-center space-x-4">
            <Link href="/dashboard/documents">
              <button className="px-8 py-3 bg-blue-700 text-slate-50 rounded-lg hover:bg-blue-700">
                Upload Document
              </button>
            </Link>
            <Link href="/dashboard/notes">
              <button className="px-8 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-950">
                Create Note
              </button>
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                AI-Powered Analysis
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Automatic summaries and title generation
              </p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Document Chat</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Interactive conversations with your content
              </p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Smart Search</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Find content by meaning, not just keywords
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity Preview */}
        {/* <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-6">Recent Activity</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-6 bg-slate-50 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Documents Processed</h4>
                <span className="text-blue-600">12</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full w-3/4"></div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Active Notes</h4>
                <span className="text-blue-600">8</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full w-1/2"></div>
              </div>
            </div>
          </div>
        </div> */}
      </main>
    </div>
  );
}
