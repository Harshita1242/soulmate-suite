import { useState } from "react";
import { ArrowLeft, Plus, Heart, Calendar, Camera, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Memory {
  id: string;
  title: string;
  content: string;
  date: string;
  color: 'pink' | 'blue' | 'lavender' | 'peach';
  type: 'text' | 'photo' | 'voice';
  author: 'You' | 'Alex';
}

export const Memories = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const memories: Memory[] = [
    {
      id: '1',
      title: 'Our first "I love you"',
      content: 'Under the stars at the park, you whispered those three magical words. My heart still skips a beat thinking about that moment. 💫',
      date: '2024-02-14',
      color: 'pink',
      type: 'text',
      author: 'You'
    },
    {
      id: '2',
      title: 'Rainy day cuddles',
      content: 'When it rained and we were stuck inside, we made the best hot chocolate and watched movies all day. Perfect lazy Sunday! ☔',
      date: '2024-03-05',
      color: 'blue',
      type: 'text',
      author: 'Alex'
    },
    {
      id: '3',
      title: 'Sunset at the beach',
      content: 'The way the light danced in your eyes as we watched the sunset together. I knew in that moment you were my forever. 🌅',
      date: '2024-03-20',
      color: 'lavender',
      type: 'photo',
      author: 'You'
    },
    {
      id: '4',
      title: 'Your silly song',
      content: 'That random song you made up while cooking - I recorded it and it always makes me smile! 🎵',
      date: '2024-04-02',
      color: 'peach',
      type: 'voice',
      author: 'Alex'
    },
    {
      id: '5',
      title: 'Surprise picnic',
      content: 'You surprised me with a picnic in our favorite spot. The sandwiches were terrible but the company was perfect! 🧺',
      date: '2024-04-15',
      color: 'pink',
      type: 'text',
      author: 'You'
    }
  ];

  const getColorClasses = (color: Memory['color']) => {
    const colorMap = {
      pink: 'memory-note-pink',
      blue: 'memory-note-blue', 
      lavender: 'memory-note-lavender',
      peach: 'memory-note-peach'
    };
    return colorMap[color];
  };

  const getTypeIcon = (type: Memory['type']) => {
    const iconMap = {
      text: Heart,
      photo: Camera,
      voice: Mic
    };
    return iconMap[type];
  };

  const handleAddMemory = () => {
    if (newTitle.trim() && newContent.trim()) {
      // In a real app, this would save to backend
      setNewTitle("");
      setNewContent("");
      setShowAddForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-soft-gradient relative">
      <FloatingHearts />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="rounded-full"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="font-pacifico text-2xl text-romantic">Memory Wall 💖</h1>
              <p className="text-muted-foreground">Our beautiful journey together</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="btn-romantic rounded-full"
          >
            <Plus size={18} className="mr-2" />
            Add Memory
          </Button>
        </div>

        {/* Add Memory Form */}
        {showAddForm && (
          <div className="card-dreamy mb-8 animate-scale-in">
            <h3 className="font-pacifico text-lg text-romantic mb-4">Create New Memory</h3>
            <div className="space-y-4">
              <Input
                placeholder="Memory title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="rounded-full"
              />
              <Textarea
                placeholder="Share your beautiful memory..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="rounded-2xl resize-none"
                rows={4}
              />
              <div className="flex gap-3">
                <Button onClick={handleAddMemory} className="btn-romantic rounded-full flex-1">
                  <Heart size={16} className="mr-2" />
                  Save Memory
                </Button>
                <Button 
                  onClick={() => setShowAddForm(false)}
                  variant="outline" 
                  className="rounded-full flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Memories Timeline */}
        <div className="space-y-6">
          {memories.map((memory, index) => {
            const Icon = getTypeIcon(memory.type);
            return (
              <div key={memory.id} className="flex gap-4 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Timeline indicator */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-romantic">
                    <Icon size={16} className="text-white" />
                  </div>
                  {index < memories.length - 1 && (
                    <div className="w-0.5 h-16 bg-gradient-to-b from-primary to-secondary mt-2 opacity-30"></div>
                  )}
                </div>

                {/* Memory content */}
                <div className={`flex-1 memory-note ${getColorClasses(memory.color)}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{memory.title}</h3>
                    <span className="text-xs text-muted-foreground font-medium bg-background px-2 py-1 rounded-full">
                      {memory.author}
                    </span>
                  </div>
                  <p className="text-foreground mb-3 leading-relaxed">{memory.content}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    <span>{new Date(memory.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="card-romantic mt-8 text-center">
          <h3 className="font-pacifico text-lg text-romantic mb-4">Memory Stats</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold text-primary">{memories.length}</p>
              <p className="text-sm text-muted-foreground">Memories</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">
                {Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24))}
              </p>
              <p className="text-sm text-muted-foreground">Days Together</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-lavender">∞</p>
              <p className="text-sm text-muted-foreground">Love</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};