import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex items-center flex-col justify-center w-full h-screen">
      <p className="text-9xl font-extrabold text-red-600 tracking-widest">404</p>
      <p className="text-4xl font-bold text-orange-600 py-2">
        PAGE NOT FOUND.
      </p>
      <p className="text-md font-medium py-1">
        The requested URL was not found on this server.
      </p>
      <Button className="mt-4">
        <NavLink className="text-white hover:text-muted" to="/">
          RETURN HOME
        </NavLink>
      </Button>
    </div>
  );
}

export default NotFound;
