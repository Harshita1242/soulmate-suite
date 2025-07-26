import { Heart, MessageCircle, Camera, Phone, BookOpen, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CoupleAvatar } from "@/components/CoupleAvatar";
import { MoodSelector } from "@/components/MoodSelector";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Button } from "@/components/ui/button";

export const Dashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    { icon: MessageCircle, label: "Chat", color: "text-primary", route: "/chat" },
    { icon: Camera, label: "Gallery", color: "text-secondary", route: "/gallery" },
    { icon: Phone, label: "Call", color: "text-lavender", route: "/call" },
    { icon: BookOpen, label: "Memories", color: "text-peach", route: "/memories" },
  ];

  return (
    <div className="min-h-screen bg-soft-gradient relative overflow-hidden">
      <FloatingHearts />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-pacifico text-2xl text-romantic">Hey Love, Welcome Back 💕</h1>
            <p className="text-muted-foreground">Hope you're having a beautiful day!</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
            className="rounded-full hover:bg-accent"
          >
            <Settings size={20} />
          </Button>
        </div>

        {/* Couple Profile Section */}
        <div className="card-dreamy mb-8 text-center animate-fade-in">
          <CoupleAvatar size="lg" showNames={true} partner1Name="Sarah" partner2Name="Alex" />
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">247</p>
              <p className="text-sm text-muted-foreground">Days Together</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">1,432</p>
              <p className="text-sm text-muted-foreground">Messages Sent</p>
            </div>
          </div>
        </div>

        {/* Mood Update */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <MoodSelector />
        </div>

        {/* Quick Actions */}
        <div className="card-romantic mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h3 className="font-pacifico text-lg text-romantic mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.route)}
                  className="p-4 rounded-2xl bg-muted hover:bg-accent transition-all duration-300 hover:scale-105 group"
                >
                  <Icon className={`mx-auto mb-2 ${action.color} group-hover:scale-110 transition-transform`} size={24} />
                  <p className="text-sm font-medium">{action.label}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-romantic animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <h3 className="font-pacifico text-lg text-romantic mb-4">Recent Moments</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <p className="text-sm">Alex sent you a photo</p>
              <span className="text-xs text-muted-foreground ml-auto">2m ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <p className="text-sm">You added a new memory</p>
              <span className="text-xs text-muted-foreground ml-auto">1h ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <div className="w-2 h-2 bg-lavender rounded-full animate-pulse"></div>
              <p className="text-sm">Video call lasted 45 minutes</p>
              <span className="text-xs text-muted-foreground ml-auto">3h ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};