
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ContactSeller() {
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  return (
    <div>
      {isMessageVisible ? (
        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Contact Seller</h3>
            <p className="text-sm text-muted-foreground mb-3">
              You must be logged in to contact the seller.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link to="/login" className="flex-1">
                <Button className="w-full">Log In</Button>
              </Link>
              <Link to="/register" className="flex-1">
                <Button variant="outline" className="w-full">Sign Up</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button 
          className="w-full mb-4"
          onClick={() => setIsMessageVisible(true)}
        >
          Contact Seller
        </Button>
      )}
    </div>
  );
}
