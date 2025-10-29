"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WaveFooter } from "@/components/wave-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-[#1f618d] text-white py-8 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-balance">Student Feedback System</h1>
            <p className="text-slate-300 mt-2">Share your course experience and help us improve</p>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button variant="outline" className="bg-white text-[#1f618d] hover:bg-slate-100">
                Dashboard
              </Button>
            </Link>
            <Link href="/submit">
              <Button variant="outline" className="bg-white text-[#1f618d] hover:bg-slate-100">
                Submit Feedback
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 flex-1">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 text-slate-800">Welcome to Student Feedback System</h2>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Your voice matters! Share your course experiences and help us create better learning environments for everyone.
          </p>

          <div className="text-left max-w-3xl mx-auto mb-12">
            <h3 className="text-3xl font-semibold mb-6 text-slate-800">What is the Student Feedback System?</h3>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              The Student Feedback System is a comprehensive platform designed to collect, analyze, and visualize feedback from students about their courses and educational experiences. Our goal is to bridge the gap between students and educators, fostering a culture of continuous improvement and collaboration.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-3 text-slate-800">For Students</h4>
                <ul className="text-slate-600 space-y-2">
                  <li>• Easily submit detailed feedback on courses</li>
                  <li>• View statistics and insights from peer feedback</li>
                  <li>• Contribute to improving educational quality</li>
                  <li>• Anonymous submission options available</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-3 text-slate-800">For Educators</h4>
                <ul className="text-slate-600 space-y-2">
                  <li>• Access real-time feedback analytics</li>
                  <li>• Identify trends and areas for improvement</li>
                  <li>• Make data-driven decisions</li>
                  <li>• Enhance course content and delivery</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Why Your Feedback Matters</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              Student feedback is crucial for continuous improvement. By sharing your experiences,
              you help educators understand what's working well and what can be enhanced.
              Together, we can create outstanding learning experiences for all students.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Our system ensures that every voice is heard, every opinion valued, and every suggestion considered.
              Join us in building a better educational future through honest, constructive feedback.
            </p>
          </div>
        </div>
      </main>

      <WaveFooter />
    </div>
  )
}
