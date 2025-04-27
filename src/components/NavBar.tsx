
import { useState } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/lib/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MessageButton } from "@/components/MessageButton";
import { MobileNav } from "@/components/nav/MobileNav";
import { DesktopNav } from "@/components/nav/DesktopNav";
import { UserMenu } from "@/components/nav/UserMenu";

export function NavBar() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, accountType } = useAuth();
  
  const isSeller = accountType === "seller";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex gap-6 md:gap-10 justify-between w-full items-center">
          <Link to="/" className="hidden items-center space-x-2 md:flex">
            <span className="hidden font-bold sm:inline-block text-xl">ForexRobotX</span>
          </Link>
          
          {!isMobile && <DesktopNav isSeller={isSeller} />}
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {user && <MessageButton />}
            
            {!isMobile ? (
              <div className="flex items-center gap-2">
                <UserMenu isSeller={isSeller} />
              </div>
            ) : (
              <MobileNav 
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                isSeller={isSeller}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
