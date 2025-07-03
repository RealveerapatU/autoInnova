"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { RecentActivity } from "@/components/dashboard/schedulelist";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
export default function Page() {
  const [username, setusername] = useState<string>("");

   useEffect(() => {
    const validateuid = async () => {
      const uid = localStorage.getItem("petfeederusername") || "";
      setusername(uid);
      if (!uid) {
        alert("401 Unauthorized");
        localStorage.setItem("logout", "1");
        window.location.href = "/signin";
        return;
      }
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/autoinnova/user`,
          {
            line_uid: uid,
          }
        );
        if (response.status === 200) {
          const data = response.data;
          if (Array.isArray(data) && data.length === 0) {
            alert("Unauthorized");
            localStorage.removeItem("petfeederdisplayname");
            localStorage.removeItem("petfeederusername");
            localStorage.removeItem("petfeederuserprofile");
            localStorage.setItem("logout", "1");
            window.location.href = "/signin";
          }
        }
      } catch (error) {
        alert("500 Internal Server error");
      }
    };

    validateuid();
    const interval = setInterval(validateuid, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <StatsCards /> */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <RecentActivity />
            </div>
            {/* <div className="space-y-4">
              <div className="rounded-xl bg-muted/50 p-4">
                <h3 className="font-semibold mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 rounded-md hover:bg-background transition-colors">
                    Create New Project
                  </button>
                  <button className="w-full text-left p-2 rounded-md hover:bg-background transition-colors">
                    Invite Team Member
                  </button>
                  <button className="w-full text-left p-2 rounded-md hover:bg-background transition-colors">
                    View Analytics
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
