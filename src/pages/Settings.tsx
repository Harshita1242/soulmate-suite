import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, LogOut, Trash2, Palette, Moon, Sun, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [theme, setTheme] = useState("cute");
  const [notifications, setNotifications] = useState(true);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    toast({
      title: "Theme Updated! 💕",
      description: `Switched to ${newTheme} theme`,
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    toast({
      title: "See you soon, love! 💔",
      description: "You've been logged out",
    });
    navigate("/");
  };

  const handleDeleteChats = () => {
    localStorage.removeItem('chatMessages');
    toast({
      title: "Chat history cleared 🧹",
      description: "All your conversations have been deleted",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-romantic-pink via-romantic-lavender to-romantic-blue p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="text-romantic-text hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-romantic-accent animate-pulse" />
            <h1 className="text-2xl font-bold text-romantic-text">Settings</h1>
          </div>
        </div>

        <div className="space-y-6">
          {/* Theme Settings */}
          <Card className="bg-white/80 backdrop-blur-sm border-romantic-border shadow-romantic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-romantic-text">
                <Palette className="h-5 w-5" />
                Theme Preferences
              </CardTitle>
              <CardDescription>Choose your perfect mood</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between p-3 rounded-lg border border-romantic-border hover:bg-romantic-pink/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-romantic-accent" />
                    <div>
                      <Label className="font-medium">Cute Theme</Label>
                      <p className="text-sm text-muted-foreground">Romantic pastels & sparkles</p>
                    </div>
                  </div>
                  <Switch
                    checked={theme === "cute"}
                    onCheckedChange={() => handleThemeChange("cute")}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border border-romantic-border hover:bg-romantic-pink/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    <div>
                      <Label className="font-medium">Light Theme</Label>
                      <p className="text-sm text-muted-foreground">Clean & bright</p>
                    </div>
                  </div>
                  <Switch
                    checked={theme === "light"}
                    onCheckedChange={() => handleThemeChange("light")}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border border-romantic-border hover:bg-romantic-pink/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <Moon className="h-5 w-5 text-slate-600" />
                    <div>
                      <Label className="font-medium">Dark Theme</Label>
                      <p className="text-sm text-muted-foreground">Easy on the eyes</p>
                    </div>
                  </div>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={() => handleThemeChange("dark")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-white/80 backdrop-blur-sm border-romantic-border shadow-romantic">
            <CardHeader>
              <CardTitle className="text-romantic-text">Notifications</CardTitle>
              <CardDescription>Stay connected with your love</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified when your partner sends messages</p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Data */}
          <Card className="bg-white/80 backdrop-blur-sm border-romantic-border shadow-romantic">
            <CardHeader>
              <CardTitle className="text-romantic-text">Privacy & Data</CardTitle>
              <CardDescription>Manage your chat history</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete All Chats
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete All Chats?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all your chat history. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteChats}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          <Separator className="my-6" />

          {/* Logout */}
          <Card className="bg-white/80 backdrop-blur-sm border-romantic-border shadow-romantic">
            <CardContent className="pt-6">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to logout? We'll miss you! 💔
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};