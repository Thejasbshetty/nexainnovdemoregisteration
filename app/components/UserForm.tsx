"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { submitUserInfo, updateUserInfo } from "@/app/actions"

interface UserFormProps {
  userId?: string
  initialData?: {
    name: string
    dob: string
    age: string
    address: string
  }
}

export default function UserForm({ userId, initialData }: UserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    age: "",
    address: "",
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    if (userId) {
      await updateUserInfo(userId, formData)
    } else {
      await submitUserInfo(formData)
    }

    setIsSubmitting(false)
    router.push("/view-users")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="dob">Date of Birth</Label>
        <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="age">Age</Label>
        <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : userId ? "Update" : "Submit"}
      </Button>
    </form>
  )
}

