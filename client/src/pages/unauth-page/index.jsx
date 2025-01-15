import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

function UnauthPage() {
  return (
    <div className="flex items-center flex-col justify-center w-full h-screen">
      <img src="/unauth.webp" alt="Unauthorized" className="w-40"/>
      <p className="text-4xl font-bold text-orange-600 py-2">
        No Authorization Found.
      </p>
      <p className="text-md font-medium py-1">
        This page is not publically available.
      </p>
      <p className="text-md font-medium">
        To access the admin page, you need admin level access.
      </p>
      <Button className="mt-4">
        <NavLink className="text-white hover:text-muted" to="/">RETURN HOME</NavLink>
      </Button>
    </div>
  );
}

export default UnauthPage;
