"use server"

import fs from "fs/promises"
import path from "path"
import type { UserData, UserResponse } from "@/types/user"

const DATA_FILE = path.join(process.cwd(), "data", "users.json")

export async function submitUserInfo(userData: Omit<UserData, "id">): Promise<UserResponse> {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
    const existingData = await fs.readFile(DATA_FILE, "utf-8").catch(() => "[]")
    const users = JSON.parse(existingData) as UserData[]
    const newUser: UserData = { ...userData, id: Date.now().toString() }
    users.push(newUser)
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2))
    return { success: true }
  } catch (error) {
    console.error("Error saving user data:", error)
    return { success: false, error: "Failed to save user data" }
  }
}

export async function updateUserInfo(userId: string, userData: Partial<UserData>): Promise<UserResponse> {
  try {
    const existingData = await fs.readFile(DATA_FILE, "utf-8")
    const users = JSON.parse(existingData) as UserData[]
    const userIndex = users.findIndex((user: UserData) => user.id === userId)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...userData }
      await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2))
      return { success: true }
    } else {
      return { success: false, error: "User not found" }
    }
  } catch (error) {
    console.error("Error updating user data:", error)
    return { success: false, error: "Failed to update user data" }
  }
}

