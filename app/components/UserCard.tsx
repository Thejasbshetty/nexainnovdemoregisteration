"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateUserInfo } from "@/app/actions"

interface User {
  id: string
  name: string
  dob: string
  age: string
  address: string
}

export default function UserCard() {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<User | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users")
      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }
      const data = await response.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Error fetching users:", err)
      setError("Failed to load users. Please try again later.")
    }
  }

  const handleEdit = (user: User) => {
    setEditingId(user.id)
    setEditForm(user)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editForm) {
      setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }
  }

  const handleUpdate = async () => {
    if (editForm) {
      await updateUserInfo(editForm.id, editForm)
      setEditingId(null)
      setEditForm(null)
      fetchUsers()
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (users.length === 0) {
    return <div>No users found.</div>
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {editingId === user.id ? (
              <div className="space-y-2">
                <Input name="name" value={editForm?.name} onChange={handleChange} placeholder="Name" />
                <Input
                  name="dob"
                  type="date"
                  value={editForm?.dob}
                  onChange={handleChange}
                  placeholder="Date of Birth"
                />
                <Input name="age" type="number" value={editForm?.age} onChange={handleChange} placeholder="Age" />
                <Input name="address" value={editForm?.address} onChange={handleChange} placeholder="Address" />
                <div className="space-x-2">
                  <Button onClick={handleUpdate}>Save</Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p>
                  <strong>Date of Birth:</strong> {user.dob}
                </p>
                <p>
                  <strong>Age:</strong> {user.age}
                </p>
                <p>
                  <strong>Address:</strong> {user.address}
                </p>
                <Button className="mt-2" onClick={() => handleEdit(user)}>
                  Edit
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

