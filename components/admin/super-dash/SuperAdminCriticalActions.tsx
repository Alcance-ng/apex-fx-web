import React from "react";
import Link from "next/link";
import {
  UserGroupIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

export function SuperAdminCriticalActions() {
  const actions = [
    {
      type: "link",
      href: "/admin/super-dash/admins",
      icon: <UserGroupIcon className="h-5 w-5 text-blue-300 mr-3" />,
      title: "Manage Admins",
      description: "Add/remove admin access",
    },
    {
      type: "link",
      href: "/admin/super-dash/courses",
      icon: <DocumentTextIcon className="h-5 w-5 text-green-300 mr-3" />,
      title: "Manage Courses",
      description: "Add/edit/remove courses",
    },
    {
      type: "link",
      href: "/admin/super-dash/signals",
      icon: <ArrowPathIcon className="h-5 w-5 text-purple-300 mr-3" />,
      title: "Broadcast Signals",
      description: "Send trading signals",
    },
    {
      type: "link",
      href: "/admin/super-dash/settings",
      icon: <Cog6ToothIcon className="h-5 w-5 text-red-300 mr-3" />,
      title: "System Settings",
      description: "Configure global settings",
    },
    {
      type: "link",
      href: "/admin/super-dash/logs",
      icon: <DocumentTextIcon className="h-5 w-5 text-yellow-300 mr-3" />,
      title: "System Logs",
      description: "View all system activity",
    },
    {
      type: "button",
      icon: <ArrowPathIcon className="h-5 w-5 text-green-300 mr-3" />,
      title: "System Backup",
      description: "Create full system backup",
      onClick: () => {
        // TODO: Implement backup logic
        alert("System backup initiated!");
      },
    },
  ];

  // Ref for scrollable container
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const scrollAmount = 240;
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#2a0f1a]/50 backdrop-blur-md rounded-lg border border-red-900 p-6 mb-8">
      <h2 className="text-lg font-bold text-red-200 mb-4 flex items-center gap-2">
        <ExclamationTriangleIcon
          className="h-5 w-5 text-yellow-300"
          aria-hidden="true"
        />
        Critical System Actions
      </h2>
      <div className="relative">
        <button
          type="button"
          aria-label="Scroll left"
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#170a0e]/80 border border-red-900 rounded-full p-2 hover:bg-red-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          style={{ display: "block" }}
        >
          <ChevronLeftIcon className="h-6 w-6 text-red-200" />
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 pb-2 hide-scrollbar"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollBehavior: "smooth",
          }}
        >
          {/* Hide scrollbar visually */}
          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
          `}</style>
          {actions.map((action) =>
            action.type === "link" ? (
              <Link
                key={action.title}
                href={action.href as string}
                className="flex-shrink-0 min-w-[220px] flex items-center p-4 bg-[#170a0e]/60 border border-red-900 rounded-lg hover:bg-red-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                {action.icon}
                <div>
                  <p className="text-sm font-medium text-red-200">
                    {action.title}
                  </p>
                  <p className="text-xs text-red-300">{action.description}</p>
                </div>
              </Link>
            ) : (
              <button
                key={action.title}
                onClick={action.onClick}
                className="flex-shrink-0 min-w-[220px] flex items-center p-4 bg-[#170a0e]/60 border border-red-900 rounded-lg hover:bg-red-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                {action.icon}
                <div>
                  <p className="text-sm font-medium text-red-200">
                    {action.title}
                  </p>
                  <p className="text-xs text-red-300">{action.description}</p>
                </div>
              </button>
            )
          )}
        </div>
        <button
          type="button"
          aria-label="Scroll right"
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#170a0e]/80 border border-red-900 rounded-full p-2 hover:bg-red-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          style={{ display: "block" }}
        >
          <ChevronRightIcon className="h-6 w-6 text-red-200" />
        </button>
      </div>
    </div>
  );
}
