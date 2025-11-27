"use client";

import type { ReactNode } from "react";
import {
  BarChart2,
  Folder,
  Users2,
  Settings,
  HelpCircle,
  Home,
  Building,
} from "lucide-react";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { SettingsModal } from "./settings-modal";
import { HelpModal } from "./help-modal";
import { useState } from "react";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { LogoNoTitle } from "../ui/logo-no-title";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/projects", icon: Folder, label: "Projects" },
  { href: "/dashboard/reports", icon: BarChart2, label: "Reports" },
  { href: "/dashboard/members", icon: Users2, label: "Members" },
  { href: "/dashboard/organization", icon: Building, label: "Organization" },
];

interface SidebarProps {
  isSidebarOpen: boolean;
}

export default function Sidebar({ isSidebarOpen }: SidebarProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const { role } = useCurrentRole();

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string;
    icon: typeof Home;
    children: ReactNode;
  }) {
    return (
      <Link
        href={href}
        className={cn(
          "w-auto flex items-center py-2",
          "text-sm rounded-md transition-colors",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          isSidebarOpen ? "justify-start px-3 gap-4" : "justify-center gap-0",
        )}
      >
        <Icon className={cn("h-4 w-4 flex-shrink-0")} />
        <span
          className={`transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 w-0"
          }`}
          aria-hidden={!isSidebarOpen}
        >
          {children}
        </span>
      </Link>
    );
  }

  return (
    <nav
      className={`relative z-10 bg-sidebar/80 dark:bg-gray-800/80 backdrop-blur-xl border-r border-border/50 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "flex h-16 items-center border-b border-border",
            isSidebarOpen ? "px-6 justify-start" : "p-0 justify-center",
          )}
        >
          {isSidebarOpen ? (
            <Logo className="h-6" />
          ) : (
            <LogoNoTitle className="h-6" />
          )}
        </Link>

        {/* Navigation groups */}
        <div
          className={cn(
            "flex-grow overflow-hidden py-4",
            isSidebarOpen ? "px-4" : "px-2",
          )}
        >
          <div className="space-y-6">
            {/* Overview */}
            <div>
              <p
                className={`px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-opacity duration-200 ${
                  isSidebarOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                Overview
              </p>
              <div className="space-y-1">
                {/* gang proj lng muna */}
                {navItems.slice(0, 3).map((item, i) => (
                  <NavItem key={i} href={item.href} icon={item.icon}>
                    {item.label}
                  </NavItem>
                ))}
                {/*
                // <NavItem href="/dashboard/projects" icon={Folder}>
                //   Projects
                // </NavItem>
                // <NavItem href="/dashboard/reports" icon={BarChart2}>
                //   Reports
                // </NavItem>
                // */}
              </div>
            </div>

            {/* Team */}
            <div>
              <p
                className={`px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-opacity duration-200 ${
                  isSidebarOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                Team
              </p>
              <div className="space-y-1">
                {/* gang proj lng muna */}
                {navItems.slice(3, 5).map((item, i) => (
                  <NavItem key={i} href={item.href} icon={item.icon}>
                    {item.label}
                  </NavItem>
                  // <NavItem href="/dashboard/members" icon={Users2}>
                  //   Members
                  // </NavItem>
                  // <NavItem href="/dashboard/organization" icon={Building}>
                  //   Organization
                  // </NavItem>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={cn(
            "border-t border-border py-4",
            isSidebarOpen ? "px-4" : "px-2",
          )}
        >
          <div className="space-y-1">
            <button onClick={() => setSettingsOpen(true)} className="w-full">
              <NavItem href="#" icon={Settings}>
                Settings
              </NavItem>
            </button>
            <button onClick={() => setHelpOpen(true)} className="w-full">
              <NavItem href="#" icon={HelpCircle}>
                Help
              </NavItem>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
      <HelpModal open={helpOpen} onOpenChange={setHelpOpen} />
    </nav>
  );
}
