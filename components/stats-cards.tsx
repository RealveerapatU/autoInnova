import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

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
    async function fetchDeviceData() {
      const uid = localStorage.getItem("petfeederusername");
      let active = 0;

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/autoinnova/devices/`,
          { uid }
        );

        if (response.status === 200) {
          const data = response.data;
          const devices_id = data.map((item: any) => item.devices_id);

          for (let i = 0; i < devices_id.length; i++) {
            const pingresponse = await axios.get(
              `${process.env.NEXT_PUBLIC_PING_URL}${devices_id[i]}`
            );
            if (pingresponse.data?.online) {
              active++;
            }
          }

          const total = data.length;
          const inactive = total - active;
          setalldevices([String(total), String(active), String(inactive)]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    const interval = setInterval(fetchDeviceData, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{alldevices[0] ?? ""}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{alldevices[1] ?? ""}</div>
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
        </CardContent>
      </Card>
    </div>
  );
}
