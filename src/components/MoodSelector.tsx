import { useState } from "react";
import { Heart, Sun, Cloud, Star, Moon, Coffee } from "lucide-react";

const moods = [
  { icon: Heart, label: "Loved", color: "text-primary", bgColor: "bg-primary/10" },
  { icon: Sun, label: "Happy", color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  { icon: Star, label: "Excited", color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { icon: Cloud, label: "Dreamy", color: "text-baby-blue", bgColor: "bg-baby-blue/10" },
  { icon: Moon, label: "Sleepy", color: "text-indigo-500", bgColor: "bg-indigo-500/10" },
  { icon: Coffee, label: "Energetic", color: "text-orange-500", bgColor: "bg-orange-500/10" },
];

export const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <div className="card-romantic">
      <h3 className="font-pacifico text-lg text-romantic mb-4">How are you feeling, cutie? 💕</h3>
      <div className="grid grid-cols-3 gap-3">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.label;
          
          return (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(mood.label)}
              className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
                isSelected 
                  ? `${mood.bgColor} ${mood.color} shadow-lg scale-105` 
                  : 'bg-muted hover:bg-accent'
              }`}
            >
              <Icon className={`mx-auto mb-1 ${mood.color}`} size={24} />
              <p className="text-xs font-medium">{mood.label}</p>
            </button>
          );
        })}
      </div>
      {selectedMood && (
        <p className="mt-4 text-center text-sm text-muted-foreground animate-fade-in">
          You're feeling {selectedMood.toLowerCase()} today! 💖
        </p>
      )}
    </div>
  );
};