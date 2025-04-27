
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function MessageButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => navigate("/messages")}
      className="relative"
      title="Messages"
    >
      <MessageSquare className="h-5 w-5" />
    </Button>
  );
}
