"use client";
import { Button, Form, NumberInput } from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Divider,
} from "@heroui/react";

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

import { Clock, Activity, Plus } from "lucide-react";
import axios from "axios";
import React from "react";

type RecentActivityItem = {
  id: string;
  user: string;
  email: string;
  action: string;
  status: string;
  time: string;
  avatar: string;
  details: string;
  device: string;
  location: string;
};

const recentActivity: RecentActivityItem[] = [
  /* ...same data as before... */
];

export function RecentActivity() {
  const [username, setUsername] = React.useState<string | string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isScheduleOpen,
    onOpen: onScheduleOpen,
    onOpenChange: onScheduleOpenChange,
  } = useDisclosure();
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

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const device = selectedActivity?.id;
    const value = data.amount;
    const type = selectedActivity?.device;
    const status = selectedActivity?.status;
    if (status === "Inactive") {
      alert(
        "(400: Bad Request)Device Inactive unable to establish connection.Make sure devices plugged in and connected "
      );
      return;
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_Rotate}`, {
      device_id: device,
      action: `rotate${value}`,
    });
    if (response.status === 200) {
      alert("Success");
      const historyresponse = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/autoinnova/Transanction`,
        {
          device: device,
          type: type,
          amount: value,
          lineuid: username,
        }
      );
    }
    setSubmitted(data);
  };

  if (!amount) {
    errors.push("The value must not be empty");
  }

  if (amount! < 0) {
    errors.push("The value must be greater than 0");
  }

  if (amount! > 10) {
    errors.push("The value must be less than 10");
  }

  useEffect(() => {
    async function fetchDeviceData() {
      const uid = localStorage.getItem("petfeederusername");
      setUsername(uid!);
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
      <br />
      <Card>
        <CardHeader>
          <CardTitle>Device Management</CardTitle>
          <CardDescription>
            all of your devices will be shown here
          </CardDescription>
          <div className="w-full">
            <div className="flex">
              <div className="ml-auto flex gap-2">
                <Button onPress={onOpen}>
                  <Plus />
                  New
                </Button>
                <Button onPress={onScheduleOpen}>Schedule</Button>
              </div>
            </div>
          </div>
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

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Devices
              </ModalHeader>
              <ModalBody>
                <p>...New device content...</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        backdrop="opaque"
        isOpen={isScheduleOpen}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        onOpenChange={onScheduleOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Schedule
              </ModalHeader>
              <ModalBody>
                <p>Here you can schedule device actions.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

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
                  <h4 className="font-medium">Device</h4>
                  <p className="text-sm">{selectedActivity.device}</p>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <h4 className="font-medium">Action</h4>

                  {selectedActivity.device === "PetFeeder" && (
                    <Form className="w-full max-w-full" onSubmit={onSubmit}>
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
                      />

                      <div className="w-full flex justify-end gap-2 mt-6">
                        <Button
                          color="primary"
                          type="submit"
                          className="h-10 px-6 text-base"
                        >
                          Submit
                        </Button>
                        <Button
                          variant="bordered"
                          type="button"
                          onClick={() => setSelectedActivity(null)}
                        >
                          Close
                        </Button>
                      </div>

                      {submitted && (
                        <div className="text-small text-default-500 mt-2"></div>
                      )}
                    </Form>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
