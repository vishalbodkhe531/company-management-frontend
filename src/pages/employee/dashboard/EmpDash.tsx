import Finances from "@/components/employee/emp-management/Finances";
import Notifications from "@/components/employee/emp-management/Notifications";
import Performance from "@/components/employee/emp-management/Performance";
import Profile from "@/components/employee/emp-management/Profile";
import Tasks from "@/components/employee/emp-management/Tasks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Navigate } from "react-router-dom";

const EmpDash = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for large screens */}
      <aside className="hidden md:block w-72 bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <nav className="space-y-4">
          {[
            "Home",
            "Profile",
            "Tasks",
            "Performance",
            "Notifications",
            "Finances",
          ].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              className="w-full text-left"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </nav>
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden p-4">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-blue-600 text-white w-64">
          <div className="p-6">
            <h1 className="text-2xl font-bold">Employee Dashboard</h1>
          </div>
          <nav className="mt-8">
            {["Profile", "Performance", "Setting"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">Welcome, {"employee.name"}!</h2>
            <p className="text-gray-600">{"employee.role"}</p>
          </div>
        </header>

        {/* Content */}
        <motion.div
          className="max-w-full mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card className="border-2 w-[100%]">
            <CardHeader>
              <Tabs defaultValue="Profile">
                <TabsList className="flex space-x-4">
                  {[
                    "Profile",
                    "Tasks",
                    "Notifications",
                    "Payroll and Finances",
                  ].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="mt-4">
              {activeTab === "Home" && <Navigate to={"/"} />}
              {activeTab === "Profile" && <Profile />}
              {activeTab === "Tasks" && <Tasks />}
              {activeTab === "Performance" && <Performance />}
              {activeTab === "Notifications" && <Notifications />}
              {activeTab === "Payroll and Finances" && <Finances />}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default EmpDash;
