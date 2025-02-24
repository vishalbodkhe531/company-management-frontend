import ActivityLogs from "@/components/admin/admin-management/activity-logs/ActivityLogs";
import AdminInfo from "@/components/admin/admin-management/admin-info/AdminInfo";
import AdminProfile from "@/components/admin/admin-management/profile/AdminProfile";
import Setting from "@/components/admin/admin-management/setting/Setting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

function AdminDashboard() {
  return (
    <motion.div
      className=""
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 40, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="min-h-screen  p-4 flex flex-col md:flex-row gap-4">
        {/* Profile Card */}

        <AdminProfile />

        {/* Details Section */}
        <div className=" p-6  rounded-lg shadow-lg w-full md:w-2/3">
          <Tabs defaultValue="admin" className="rounded-lg shadow-lg p-4">
            <TabsList className="flex space-x-4 mb-4 rounded-lg">
              <TabsTrigger
                value="admin"
                className="px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Admin Information
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Settings
              </TabsTrigger>
              <TabsTrigger
                value="logs"
                className="px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Activity Logs
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="admin">
              <AdminInfo />
              {/* Edit Button */}
            </TabsContent>
            <TabsContent value="settings">
              <Setting />
            </TabsContent>
            <TabsContent value="logs">
              <ActivityLogs />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
  );
}

export default AdminDashboard;
