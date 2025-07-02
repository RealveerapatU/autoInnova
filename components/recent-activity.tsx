"use client";
import { Select, SelectItem } from "@heroui/react";

import { Time } from "@internationalized/date";
import { TimeInput } from "@heroui/react";
import { Button, Form, NumberInput } from "@heroui/react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { DatePicker } from "@heroui/date-picker";
import { Input } from "@heroui/react";
import { DateInput } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";
import { DateRangePicker } from "@heroui/react";
import { parseAbsoluteToLocal } from "@internationalized/date";
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
  let [date, setDate] = React.useState({
    start: parseAbsoluteToLocal("2024-04-01T18:45:22Z"),
    end: parseAbsoluteToLocal("2024-04-08T19:15:22Z"),
  });

  const [username, setUsername] = React.useState<string | string>("");
  const [submittedusername, setSubmittedusername] = React.useState<{
    [k: string]: FormDataEntryValue;
  } | null>(null);

  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [repeatType, setRepeatType] = useState<"once" | "daily">("once");
  const [scheduleDate, setScheduleDate] = useState<CalendarDate | null>(null);
  const [scheduleTime, setScheduleTime] = useState<Time | null>(null);
  const [scheduleHour, setScheduleHour] = useState<string>("12");
  const [scheduleMinute, setScheduleMinute] = useState<string>("00");

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 12 }, (_, i) =>
    (i * 5).toString().padStart(2, "0")
  );

  const [scheduleAmount, setScheduleAmount] = useState<number>(1);

  const onSubmitusername = async (e: any) => {
    let repeatdevices = false;
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const deviceName = formData.get("deviceName");
    try {
      const checkownuserres = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/autoinnova/devices/searchdeviceid`
      );
      if (checkownuserres.status === 200) {
        const data = checkownuserres.data;
        const devid = data.map((item: any) => item.devices_id);
        for (let i = 0; i < devid.length; i++) {
          if (devid[i] === deviceName) {
            repeatdevices = true;
            break;
          }
        }
        if (repeatdevices) {
          alert("Devices has already taken");
          return;
        }
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/autoinnova/adddevices`,
          {
            uid: username,
            deviceid: deviceName,
            type: "PetFeeder",
          }
        );
        if (response.status === 200) {
          alert("Success");
        }
      }

      // const response = await axios.get(
      //   `${process.env.NEXT_PUBLIC_PING_URL}${deviceName}`
      // );
      // if (response.data?.online) {
      //   alert("status:200 Connection Established");
      // }
    } catch (error) {
      alert("500 Internal Server Error");
    }
  };
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

  const onScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (
    //   !selectedDeviceId ||
    //   !scheduleTime ||
    //   !scheduleAmount ||
    //   !repeatType ||
    //   (repeatType === "once" && !scheduleDate)
    // ) {
    //   alert("Please fill in all required fields.");
    //   return;
    // }
    try {
      const payload = {
        devices_id: selectedDeviceId,
        repeat_type: repeatType,
        date: repeatType === "once" ? scheduleDate?.toString() : null,
        time: `${scheduleHour}:${scheduleMinute}`,
        amount: scheduleAmount.toString(),
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ADD_SCHEDULE}`,
        payload
      );
      if (response.status === 200) alert("Schedule added successfully");
    } catch (error) {
      // alert("Error adding schedule");
      console.log(error);
    }
  };

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
                <Button onPress={onScheduleOpen}>
                  <Clock /> Schedule
                </Button>
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
              <Form className="w-full space-y-4" onSubmit={onSubmitusername}>
                <ModalHeader className="flex flex-col gap-1">
                  Add New Device
                </ModalHeader>
                <ModalBody>
                  <Input
                    isRequired
                    label="Device Name"
                    labelPlacement="outside"
                    name="deviceName"
                    placeholder="Enter device name"
                    type="text"
                    className="mb-3"
                  />
                </ModalBody>
                <ModalFooter className="flex justify-end gap-3 w-full">
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    type="button"
                  >
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Add Device
                  </Button>
                </ModalFooter>
              </Form>

              {/* <ModalBody>
                <p>...New device content...</p>
              </ModalBody> */}
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        backdrop="opaque"
        isOpen={isScheduleOpen}
        onOpenChange={onScheduleOpenChange}
        shouldBlockScroll={true}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <Form className="w-full space-y-4" onSubmit={onScheduleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Scheduling
              </ModalHeader>
              <ModalBody>
                <Select
                  label="Select Device"
                  selectedKeys={selectedDeviceId ? [selectedDeviceId] : []}
                  onSelectionChange={(keys) =>
                    setSelectedDeviceId(Array.from(keys)[0] as string)
                  }
                >
                  {alldatajson.map((item) => (
                    <SelectItem key={item.deviceid}>{item.deviceid}</SelectItem>
                  ))}
                </Select>

                <Select
                  label="Repeat Type"
                  selectedKeys={[repeatType]}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as "once" | "daily";
                    setRepeatType(selected);
                    if (selected === "daily") setScheduleDate(null);
                  }}
                  className="mt-4"
                >
                  <SelectItem key="once">Once</SelectItem>
                  <SelectItem key="daily">Daily</SelectItem>
                </Select>

                {repeatType === "once" && (
                  <DatePicker
                    label="Date"
                    value={scheduleDate ?? undefined}
                    onChange={setScheduleDate}
                    className="mt-4"
                  />
                )}
                <div className="flex gap-4 mt-4">
                  <Select
                    label="Hour"
                    selectedKeys={
                      scheduleHour ? new Set([scheduleHour]) : new Set()
                    }
                    onSelectionChange={(keys) => {
                      // keys อาจเป็น Set หรือ string
                      if (typeof keys === "string") {
                        setScheduleHour(keys);
                      } else if (keys instanceof Set) {
                        setScheduleHour(String(Array.from(keys)[0]));
                      }
                    }}
                  >
                    {hours.map((h) => (
                      <SelectItem key={h}>{h}</SelectItem>
                    ))}
                  </Select>

                  <Select
                    label="Minute"
                    selectedKeys={
                      scheduleMinute ? new Set([scheduleMinute]) : new Set()
                    }
                    onSelectionChange={(keys) => {
                      if (typeof keys === "string") {
                        setScheduleMinute(keys);
                      } else if (keys instanceof Set) {
                        setScheduleMinute(String(Array.from(keys)[0]));
                      }
                    }}
                  >
                    {minutes.map((m) => (
                      <SelectItem key={m}>{m}</SelectItem>
                    ))}
                  </Select>
                </div>

                <NumberInput
                  label="Amount"
                  placeholder="e.g. 1"
                  value={scheduleAmount}
                  onValueChange={setScheduleAmount}
                  minValue={1}
                  maxValue={10}
                  className="mt-4"
                />
              </ModalBody>
              <ModalFooter className="flex justify-end gap-3 w-full">
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  type="button"
                >
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Add Schedule
                </Button>
              </ModalFooter>
            </Form>
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
