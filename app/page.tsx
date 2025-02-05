"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative bg-slate-50 dark:bg-slate-950 h-[calc(100vh-72px)] overflow-hidden">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative ">
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
                title: "Document Chat",
                description: "Interactive conversations with your documents",
                imageUrl: "/document-page.png",
                lightImageUrl: "/document-page-light.png",
              },
              {
                title: "AI-Powered Note",
                description:
                  "Automatic summaries and title generation of notes",
                imageUrl: "/note-page.png",
                lightImageUrl: "/note-page-light.png",
              },
              {
                title: "Vector Search",
                description:
                  "Find content by meaning, not just keywords using AI",
                imageUrl: "/search-page.png",
                lightImageUrl: "/search-page-light.png",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm transition-transform"
              >
                <h3 className="text-lg font-semibold mb-2 dark:text-slate-200">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>

                <div className="relative w-full h-48 mt-4 rounded-lg overflow-hidden">
                  <Image
                    layout="fill"
                    src={feature.imageUrl}
                    alt={feature.title}
                    className="object-cover object-left dark:block hidden"
                  />
                  <Image
                    layout="fill"
                    src={feature.lightImageUrl}
                    alt={feature.title}
                    className="object-cover object-left dark:hidden block"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
