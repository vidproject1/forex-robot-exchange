
import { Link } from "react-router-dom";

interface DesktopNavProps {
  isSeller: boolean;
}

export function DesktopNav({ isSeller }: DesktopNavProps) {
  return (
    <nav className="flex gap-6">
      <Link to="/" className="flex items-center text-lg font-medium transition-colors hover:text-primary">
        Home
      </Link>
      <Link to="/marketplace" className="flex items-center text-lg font-medium transition-colors hover:text-primary">
        Marketplace
      </Link>
      {isSeller && (
        <Link to="/seller-dashboard" className="flex items-center text-lg font-medium transition-colors hover:text-primary">
          My Listings
        </Link>
      )}
      <Link to="/about" className="flex items-center text-lg font-medium transition-colors hover:text-primary">
        About
      </Link>
    </nav>
  );
}
