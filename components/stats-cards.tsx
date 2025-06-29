import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
let devices_id = [];
let types = [];
let fault = 0;
async function getDeviceid() {
  let active = 0;
  const uid = localStorage.getItem("petfeederusername");
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/autoinnova/devices/`,
      {
        uid: uid,
      }
    );
    if (response.status === 200) {
      const data = response.data;
      devices_id = data.map((item: any) => {
        return item.devices_id;
      });
      types = data.map((item: any) => {
        return item.types;
      });

      for (let i = 0; i < devices_id.length; i++) {
        const pingresponse = await axios.get(
          `${process.env.NEXT_PUBLIC_PING_URL}${devices_id[i]}`
        );

        const pingdata = pingresponse.data;
        const devicestatus = pingdata.online;

        if (devicestatus === true) {
          active++;
        }
      }
      // console.log(active);
      return data.length + " " + active + " " + (data.length - active);
    }
  } catch (error) {
    console.log(error);
  }
}

const stats = [
  {
    title: "Total Devices",
    value: "$45,231.89",
    description: "+20.1% from last month",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Active ",
    value: "+2,350",
    description: "+180.1% from last month",
    icon: Users,
    trend: "up",
  },
  {
    title: "Inactive",
    value: "+12,234",
    description: "+19% from last month",
    icon: TrendingUp,
    trend: "up",
  },
  // {
  //   title: "Active Now",
  //   value: "+573",
  //   description: "+201 since last hour",
  //   icon: Activity,
  //   trend: "up",
  // },
];

export function StatsCards() {
  const [alldevices, setalldevices] = useState<string[]>([]);
  useEffect(() => {
    setInterval(async () => {
      const total = await getDeviceid();
      const data = total?.trim().split(" ");
      // console.log(data);

      setalldevices(data!);
    }, 1000);
  }, []);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{alldevices[0] ?? ""}</div>
          <p className="text-xs text-muted-foreground"></p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{alldevices[1] ?? ""}</div>
          <p className="text-xs text-muted-foreground"></p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Inactive Devices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{alldevices[2] ?? ""}</div>
          <p className="text-xs text-muted-foreground"></p>
        </CardContent>
      </Card>
    </div>
  );
}
