
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { MobileNavLinks } from "./MobileNavLinks";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isSeller: boolean;
}

export function MobileMenu({ isMenuOpen, setIsMenuOpen, isSeller }: MobileMenuProps) {
  const { user, signOut } = useAuth();
  
  const handleLogout = async () => {
    await signOut();
  };

  const handleItemClick = () => setIsMenuOpen(false);

  return (
    <>
      <Button
        variant="ghost"
        className="ml-2 px-0 text-base hover:bg-transparent focus:bg-transparent"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="sr-only">Toggle Menu</span>
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 animate-fade-in bg-background border-t">
          <MobileNavLinks isSeller={isSeller} onItemClick={handleItemClick} />
          
          {user ? (
            <>
              {isSeller && (
                <Link
                  to="/seller-dashboard"
                  className="py-2 text-lg font-medium hover:text-primary"
                  onClick={handleItemClick}
                >
                  Dashboard
                </Link>
              )}
              <Link
                to="/settings"
                className="py-2 text-lg font-medium hover:text-primary"
                onClick={handleItemClick}
              >
                Settings
              </Link>
              <button
                className="py-2 text-lg font-medium hover:text-primary w-full text-center"
                onClick={() => {
                  handleItemClick();
                  handleLogout();
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="py-2 text-lg font-medium hover:text-primary"
                onClick={handleItemClick}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="py-2 text-lg font-medium hover:text-primary"
                onClick={handleItemClick}
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      )}
    </>
  );
}
