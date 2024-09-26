"use client"

import { useState } from "react"
import { PlusCircle, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Field {
  id: string
  label: string
  type: string
}

export function FormCreatorComponent() {
  const [title, setTitle] = useState("")
  const [selectedProject, setSelectedProject] = useState("")
  const [fields, setFields] = useState<Field[]>([
    { id: "1", label: "Name", type: "text" },
    { id: "2", label: "Email", type: "text" },
    { id: "3", label: "Message", type: "text" },
  ])

  const addField = () => {
    const newField: Field = {
      id: Date.now().toString(),
      label: `Field ${fields.length + 1}`,
      type: "text",
    }
    setFields([...fields, newField])
  }

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted", { title, selectedProject, fields })
    // Here you would typically send the form data to your backend
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create a New Form</CardTitle>
        <CardDescription>Design your custom form with fields</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Form Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter form title"
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="project" className="block text-sm font-medium text-gray-700">
                Select Project
              </label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger id="project" className="mt-1">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project1">Project 1</SelectItem>
                  <SelectItem value="project2">Project 2</SelectItem>
                  <SelectItem value="project3">Project 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Form Fields</label>
              {fields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2 mb-2">
                  <Input
                    value={field.label}
                    onChange={(e) => {
                      const updatedFields = fields.map((f) =>
                        f.id === field.id ? { ...f, label: e.target.value } : f
                      )
                      setFields(updatedFields)
                    }}
                    placeholder="Field label"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeField(field.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addField} className="mt-2">
                <PlusCircle className="h-4 w-4 mr-2" /> Add Field
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={handleSubmit} className="w-full">Create Form</Button>
      </CardFooter>
    </Card>
  )
}