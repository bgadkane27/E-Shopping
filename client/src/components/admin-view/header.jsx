import { LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { toast } from "@/hooks/use-toast";

function AdminHeader({setOpen}) {

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser())
    .then(()=>{
      toast({
        variant: "success",
        title: "Logged Out Successfully!",
        duration: 2000
      })
    })
  }

  return (
    <header className="flex items-center justify-between px-4">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <Menu />
      </Button>
      <div className="flex flex-1 justify-end px-4 py-2 font-light">
        <Button onClick={handleLogout}>
          <LogOut />
          <span className="px-0.5">Logout</span>
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
