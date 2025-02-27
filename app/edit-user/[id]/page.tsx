import UserForm from "@/app/components/UserForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import fs from "fs/promises"
import path from "path"
import type { UserData } from "@/types/user"

const DATA_FILE = path.join(process.cwd(), "data", "users.json")

async function getUserData(id: string): Promise<UserData | null> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8")
    const users = JSON.parse(data) as UserData[]
    return users.find((user: UserData) => user.id === id) || null
  } catch (error) {
    console.error("Error reading user data:", error)
    return null
  }
}

interface PageProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function EditUser({ params, searchParams }: PageProps) {
  const userData = await getUserData(params.id)

  if (!userData) {
    return <div>User not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit User Information</h1>
      <UserForm userId={params.id} initialData={userData} />
      <div className="mt-4">
        <Link href="/view-users">
          <Button variant="outline">Back to Users</Button>
        </Link>
      </div>
    </div>
  )
}

