import {
  ServerStackIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

interface AlertItem {
  icon: React.ReactNode;
  bg: string;
  border: string;
  title: string;
  description: string;
  button: string;
  buttonColor: string;
}

function SystemAlert({
  icon,
  bg,
  border,
  title,
  description,
  button,
  buttonColor,
}: AlertItem) {
  return (
    <div className={`flex items-center p-3 ${bg} border ${border} rounded-lg`}>
      {icon}
      <div className="flex-1 ml-3">
        <p className="text-sm font-medium text-red-100">{title}</p>
        <p className="text-xs text-red-300">{description}</p>
      </div>
      <button
        className={`${buttonColor} text-sm hover:text-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded px-2 py-1`}
      >
        {button}
      </button>
    </div>
  );
}

export function SuperAdminSystemAlerts() {
  const alerts: AlertItem[] = [
    {
      icon: <ExclamationCircleIcon className="h-5 w-5 text-red-400 mr-3" />,
      bg: "bg-red-900/30",
      border: "border-red-900",
      title: "High memory usage detected on Server 2",
      description: "Memory usage: 89% - Consider scaling up",
      button: "Investigate",
      buttonColor: "text-red-300",
    },
    {
      icon: (
        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mr-3" />
      ),
      bg: "bg-yellow-900/30",
      border: "border-yellow-900",
      title: "SSL certificate expires in 30 days",
      description: "Domain: api.apex-fx.com",
      button: "Renew",
      buttonColor: "text-yellow-300",
    },
    {
      icon: <InformationCircleIcon className="h-5 w-5 text-blue-400 mr-3" />,
      bg: "bg-blue-900/30",
      border: "border-blue-900",
      title: "System backup completed successfully",
      description: "Last backup: 2 hours ago",
      button: "View",
      buttonColor: "text-blue-300",
    },
  ];

  return (
    <div className="mt-8 bg-[#2a0f1a]/70 backdrop-blur-md rounded-lg border border-red-900 shadow">
      <div className="px-6 py-4 border-b border-red-900/60">
        <h2 className="text-lg font-bold text-red-200 flex items-center gap-2">
          <ServerStackIcon
            className="h-5 w-5 text-red-300"
            aria-hidden="true"
          />
          System Alerts
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {alerts.map((alert, idx) => (
            <SystemAlert key={idx} {...alert} />
          ))}
        </div>
      </div>
    </div>
  );
}
