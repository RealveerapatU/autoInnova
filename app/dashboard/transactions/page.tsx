"use client";
import React, { useEffect } from "react";
import { RecentActivity } from "@/components/dashboard/schedulelist";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
export default function page() {
 
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
