"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Feedback } from "@/lib/feedback-store"

interface FeedbackListProps {
  refreshTrigger?: number
}

export function FeedbackList({ refreshTrigger }: FeedbackListProps) {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchFeedback = async () => {
    try {
      const response = await fetch("/api/feedback")
      const data = await response.json()

      if (data.success) {
        setFeedback(data.data)
      } else {
        toast({
          title: "Error",
          description: "Failed to load feedback",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching feedback:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFeedback()
  }, [refreshTrigger])

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/feedback?id=${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Feedback deleted successfully",
        })
        fetchFeedback()
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to delete feedback",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting feedback:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading feedback...</div>
      </div>
    )
  }

  if (feedback.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="py-12">
          <p className="text-center text-muted-foreground">
            No feedback submitted yet. Be the first to share your thoughts!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {feedback.map((item) => (
        <Card key={item.id} className="w-full">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl">{item.studentName}</CardTitle>
                <CardDescription className="font-mono text-sm">{item.courseCode}</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < item.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sr-only">Delete feedback</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{item.comments}</p>
            <p className="text-xs text-muted-foreground mt-4">
              Submitted on{" "}
              {new Date(item.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
