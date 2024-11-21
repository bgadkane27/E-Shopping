import {
  CircleUserRound,
  Layers3,
  LayoutList,
  ShoppingBasket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutList />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Layers3 />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingBasket />,
  },
];

function MenuItem({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-4 flex flex-col gap-2">
      {adminSidebarMenuItems.map((item) => (
        <div
          className="flex items-center cursor-pointer gap-3 py-2 hover:font-semibold hover:bg-muted-foreground rounded-md px-3"
          key={item.id}
          onClick={() => {
            navigate(item.path);
            setOpen ? setOpen(false) : null;
          }}
        >
          {item.icon}
          <span className="text-md font-normal">{item.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="mt-10">
              <SheetTitle className="flex items-center gap-2 px-3">
                <CircleUserRound size={30} />
                <p className="text-xl font-extrabold">Admin Panel</p>
              </SheetTitle>
            </SheetHeader>
            <MenuItem setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-60 border-r bg-background flex-col py-4 px-4 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center cursor-pointer gap-2 mb-5 px-3"
        >
          <CircleUserRound size={30} />
          <p className="text-xl font-extrabold">Admin Panel</p>
        </div>
        <MenuItem />
      </aside>
    </>
  );
}

export default AdminSidebar;
