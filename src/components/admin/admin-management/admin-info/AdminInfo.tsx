import { TabsContent } from "@/components/ui/tabs";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

function AdminInfo() {
  const { admin } = useSelector((state: RootState) => state.adminReducers);
  console.log(admin);

  return (
    <TabsContent
      value="admin"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 p-4"
    >
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 capitalize">
          Name
        </label>
        <div className="w-full mt-1 px-4 py-2 shadow-md border border-gray-300 rounded bg-white text-gray-900">
          {admin?.name}
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 capitalize">
          Email
        </label>
        <div className="w-full mt-1 px-4 py-2 shadow-md border border-gray-300 rounded bg-white text-gray-900">
          {admin?.email}
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 capitalize">
          Gender
        </label>
        <div className="w-full mt-1 px-4 py-2 shadow-md border border-gray-300 rounded bg-white text-gray-900">
          {admin?.gender}
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 capitalize">
          Role
        </label>
        <div className="w-full mt-1 px-4 py-2 shadow-md border border-gray-300 rounded bg-white text-gray-900">
          {admin?.role}
        </div>
      </div>
    </TabsContent>
  );
}

export default AdminInfo;
