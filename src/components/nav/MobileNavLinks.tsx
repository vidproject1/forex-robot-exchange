
import { Link } from "react-router-dom";

interface MobileNavLinksProps {
  isSeller: boolean;
  onItemClick: () => void;
}

export function MobileNavLinks({ isSeller, onItemClick }: MobileNavLinksProps) {
  return (
    <nav className="grid grid-flow-row auto-rows-max text-center">
      <Link
        to="/"
        className="py-2 text-lg font-medium hover:text-primary"
        onClick={onItemClick}
      >
        Home
      </Link>
      <Link
        to="/marketplace"
        className="py-2 text-lg font-medium hover:text-primary"
        onClick={onItemClick}
      >
        Marketplace
      </Link>
      {isSeller && (
        <Link
          to="/seller-dashboard"
          className="py-2 text-lg font-medium hover:text-primary"
          onClick={onItemClick}
        >
          My Listings
        </Link>
      )}
      <Link
        to="/about"
        className="py-2 text-lg font-medium hover:text-primary"
        onClick={onItemClick}
      >
        About
      </Link>
    </nav>
  );
}
