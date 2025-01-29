import UserForm from "@/app/components/UserForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import fs from "fs/promises"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "data", "users.json")

async function getUserData(id: string) {
  const data = await fs.readFile(DATA_FILE, "utf-8")
  const users = JSON.parse(data)
  return users.find((user: any) => user.id === id)
}

export default async function EditUser({ params }: { params: { id: string } }) {
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

