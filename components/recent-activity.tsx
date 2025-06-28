"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Activity } from "lucide-react";

const recentActivity = [
  {
    id: "1",
    user: "John Doe",
    email: "john@example.com",
    action: "Created new project",
    status: "completed",
    time: "2 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
    details:
      "Created a new React project with TypeScript configuration and set up the initial file structure.",
    device: "MacBook Pro",
    location: "San Francisco, CA",
  },
  {
    id: "2",
    user: "Jane Smith",
    email: "jane@example.com",
    action: "Updated user profile",
    status: "completed",
    time: "5 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
    details:
      "Updated profile picture and contact information in the user settings panel.",
    device: "iPhone 15 Pro",
    location: "New York, NY",
  },
  {
    id: "3",
    user: "Mike Johnson",
    email: "mike@example.com",
    action: "Deployed to production",
    status: "in-progress",
    time: "10 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
    details:
      "Initiated deployment pipeline for version 2.1.0 to production environment.",
    device: "Windows Surface",
    location: "Austin, TX",
  },
  {
    id: "4",
    user: "Sarah Wilson",
    email: "sarah@example.com",
    action: "Invited team member",
    status: "completed",
    time: "15 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
    details:
      "Sent invitation to alex@company.com to join the development team with admin privileges.",
    device: "iPad Air",
    location: "Seattle, WA",
  },
  {
    id: "5",
    user: "Tom Brown",
    email: "tom@example.com",
    action: "Updated documentation",
    status: "pending",
    time: "20 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
    details:
      "Added new API documentation for the authentication endpoints and updated examples.",
    device: "MacBook Air",
    location: "Los Angeles, CA",
  },
];

export function RecentActivity() {
  const [selectedActivity, setSelectedActivity] = useState<
    (typeof recentActivity)[0] | null
  >(null);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Device Management</CardTitle>
          <CardDescription>
            all of your devices will be shown here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {recentActivity.map((activity) => (
              <Card
                key={activity.id}
                className="cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-l-4 border-l-blue-500"
                onClick={() => setSelectedActivity(activity)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={activity.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {activity.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar> */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{activity.user}</span>
                          <Badge
                            variant={
                              activity.status === "completed"
                                ? "default"
                                : activity.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {activity.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {activity.action}
                        </p>
                        {/* <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {activity.time}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {activity.email}
                          </span>
                        </div> */}
                      </div>
                    </div>
                    <div className="text-right">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedActivity}
        onOpenChange={() => setSelectedActivity(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={selectedActivity?.avatar || "/placeholder.svg"}
                />
                <AvatarFallback>
                  {selectedActivity?.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">
                  {selectedActivity?.user}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedActivity?.email}
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>

          {selectedActivity && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Action
                  </h4>
                  <p className="text-sm">{selectedActivity.action}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Status</h4>
                  <Badge
                    variant={
                      selectedActivity.status === "completed"
                        ? "default"
                        : selectedActivity.status === "in-progress"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {selectedActivity.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Details</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedActivity.details}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Device</h4>
                  <p className="text-sm">{selectedActivity.device}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Location</h4>
                  <p className="text-sm">{selectedActivity.location}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Timestamp
                </h4>
                <p className="text-sm">{selectedActivity.time}</p>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setSelectedActivity(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
