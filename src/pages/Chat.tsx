import { useState, useRef, useEffect } from "react";
import { Send, Heart, Smile, Camera, Mic, ArrowLeft, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FloatingHearts } from "@/components/FloatingHearts";

interface Message {
  id: string;
  text: string;
  sent: boolean;
  time: string;
  type: 'text' | 'image' | 'voice';
}

export const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Good morning my love! ☀️", sent: false, time: "9:30 AM", type: 'text' },
    { id: '2', text: "Good morning cutie! 💕 How did you sleep?", sent: true, time: "9:32 AM", type: 'text' },
    { id: '3', text: "Like a baby! Dreamed about you 😊", sent: false, time: "9:35 AM", type: 'text' },
    { id: '4', text: "Aww that's so sweet! Can't wait to see you tonight ✨", sent: true, time: "9:37 AM", type: 'text' },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sent: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage("");
      
      // Simulate partner typing
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const responses = [
          "I love you too! 💕",
          "You're the best! 🥰", 
          "Missing you so much! 💖",
          "Can't wait to hug you! 🤗"
        ];
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: responses[Math.floor(Math.random() * responses.length)],
          sent: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text'
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const reactions = ["❤️", "😘", "🥰", "😍", "💕", "✨"];

  return (
    <div className="min-h-screen bg-soft-gradient relative flex flex-col">
      <FloatingHearts />
      
      {/* Header */}
      <div className="card-romantic mx-4 mt-4 flex items-center justify-between py-4 relative z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-full"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-lavender flex items-center justify-center">
              <Heart className="text-white" size={16} fill="currentColor" />
            </div>
            <div>
              <h2 className="font-semibold">Alex</h2>
              <p className="text-sm text-muted-foreground">
                {isTyping ? "typing..." : "online"}
              </p>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVertical size={20} />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto relative z-10">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sent ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div className={`max-w-xs ${message.sent ? 'chat-bubble-sent' : 'chat-bubble-received'}`}>
              <p>{message.text}</p>
              <p className={`text-xs mt-1 opacity-70 ${message.sent ? 'text-right' : 'text-left'}`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="chat-bubble-received">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reactions */}
      <div className="px-4 py-2 relative z-10">
        <div className="flex gap-2 justify-center mb-2">
          {reactions.map((emoji, index) => (
            <button
              key={index}
              onClick={() => {
                const message: Message = {
                  id: Date.now().toString(),
                  text: emoji,
                  sent: true,
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  type: 'text'
                };
                setMessages([...messages, message]);
              }}
              className="w-10 h-10 rounded-full bg-card hover:bg-accent transition-all duration-300 hover:scale-110 flex items-center justify-center text-lg shadow-soft"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 relative z-10">
        <div className="card-romantic flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
            <Camera size={20} />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a sweet message..."
              className="rounded-full border-0 bg-muted focus:ring-primary pr-10"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full text-muted-foreground hover:text-foreground"
            >
              <Smile size={18} />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
            <Mic size={20} />
          </Button>
          <Button 
            onClick={handleSendMessage}
            className="btn-romantic rounded-full w-10 h-10 p-0"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};