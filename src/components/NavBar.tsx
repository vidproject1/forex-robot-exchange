
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";

export function NavBar() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex gap-6 md:gap-10 justify-between w-full items-center">
          <Link to="/" className="hidden items-center space-x-2 md:flex">
            <span className="hidden font-bold sm:inline-block text-xl">ForexRobotX</span>
          </Link>
          
          {!isMobile && (
            <nav className="flex gap-6">
              <Link to="/" className="flex items-center text-lg font-medium transition-colors hover:text-primary">
                Home
              </Link>
              <Link to="/marketplace" className="flex items-center text-lg font-medium transition-colors hover:text-primary">
                Marketplace
              </Link>
              <Link to="/about" className="flex items-center text-lg font-medium transition-colors hover:text-primary">
                About
              </Link>
            </nav>
          )}
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {!isMobile ? (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign up</Button>
                </Link>
              </div>
            ) : (
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
                    <nav className="grid grid-flow-row auto-rows-max text-center">
                      <Link
                        to="/"
                        className="py-2 text-lg font-medium hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Home
                      </Link>
                      <Link
                        to="/marketplace"
                        className="py-2 text-lg font-medium hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Marketplace
                      </Link>
                      <Link
                        to="/about"
                        className="py-2 text-lg font-medium hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        About
                      </Link>
                      <Link
                        to="/login"
                        className="py-2 text-lg font-medium hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Log in
                      </Link>
                      <Link
                        to="/register"
                        className="py-2 text-lg font-medium hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign up
                      </Link>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
