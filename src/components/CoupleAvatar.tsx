import { Heart, User } from "lucide-react";

interface CoupleAvatarProps {
  partner1Name?: string;
  partner2Name?: string;
  partner1Image?: string;
  partner2Image?: string;
  size?: "sm" | "md" | "lg";
  showNames?: boolean;
}

export const CoupleAvatar = ({ 
  partner1Name = "You", 
  partner2Name = "Me", 
  partner1Image, 
  partner2Image,
  size = "md",
  showNames = false 
}: CoupleAvatarProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16", 
    lg: "w-24 h-24"
  };

  const heartSize = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-romantic`}>
          {partner1Image ? (
            <img src={partner1Image} alt={partner1Name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <User className="text-white" size={heartSize[size]} />
          )}
        </div>
        {showNames && (
          <span className="text-sm font-medium text-foreground">{partner1Name}</span>
        )}
      </div>
      
      <div className="flex items-center justify-center">
        <Heart className="text-primary animate-heartbeat" size={heartSize[size]} fill="currentColor" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-secondary to-lavender flex items-center justify-center shadow-dreamy`}>
          {partner2Image ? (
            <img src={partner2Image} alt={partner2Name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <User className="text-white" size={heartSize[size]} />
          )}
        </div>
        {showNames && (
          <span className="text-sm font-medium text-foreground">{partner2Name}</span>
        )}
      </div>
    </div>
  );
};