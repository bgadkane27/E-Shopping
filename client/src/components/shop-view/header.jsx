import { Menu, Store } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

function ShopHeader() {

    const {isAuthenticated} = useSelector((state) => state.auth)
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <NavLink to="/shop/home" className="flex items-center gap-2">
          <Store className="h-6 w-6" />
          <span className="text-xl font-bold">Bruno</span>
        </NavLink>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <SheetTitle className="text-md font-semibold text-foreground">Menu</SheetTitle>

          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden lg:block">

      </div>
      {
        isAuthenticated ? <div></div> : null
      }
    </header>
  );
}

export default ShopHeader;
