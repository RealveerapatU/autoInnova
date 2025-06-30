"use client";
import { Button, Form, NumberInput } from "@heroui/react";
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

import { Clock, Activity } from "lucide-react";
import axios from "axios";
import { stat } from "fs";
import React from "react";

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
  let jsonformat = [];
  const [selectedActivity, setSelectedActivity] = useState<
    (typeof recentActivity)[0] | null
  >(null);
  const [alldata, setdata] = useState<any[]>([]);
  const [alldatajson, setdatajson] = useState<
    { deviceid: string; type: string; uid: string; status: string }[]
  >([]);
  const [submitted, setSubmitted] = React.useState<{
    [k: string]: FormDataEntryValue;
  } | null>(null);
  const [amount, setAmount] = React.useState<number | undefined>(undefined);
  const errors: string[] = [];

  const onSubmit = (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    setSubmitted(data);
  };

  if (!amount) {
    errors.push("The value must not be empty");
  }

  if (amount! < 100) {
    errors.push("The value must be greater than 100");
  }

  if (amount! > 1000) {
    errors.push("The value must be less than 1000");
  }

  useEffect(() => {
    async function fetchDeviceData() {
      const uid = localStorage.getItem("petfeederusername");
      let active = 0;

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/autoinnova/devices/`,
          { uid }
        );
        let status = [];
        if (response.status === 200) {
          const datas = response.data;
          const deviceid = datas.map((item: any) => item.devices_id);
          for (let i = 0; i < deviceid.length; i++) {
            const responseping = await axios.get(
              `${process.env.NEXT_PUBLIC_PING_URL}${deviceid[i]}`
            );

            if (responseping.data.online) {
              status[i] = "active";
            } else {
              status[i] = "Inactive";
            }
            // console.log(status[i])
          }

          setdata(datas);
          jsonformat = datas.map((item: any, i: number) => {
            return {
              deviceid: item.devices_id,
              type: item.types,
              uid: item.line_uid,
              status: status[i],
            };
          });
          setdatajson(jsonformat);
          console.log(jsonformat);
        }
      } catch (error) {
        console.error(error);
      }
    }

    const interval = setInterval(fetchDeviceData, 1000);

    return () => clearInterval(interval);
  }, []);
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
            {alldatajson.map((activity) => (
              <Card
                key={activity.deviceid}
                className="cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-l-4 border-l-blue-500"
                onClick={() =>
                  setSelectedActivity({
                    id: activity.deviceid,
                    user: activity.deviceid,
                    email: "",
                    action: "",
                    status: activity.status,
                    time: "",
                    avatar: "",
                    details: "",
                    device: activity.type,
                    location: "",
                  })
                }
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {activity.deviceid}
                          </span>
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
                          {activity.type}
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
                    {/* <Activity className="h-4 w-4" />
                    Action
                    <br />
                    <NumberInput
                      className="max-w-3xs"
                      placeholder="Enter the amount"
                    /> */}
                    <div className="space-y-2">
                      <div className="space-y-2">
                        <h4 className="font-medium">Device</h4>
                        <p className="text-sm">{selectedActivity.device}</p>
                        {/* <h4 className="font-medium">Device</h4>
                  <p className="text-sm">{selectedActivity.device}</p> */}
                      </div>
                    </div>
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
                <div className="space-y-2">
                  <h4 className="font-medium">Action</h4>

                  {/* <p className="text-sm">{selectedActivity.device}</p> */}
                  {selectedActivity.device === "PetFeeder" ? (
                    <Form className="w-full max-w-md" onSubmit={onSubmit}>
                      <NumberInput
                        errorMessage={() => (
                          <ul>
                            {errors.map((error, i) => (
                              <li key={i}>{error}</li>
                            ))}
                          </ul>
                        )}
                        isInvalid={errors.length > 0}
                        label="Amount"
                        name="amount"
                        placeholder="Enter a number"
                        value={amount}
                        onValueChange={setAmount}
                        className="w-64 text-base"
                        // inputProps removed as NumberInput does not support it
                      />
                      <Button
                        color="primary"
                        type="submit"
                        className="mt-2 h-10 px-6 text-base"
                      >
                        Submit
                      </Button>
                      {submitted && (
                        <div className="text-small text-default-500 mt-2">
                          You submitted:{" "}
                          <code>{JSON.stringify(submitted)}</code>
                        </div>
                      )}
                    </Form>
                  ) : null}

                  {/* <h4 className="font-medium">Device</h4>
                  <p className="text-sm">{selectedActivity.device}</p> */}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  {/* <h4 className="font-medium">Device</h4>
                  <p className="text-sm">{selectedActivity.device}</p> */}
                </div>
                {/* <div className="space-y-2">
                  <h4 className="font-medium">Location</h4>
                  <p className="text-sm">{selectedActivity.location}</p>
                </div> */}
              </div>

              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  History
                </h4>

                <p className="text-sm">{selectedActivity.time}</p>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="bordered"
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
