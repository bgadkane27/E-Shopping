import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="flex min-h-screen min-w-full">
      <div className="hidden lg:flex justify-center items-center w-1/2 px-12">
        <div className="max-w-full space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extralight tracking-tight">Welcome to E Shopping</h1>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center w-1/2  px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;