"use client";

import { useEffect, useState } from "react";
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
import axios from "axios";

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
  const [alldatajson, setdatajson] = useState<
    {
      id: any;
      device: any;
      repeat: any;
      date: any;
      time: any;
      amount: any;
    }[]
  >([]);
  const [username, setusername] = useState<string>("");
  useEffect(() => {
    const uid = localStorage.getItem("petfeederusername");
    setusername(uid || "");
    console.log(uid);
    const getSchedule = async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/autoinnova/getschedule`,
        {
          lineuid: uid,
        }
      );
      if (response.status === 200) {
        const data = response.data;
        const jsonformat = data.map((item: any) => ({
          id: item.id,
          device: item.devices_id,
          repeat: item.repeat_type,
          date: item.date,
          time: item.time,

          amount: item.amount,
        }));
        setdatajson(jsonformat);
        // console.log(jsonformat);
      } else {
        setdatajson([]);
      }
    };

    getSchedule();
    setInterval(() => {
      getSchedule();
    }, 1000);
  }, [username]);

  async function handleDelete(id: any): Promise<void> {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/autoinnova/getschedule`,
        {
          data: {
            scheduleid: id,
          },
        }
      );
      if (response.status === 200) {
        alert("Delete Success");
        return;
      }
    } catch (error) {
      alert("Unable to delete");
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
          <CardDescription>
            Latest transactions from your devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {alldatajson.length === 0 ? (
              <div className="text-muted-foreground text-center py-8">
                No activity found.
              </div>
            ) : (
              alldatajson.map((activity, idx) => (
                <Card
                  key={idx}
                  className="transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-l-4 border-l-blue-500"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">
                          Device: {activity.device}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Repeat: {activity.repeat}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Date: {activity.date}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Time: {activity.time}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Amount: {activity.amount}
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(activity.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
