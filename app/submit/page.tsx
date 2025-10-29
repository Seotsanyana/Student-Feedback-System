"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { FeedbackForm } from "@/components/feedback-form"
import { WaveFooter } from "@/components/wave-footer"

export default function SubmitPage() {
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    const handleSubmitSuccess = () => {
        setRefreshTrigger((prev) => prev + 1)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
            {/* Header */}
            <header className="bg-[#1f618d] text-white py-8 shadow-lg">
                <div className="container mx-auto px-4 flex items-center gap-4">
                    <Link href="/" className="text-white hover:text-gray-200 transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-bold text-balance">Submit Feedback</h1>
                        <p className="text-slate-300 mt-2">Share your course experience and help us improve</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 flex-1">
                <FeedbackForm onSubmitSuccess={handleSubmitSuccess} />
            </main>

            <WaveFooter />
        </div>
    )
}
