'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Feed } from '@prisma/client'

interface Props {
  project: Feed
}

export function ProjectDashboardComponent(props: Props) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{props.project.title}</h1>
        </div>
        <Badge variant="outline" className='bg-green-300'>Active</Badge>
      </div>

      {/* Project Metrics */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8 hours</div>
            <p className="text-xs text-muted-foreground">-22% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+3 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Satisfaction</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <Progress value={92} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Feedback and Issues Tabs */}
      <Tabs defaultValue="feedback" className="mb-8">
        <TabsList>
          <TabsTrigger value="feedback">Recent Feedback</TabsTrigger>
          <TabsTrigger value="issues">Open Issues</TabsTrigger>
        </TabsList>
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
              <CardDescription>Latest user feedback for Project Alpha</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Alice Johnson', content: 'The new feature is amazing! It has greatly improved my workflow.', sentiment: 'positive' },
                  { name: 'Bob Smith', content: 'I\'m having trouble with the export function. It crashes sometimes.', sentiment: 'negative' },
                  { name: 'Carol Williams', content: 'The UI is intuitive, but I think the color scheme could be improved.', sentiment: 'neutral' }
                ].map((feedback, i) => (
                  <div key={i} className="flex items-start">
                    <Avatar className="mr-4">
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 1}`} alt={feedback.name} />
                      <AvatarFallback>{feedback.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{feedback.name}</p>
                      <p className="text-sm text-gray-500">{feedback.content}</p>
                      <Badge variant={feedback.sentiment === 'positive' ? 'default' : feedback.sentiment === 'negative' ? 'destructive' : 'secondary'} className="mt-2">
                        {feedback.sentiment}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="issues">
          <Card>
            <CardHeader>
              <CardTitle>Open Issues</CardTitle>
              <CardDescription>Current open issues for Project Alpha</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: 'Export function crashes', priority: 'high', assignee: 'John Doe' },
                  { title: 'Improve color scheme', priority: 'medium', assignee: 'Jane Smith' },
                  { title: 'Add dark mode', priority: 'low', assignee: 'Unassigned' }
                ].map((issue, i) => (
                  <div key={i} className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-4 ${issue.priority === 'high' ? 'bg-red-500' : issue.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">{issue.title}</p>
                      <p className="text-xs text-gray-500">Assigned to: {issue.assignee}</p>
                    </div>
                    <Badge variant="outline">{issue.priority}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Project Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
          <CardDescription>Key milestones and upcoming deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: '2023-09-15', event: 'Project Kickoff', status: 'completed' },
              { date: '2023-10-30', event: 'Alpha Release', status: 'completed' },
              { date: '2023-12-15', event: 'Beta Testing', status: 'in-progress' },
              { date: '2024-01-31', event: 'Final Release', status: 'upcoming' }
            ].map((milestone, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-4 ${milestone.status === 'completed' ? 'bg-green-500' : milestone.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
                <div className="flex-grow">
                  <p className="text-sm font-medium">{milestone.event}</p>
                  <p className="text-xs text-gray-500">{milestone.date}</p>
                </div>
                <Badge variant={milestone.status === 'completed' ? 'default' : milestone.status === 'in-progress' ? 'secondary' : 'outline'}>
                  {milestone.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
