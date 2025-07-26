import { useState } from "react";
import { ArrowLeft, Plus, Heart, Download, Share } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FloatingHearts } from "@/components/FloatingHearts";

interface Photo {
  id: string;
  url: string;
  title: string;
  date: string;
  likes: number;
}

export const Gallery = () => {
  const navigate = useNavigate();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Sample photos (in a real app, these would come from an API)
  const photos: Photo[] = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop',
      title: 'Our first date',
      date: '2024-01-15',
      likes: 12
    },
    {
      id: '2', 
      url: 'https://images.unsplash.com/photo-1582562124811-0b9040d0a901?w=400&h=400&fit=crop',
      title: 'Cozy evening',
      date: '2024-02-14',
      likes: 8
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop', 
      title: 'Weekend vibes',
      date: '2024-03-01',
      likes: 15
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop',
      title: 'Starry night',
      date: '2024-03-10',
      likes: 20
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=400&fit=crop',
      title: 'Magical moment',
      date: '2024-03-20',
      likes: 18
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop',
      title: 'Flower power',
      date: '2024-04-05',
      likes: 25
    }
  ];

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
              <h1 className="font-pacifico text-2xl text-romantic">Our Gallery 📸</h1>
              <p className="text-muted-foreground">Beautiful memories together</p>
            </div>
          </div>
          <Button className="btn-romantic rounded-full">
            <Plus size={18} className="mr-2" />
            Add Photo
          </Button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="polaroid cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="aspect-square overflow-hidden rounded-lg mb-2">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">{photo.title}</p>
                <p className="text-xs text-muted-foreground">{new Date(photo.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="card-dreamy text-center">
          <h3 className="font-pacifico text-lg text-romantic mb-4">Gallery Stats</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold text-primary">{photos.length}</p>
              <p className="text-sm text-muted-foreground">Photos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">{photos.reduce((sum, photo) => sum + photo.likes, 0)}</p>
              <p className="text-sm text-muted-foreground">Hearts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-lavender">12</p>
              <p className="text-sm text-muted-foreground">Albums</p>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl p-6 max-w-lg w-full animate-scale-in">
            <div className="aspect-square overflow-hidden rounded-2xl mb-4">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center mb-4">
              <h3 className="font-semibold text-lg">{selectedPhoto.title}</h3>
              <p className="text-muted-foreground">{new Date(selectedPhoto.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <Heart className="text-primary" size={16} fill="currentColor" />
                <span className="text-sm">{selectedPhoto.likes}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 rounded-full">
                <Download size={16} className="mr-2" />
                Download
              </Button>
              <Button variant="outline" className="flex-1 rounded-full">
                <Share size={16} className="mr-2" />
                Share
              </Button>
              <Button
                onClick={() => setSelectedPhoto(null)}
                className="flex-1 btn-romantic rounded-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};