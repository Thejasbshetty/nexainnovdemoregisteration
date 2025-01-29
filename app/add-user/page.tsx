import UserForm from "@/app/components/UserForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AddUser() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add User Information</h1>
      <UserForm />
      <div className="mt-4">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}

