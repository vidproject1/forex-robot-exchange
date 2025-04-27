
import { useAuth } from "@/lib/AuthContext";
import { AuthButtons } from "./AuthButtons";
import { UserDropdown } from "./UserDropdown";

interface UserMenuProps {
  isSeller: boolean;
}

export function UserMenu({ isSeller }: UserMenuProps) {
  const { user } = useAuth();
  
  if (!user) {
    return <AuthButtons />;
  }

  return <UserDropdown isSeller={isSeller} />;
}
