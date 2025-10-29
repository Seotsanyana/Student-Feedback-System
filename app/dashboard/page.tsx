"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { FeedbackForm } from "@/components/feedback-form"
import { FeedbackList } from "@/components/feedback-list"
import { FeedbackStats } from "@/components/feedback-stats"
import { WaveFooter } from "@/components/wave-footer"


export default function DashboardPage() {
    const [refreshTrigger, setRefreshTrigger] = useState(0)



    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
            {/* Header */}
            <header className="bg-[#1f618d] text-white py-8 shadow-lg">
                <div className="container mx-auto px-4 flex items-center gap-4">
                    <Link href="/" className="text-white hover:text-gray-200 transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-bold text-balance">Student Feedback System</h1>
                        <p className="text-slate-300 mt-2">Share your course experience and help us improve</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 flex-1">
                <div className="space-y-8">
                    <FeedbackStats refreshTrigger={refreshTrigger} />
                    <div>
                        <h2 className="text-2xl font-bold mb-4">All Feedback</h2>
                        <FeedbackList refreshTrigger={refreshTrigger} />
                    </div>
                </div>
            </main>

            <WaveFooter />
        </div>
    )
}
