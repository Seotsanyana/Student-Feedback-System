import { initDatabase, dbAll, dbRun, dbGet, dbDelete } from './db'

export interface Feedback {
  id: string
  studentName: string
  courseCode: string
  comments: string
  rating: number
  createdAt: string
}

// Initialize database on module load
initDatabase().catch(console.error)

export async function getAllFeedback(): Promise<Feedback[]> {
  try {
    const rows = await dbAll('') as any[]
    return rows.map((row) => ({
      id: row.id.toString(),
      studentName: row.studentName,
      courseCode: row.courseCode,
      comments: row.comments,
      rating: row.rating,
      createdAt: row.createdAt,
    })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.error('Error fetching feedback:', error)
    throw error
  }
}

export async function addFeedback(feedback: Omit<Feedback, "id" | "createdAt">): Promise<Feedback> {
  try {
    const result = await dbRun(
      '',
      feedback.studentName, feedback.courseCode, feedback.comments, feedback.rating
    ) as any

    // Get the inserted feedback with the generated ID
    const inserted = await dbGet('', result.lastID.toString()) as any
    return {
      id: inserted.id.toString(),
      studentName: inserted.studentName,
      courseCode: inserted.courseCode,
      comments: inserted.comments,
      rating: inserted.rating,
      createdAt: inserted.createdAt,
    }
  } catch (error) {
    console.error('Error adding feedback:', error)
    throw error
  }
}

export async function deleteFeedback(id: string): Promise<boolean> {
  try {
    return await dbDelete(id)
  } catch (error) {
    console.error('Error deleting feedback:', error)
    throw error
  }
}
