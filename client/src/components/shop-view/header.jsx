import { LogOut, Menu, Search, ShoppingCart, UserCog } from "lucide-react";
import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
import Cartwrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/Cart-slice";
import { Label } from "../ui/label";

function ShopHeader() {
  function MenuItems() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    function handleNavigate(getCurrentItem) {
      sessionStorage.removeItem("filters");
      const currentFilter =
        getCurrentItem.id !== 'home' && getCurrentItem.id !== 'products'
          ? {
            category: [getCurrentItem.id]
          }
          : null
      sessionStorage.setItem("filters", JSON.stringify(currentFilter));
      location.pathname.includes('/listing') && currentFilter !== null
        ?
        setSearchParams(new URLSearchParams(`?category=${getCurrentItem.id}`))
        :
        navigate(getCurrentItem.path);
    }

    return (
      <nav className="flex flex-col gap-2 lg:flex-row lg:space-x-6 lg:items-center">
        {headermenuItems.map((item) => (
          <Label onClick={() => handleNavigate(item)}
            className="flex items-center gap-2 text-sm font-semibold leading-6 text-muted-foreground hover:text-foreground cursor-pointer"
            key={item.id}
          >
            {item.label}
          </Label>
        ))}
      </nav>
    );
  }

  function RightMenuItems() {
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handleLogoutUser() {
      dispatch(logoutUser());
    }

    useEffect(() => {
      dispatch(fetchCartItems(user?.id));
    }, [dispatch]);

    return (
      <div className="flex flex-col lg:flex-row lg:items-center gap-2">
        <Button variant="outline" size="icon" className="mr-2 cursor-pointer" onClick={() => navigate("/shop/search")}>
          <Search className="w-6 h-6" />
        </Button>
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
          <Button onClick={() => setOpenCartSheet(true)} variant="outline" size="icon" className="mr-2 relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 right-0 text-xl font-bold text-blue-600">{cartItems?.items?.length || ''}</span>
            <span className="sr-only">Cart</span>
          </Button>
          <Cartwrapper setOpenCartSheet={setOpenCartSheet}
            cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []} />
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="text-black font-extrabold">
                  {user?.email?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            className="w-56 mt-2 mr-8 py-2 text-muted-foreground rounded-xl"
          >
            <DropdownMenuLabel>Email: {user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/shop/account")}>
              <UserCog className="ml-1 w-4 h-4" />
              My Account
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
