import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminSidebar() {

    const navigate = useNavigate();
  return (
    <>
      <aside className="hidden flex-col items-center px-3 py-3 lg:flex">
        <div onClick ={() => navigate("/admin/dashboard")} className="flex items-center justify-center cursor-pointer gap-2">
          <CircleUserRound />
          <p className="text-md font-bold">Admin Panel</p>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
