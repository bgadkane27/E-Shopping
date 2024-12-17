import { Outlet } from "react-router-dom";
import ShopHeader from "./header";

function ShopLayout() {
  return (
    <div className="flex w-full min-h-screen overflow-hidden">
      <div className="flex flex-1 flex-col">       
        <ShopHeader />
        <main className="flex flex-col bg-muted/20 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ShopLayout;