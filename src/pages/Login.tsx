import { useState } from "react";
import { Heart, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FloatingHearts } from "@/components/FloatingHearts";
import { CoupleAvatar } from "@/components/CoupleAvatar";
import { toast } from "sonner";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      toast.success("Welcome back, lovebirds! 💕");
      navigate("/dashboard");
    } else {
      toast.error("Please fill in all fields, sweetie!");
    }
  };
  return <div className="min-h-screen bg-soft-gradient relative overflow-hidden">
      <FloatingHearts />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="mb-6">
              <CoupleAvatar size="lg" showNames={false} />
            </div>
            <h1 className="font-pacifico text-4xl text-romantic mb-2">MeMento</h1>
            <p className="text-lg text-muted-foreground font-medium">
          </p>
          </div>

          {/* Login Form */}
          <div className="card-dreamy animate-scale-in">
            <div className="mb-6">
              <div className="flex bg-muted rounded-full p-1 mb-6">
                <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${isLogin ? 'btn-romantic' : 'text-muted-foreground hover:text-foreground'}`}>
                  Sign In
                </button>
                <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${!isLogin ? 'btn-romantic' : 'text-muted-foreground hover:text-foreground'}`}>
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="pl-10 rounded-full border-border focus:ring-primary" />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10 rounded-full border-border focus:ring-primary" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <Button type="submit" className="w-full btn-romantic mt-6">
                  <Heart className="mr-2" size={18} fill="currentColor" />
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Forgot password?
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Made with 💕 for couples in love
            </p>
          </div>
        </div>
      </div>
    </div>;
};