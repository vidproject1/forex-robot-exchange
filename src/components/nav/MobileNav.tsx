
import { MobileMenu } from "./MobileMenu";

interface MobileNavProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isSeller: boolean;
}

export function MobileNav({ isMenuOpen, setIsMenuOpen, isSeller }: MobileNavProps) {
  return (
    <MobileMenu
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      isSeller={isSeller}
    />
  );
}
