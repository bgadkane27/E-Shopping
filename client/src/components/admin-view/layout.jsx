import { Outlet } from "react-router-dom";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";

function AdminLayout() {
  return (
    <div className="flex w-full min-h-screen overflow-hidden">
      {/* { common sidebar } */}
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        {/* {commom header } */}        
        <AdminHeader />
        <main className="flex flex-1 bg-muted/20 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
