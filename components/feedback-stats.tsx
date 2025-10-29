"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MessageSquare, TrendingUp } from "lucide-react"
import type { Feedback } from "@/lib/feedback-store"

interface FeedbackStatsProps {
  refreshTrigger?: number
}

export function FeedbackStats({ refreshTrigger }: FeedbackStatsProps) {
  const [stats, setStats] = useState({
    total: 0,
    averageRating: 0,
    topCourse: "",
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/feedback")
        const data = await response.json()

        if (data.success) {
          const feedback: Feedback[] = data.data
          const total = feedback.length

          if (total > 0) {
            const averageRating = feedback.reduce((sum, item) => sum + item.rating, 0) / total

            // Find most common course
            const courseCounts = feedback.reduce(
              (acc, item) => {
                acc[item.courseCode] = (acc[item.courseCode] || 0) + 1
                return acc
              },
              {} as Record<string, number>,
            )

            const topCourse = Object.entries(courseCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A"

            setStats({
              total,
              averageRating: Math.round(averageRating * 10) / 10,
              topCourse,
            })
          }
        }
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    fetchStats()
  }, [refreshTrigger])

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
          <MessageSquare className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">Submissions received</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">Out of 5.0</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Top Course</CardTitle>
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.topCourse}</div>
          <p className="text-xs text-muted-foreground">Most feedback received</p>
        </CardContent>
      </Card>
    </div>
  )
}
