
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function ContactSeller({ sellerId, robotId }: { sellerId?: string; robotId?: string }) {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    // Log values to help with debugging
    console.log("Message content:", message);
    console.log("Message trimmed length:", message.trim().length);
    console.log("Seller ID:", sellerId);
    console.log("Robot ID:", robotId);
    console.log("Current user:", user);
    
    if (!message.trim()) {
      toast({
        title: "Error sending message",
        description: "Please enter a message to send.",
        variant: "destructive",
      });
      return;
    }
    
    // Check for valid string values, not just existence
    if (!sellerId || typeof sellerId !== 'string' || !robotId || typeof robotId !== 'string' || !user) {
      toast({
        title: "Error sending message",
        description: "Missing required information to send message.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    try {
      console.log("Sending message with data:", { sellerId, robotId, userId: user.id, message });
      
      // First, create or find existing conversation
      const { data: existingConvo, error: convoError } = await supabase
        .from('conversations')
        .select('id')
        .eq('buyer_id', user.id)
        .eq('seller_id', sellerId)
        .eq('robot_id', robotId)
        .single();

      let conversationId;
      
      if (convoError) {
        console.log("No existing conversation found, creating new one");
        // Create new conversation
        const { data: newConvo, error: createError } = await supabase
          .from('conversations')
          .insert({
            buyer_id: user.id,
            seller_id: sellerId,
            robot_id: robotId
          })
          .select()
          .single();

        if (createError) {
          console.error("Error creating conversation:", createError);
          throw createError;
        }
        console.log("New conversation created:", newConvo);
        conversationId = newConvo.id;
      } else {
        console.log("Found existing conversation:", existingConvo);
        conversationId = existingConvo.id;
      }

      // Send message
      const { data: messageData, error: messageError } = await supabase
        .from('conversation_messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: message
        })
        .select();

      if (messageError) {
        console.error("Error sending message:", messageError);
        throw messageError;
      }
      
      console.log("Message sent successfully:", messageData);

      toast({
        title: "Message sent",
        description: "Your message has been sent to the seller.",
      });
      
      setMessage("");
      setIsMessageVisible(false);
      navigate('/messages');
    } catch (error: any) {
      console.error("Error in send message process:", error);
      toast({
        title: "Error sending message",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
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
                disabled={isSending}
              />
              <div className="flex flex-row gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setIsMessageVisible(false)}
                  disabled={isSending}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Send Message"}
                </Button>
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
