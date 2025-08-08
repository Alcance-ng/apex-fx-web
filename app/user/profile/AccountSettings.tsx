import { AccountSettingRow } from "./AccountSettingRow";

export default function AccountSettings() {
  return (
    <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl shadow border border-white/10">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-medium text-white">Account Settings</h2>
        <p className="text-sm text-lime-200">
          Manage your account security and preferences.
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <AccountSettingRow
            title="Email Notifications"
            description="Receive email updates about your account"
            control={
              <input type="checkbox" className="h-4 w-4 accent-lime-500" />
            }
          />
          <AccountSettingRow
            title="Trading Signals Alerts"
            description="Get notified when new signals are available"
            control={
              <input
                type="checkbox"
                className="h-4 w-4 accent-lime-500"
                defaultChecked
              />
            }
          />
          <AccountSettingRow
            title="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
            control={
              <button className="text-lime-300 text-sm hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded px-2 py-1">
                Enable
              </button>
            }
          />
          <AccountSettingRow
            title="Delete Account"
            description="Permanently delete your account and all associated data"
            control={
              <button className="text-red-400 text-sm hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded px-2 py-1">
                Delete Account
              </button>
            }
            borderTop
            danger
          />
        </div>
      </div>
    </div>
  );
}
