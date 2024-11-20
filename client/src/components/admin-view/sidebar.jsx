import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminSidebar() {
    const navigate = useNavigate();
    
  return (
    <>
      <aside className="hidden w-60 border-r bg-background flex-col items-center py-4 lg:flex">
        <div onClick ={() => navigate("/admin/dashboard")} className="flex items-center cursor-pointer gap-2">
          <CircleUserRound />
          <p className="text-md font-bold">Admin Panel</p>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;


