import { type NextRequest, NextResponse } from "next/server"
import { getAllFeedback, addFeedback, deleteFeedback } from "@/lib/feedback-store"

export const dynamic = "force-static"

// GET endpoint to retrieve all feedback
export async function GET() {
  try {
    const feedback = await getAllFeedback()
    return NextResponse.json({ success: true, data: feedback }, { status: 200 })
  } catch (error) {
    console.error("Error fetching feedback:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch feedback" }, { status: 500 })
  }
}

// POST endpoint to add new feedback
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { studentName, courseCode, comments, rating } = body

    // Validation
    if (!studentName || !courseCode || !comments || rating === undefined) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, error: "Rating must be a number between 1 and 5" }, { status: 400 })
    }

    const newFeedback = await addFeedback({
      studentName: studentName.trim(),
      courseCode: courseCode.trim().toUpperCase(),
      comments: comments.trim(),
      rating,
    })

    return NextResponse.json({ success: true, data: newFeedback }, { status: 201 })
  } catch (error) {
    console.error("Error adding feedback:", error)
    return NextResponse.json({ success: false, error: "Failed to add feedback" }, { status: 500 })
  }
}

// DELETE endpoint to remove feedback
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Feedback ID is required" }, { status: 400 })
    }

    const deleted = await deleteFeedback(id)

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Feedback not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Feedback deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting feedback:", error)
    return NextResponse.json({ success: false, error: "Failed to delete feedback" }, { status: 500 })
  }
}
