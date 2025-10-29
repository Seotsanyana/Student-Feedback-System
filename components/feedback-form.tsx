"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FeedbackFormProps {
  onSubmitSuccess?: () => void
}

export function FeedbackForm({ onSubmitSuccess }: FeedbackFormProps) {
  const [studentName, setStudentName] = useState("")
  const [courseCode, setCourseCode] = useState("")
  const [comments, setComments] = useState("")
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const [errors, setErrors] = useState({
    studentName: "",
    courseCode: "",
    comments: "",
    rating: "",
  })

  const validateForm = () => {
    const newErrors = {
      studentName: "",
      courseCode: "",
      comments: "",
      rating: "",
    }

    if (!studentName.trim()) {
      newErrors.studentName = "Student name is required"
    }

    if (!courseCode.trim()) {
      newErrors.courseCode = "Course code is required"
    }

    if (!comments.trim()) {
      newErrors.comments = "Comments are required"
    } else if (comments.trim().length < 10) {
      newErrors.comments = "Comments must be at least 10 characters"
    }

    if (rating === 0) {
      newErrors.rating = "Please select a rating"
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName,
          courseCode,
          comments,
          rating,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Your feedback has been submitted successfully!",
        })

        // Reset form
        setStudentName("")
        setCourseCode("")
        setComments("")
        setRating(0)
        setErrors({ studentName: "", courseCode: "", comments: "", rating: "" })

        // Call success callback
        onSubmitSuccess?.()
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to submit feedback",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Submit Feedback</CardTitle>
        <CardDescription>Share your thoughts about your course experience</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="studentName">Student Name</Label>
            <Input
              id="studentName"
              placeholder="Enter your full name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className={errors.studentName ? "border-destructive" : ""}
            />
            {errors.studentName && <p className="text-sm text-destructive">{errors.studentName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseCode">Course Code</Label>
            <Input
              id="courseCode"
              placeholder="e.g., CS101, MATH201"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className={errors.courseCode ? "border-destructive" : ""}
            />
            {errors.courseCode && <p className="text-sm text-destructive">{errors.courseCode}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">Comments</Label>
            <Textarea
              id="comments"
              placeholder="Share your detailed feedback about the course..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={5}
              className={errors.comments ? "border-destructive" : ""}
            />
            {errors.comments && <p className="text-sm text-destructive">{errors.comments}</p>}
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && <span className="ml-2 text-sm text-muted-foreground">({rating}/5)</span>}
            </div>
            {errors.rating && <p className="text-sm text-destructive">{errors.rating}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
