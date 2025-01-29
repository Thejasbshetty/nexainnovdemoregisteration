import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "data", "users.json")

export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8")
    const users = JSON.parse(data)
    return NextResponse.json(Array.isArray(users) ? users : [])
  } catch (error) {
    console.error("Error reading user data:", error)
    if (error instanceof Error && error.code === "ENOENT") {
      // File doesn't exist, return an empty array
      return NextResponse.json([])
    }
    return NextResponse.json({ error: "Failed to read user data" }, { status: 500 })
  }
}
