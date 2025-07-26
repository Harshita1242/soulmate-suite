import { Heart } from "lucide-react";

export const FloatingHearts = () => {
  return (
    <div className="floating-hearts">
      <Heart className="heart text-primary animate-bounce-gentle" size={20} style={{ left: '10%' }} />
      <Heart className="heart text-secondary animate-bounce-gentle" size={16} style={{ left: '30%' }} />
      <Heart className="heart text-lavender animate-bounce-gentle" size={18} style={{ left: '50%' }} />
      <Heart className="heart text-primary animate-bounce-gentle" size={14} style={{ left: '70%' }} />
      <Heart className="heart text-peach animate-bounce-gentle" size={22} style={{ left: '90%' }} />
    </div>
  );
};