import { LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";

function AdminHeader() {
  return (
    <header className="flex items-center justify-between">
      <Button className="lg:hidden sm:block">
        <Menu />
      </Button>
      <div className="flex flex-1 justify-end px-4 py-3 font-light">
        <Button>
          <LogOut />
          <span className="px-0.5">Logout</span>
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
