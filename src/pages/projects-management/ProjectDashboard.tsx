import ProjectList from "@/components/project/ProjectList";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectTabs from "@/components/project/ProjectTabs";
import Reports from "@/components/project/Reports";
import Setting from "@/components/project/Setting";
import Team from "@/components/project/Team";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const ProjectDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="flex h-screen bg-black text-mainHeading">
      {/* Sidebar for Large Screens */}
      <aside className="hidden lg:block w-[23rem] bg-gray-900 p-4">
        <h1 className="text-2xl font-bold text-heading mb-6">
          Project Management
        </h1>
        <nav className="space-y-4">
          <ProjectTabs
            setTab={setSelectedTab}
            currentTab={selectedTab}
            key={selectedTab}
          />
        </nav>
      </aside>

      {/* Sidebar for Small Screens */}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden px-4 py-2 bg-gray-800 rounded m-4">
            Open Menu
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-gray-900 p-4">
          <h1 className="text-2xl font-bold text-heading mb-6">
            Project Management
          </h1>
          <nav className="space-y-4">
            <ProjectTabs
              setTab={setSelectedTab}
              currentTab={selectedTab}
              key={selectedTab}
            />
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
          </h2>
        </header>

        {/* Tab Content */}
        <div className="space-y-6">
          {selectedTab === "overview" && <ProjectOverview />}
          {selectedTab === "all-projects" && <ProjectList />}
          {selectedTab === "team" && <Team />}
          {selectedTab === "reports" && <Reports />}
          {selectedTab === "setting" && <Setting />}
        </div>
      </main>
    </div>
  );
};

export default ProjectDashboard;