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
    if (!message.trim() || !sellerId || !robotId || !user) return;
    
    setIsSending(true);
    try {
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

        if (createError) throw createError;
        conversationId = newConvo.id;
      } else {
        conversationId = existingConvo.id;
      }

      // Send message
      const { error: messageError } = await supabase
        .from('conversation_messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: message
        });

      if (messageError) throw messageError;

      toast({
        title: "Message sent",
        description: "Your message has been sent to the seller.",
      });
      
      setMessage("");
      setIsMessageVisible(false);
      navigate('/messages');
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description: error.message,
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
                  disabled={!message.trim() || isSending}
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
