
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  return (
    <>
      <Link to="/login">
        <Button variant="outline">Log in</Button>
      </Link>
      <Link to="/register">
        <Button>Sign up</Button>
      </Link>
    </>
  );
}
