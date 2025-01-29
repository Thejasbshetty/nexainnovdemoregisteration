import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">User Information App</h1>
      <div className="flex flex-col items-center space-y-4">
        <Link href="/add-user">
          <Button>Add User Info</Button>
        </Link>
        <Link href="/view-users">
          <Button variant="outline">View/Update Users</Button>
        </Link>
      </div>
    </main>
  )
}

