
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function ContactSeller({ sellerId }: { sellerId?: string }) {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Here you would implement the actual message sending logic
    // For now, we'll just show a success toast
    toast({
      title: "Message sent",
      description: "Your message has been sent to the seller.",
    });
    
    setMessage("");
    setIsMessageVisible(false);
  };

  const showMessageForm = () => {
    setIsMessageVisible(true);
  };

  // If the user is logged in, show the message form or send button
  if (user) {
    return (
      <div>
        {isMessageVisible ? (
          <Card className="mb-4">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Contact Seller</h3>
              <Textarea
                placeholder="Write your message to the seller..."
                className="mb-3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
              <div className="flex flex-row gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsMessageVisible(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendMessage}>Send Message</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Button className="w-full mb-4" onClick={showMessageForm}>
            Contact Seller
          </Button>
        )}
      </div>
    );
  }

  // If the user is not logged in, show login/signup options
  return (
    <div>
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
    </div>
  );
}
