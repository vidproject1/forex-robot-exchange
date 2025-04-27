
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SellerProfileProps {
  username?: string;
  createdAt?: string;
}

export function SellerProfile({ username, createdAt }: SellerProfileProps) {
  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>{username?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{username}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Member since {new Date(createdAt || "").toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
