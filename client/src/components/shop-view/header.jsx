import { LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { headermenuItems } from "@/config";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function ShopHeader() {
  function MenuItems() {
    return (
      <nav className="flex flex-col gap-2 lg:flex-row lg:space-x-6 lg:items-center">
        {headermenuItems.map((item) => (
          <NavLink
            to={item.path}
            className="flex items-center gap-2 text-sm font-semibold leading-6 text-muted-foreground hover:text-foreground"
            key={item.id}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    );
  }

  function RightMenuItems() {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handleLogoutUser() {
      dispatch(logoutUser());
    }
    return (
      <div className="flex flex-col lg:flex-row lg:items-center gap-2">
        <Button variant="outline" size="icon" className="mr-2">
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">Cart</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar className="bg-black">
                <AvatarFallback className="bg-black text-white font-extrabold">
                  {user?.email?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            className="w-56 mt-2 mr-1 py-2 text-muted-foreground bg-gray-300 rounded-xl"
          >
            <DropdownMenuLabel>Email: {user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/shop/account")}>
              <UserCog className="ml-1 w-4 h-4" />
              Manage your Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogoutUser}>
              <LogOut className="ml-1 w-4 h-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <NavLink to="/shop/home" className="flex items-center gap-2">
          {/* <Store className="h-6 w-6" /> */}
          <span className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-700 bg-clip-text text-transparent">
            Bruno
          </span>
        </NavLink>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <SheetTitle className="text-md font-semibold mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-blue-700 bg-clip-text text-transparent">
                Menu
              </span>
            </SheetTitle>
            <MenuItems />
            {/* <RightMenuItems /> */}
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <RightMenuItems />
        </div>
      </div>
    </header>
  );
}

export default ShopHeader;
