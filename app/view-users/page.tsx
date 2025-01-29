import UserCard from "@/app/components/UserCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ViewUsers() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View/Update Users</h1>
      <UserCard />
      <div className="mt-4">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}

