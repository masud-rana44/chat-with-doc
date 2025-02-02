"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative bg-slate-50 dark:bg-slate-950 h-[calc(100vh-72px)] overflow-hidden">
      {/* Gradient Background */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:opacity-10"
        />
      </div>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Organize, Analyze, and Chat with Your Documents
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Transform your documents and notes into interactive knowledge with
            AI-powered insights
          </p>

          <div className="flex justify-center space-x-4">
            <Link href="/dashboard/documents">
              <button className="px-8 py-3 bg-blue-700 text-slate-50 rounded-lg hover:bg-blue-800 transition-colors">
                Upload Document
              </button>
            </Link>
            <Link href="/dashboard/notes">
              <button className="px-8 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Create Note
              </button>
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Analysis",
                description: "Automatic summaries and title generation",
              },
              {
                title: "Document Chat",
                description: "Interactive conversations with your content",
              },
              {
                title: "Smart Search",
                description: "Find content by meaning, not just keywords",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm transition-transform hover:scale-[1.02]"
              >
                <h3 className="text-lg font-semibold mb-2 dark:text-slate-200">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] dark:opacity-10"
        />
      </div>
    </div>
  );
}
