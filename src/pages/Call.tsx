import { useState, useEffect } from "react";
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Heart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FloatingHearts } from "@/components/FloatingHearts";

export const Call = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCall = () => {
    setIsConnected(true);
    setCallDuration(0);
  };

  const handleEndCall = () => {
    setIsConnected(false);
    setCallDuration(0);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-soft-gradient relative flex flex-col">
      <FloatingHearts />
      
      <div className="container mx-auto px-4 py-8 relative z-10 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-full"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="font-pacifico text-2xl text-romantic">Video Call 💕</h1>
          <div></div>
        </div>

        {!isConnected ? (
          /* Pre-call Screen */
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="card-dreamy mb-8 max-w-md">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary to-lavender flex items-center justify-center animate-heartbeat">
                <Heart className="text-white" size={48} fill="currentColor" />
              </div>
              <h2 className="font-pacifico text-xl text-romantic mb-2">Call Your Love</h2>
              <p className="text-muted-foreground mb-6">Ready to see that beautiful smile?</p>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleCall}
                  className="w-full btn-romantic py-4 text-lg"
                >
                  <Phone className="mr-3 animate-bounce-gentle" size={20} />
                  Start Video Call
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full rounded-full py-4"
                >
                  <Phone className="mr-3" size={20} />
                  Voice Call Only
                </Button>
              </div>
            </div>

            <div className="card-romantic max-w-md">
              <h3 className="font-pacifico text-lg text-romantic mb-4">Call Stats</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">47</p>
                  <p className="text-sm text-muted-foreground">Total Calls</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">12h 34m</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Active Call Screen */
          <div className="flex-1 flex flex-col">
            {/* Call Info */}
            <div className="text-center mb-6">
              <h2 className="font-pacifico text-xl text-romantic mb-2">Alex</h2>
              <p className="text-muted-foreground">{formatDuration(callDuration)}</p>
            </div>

            {/* Video Area */}
            <div className="flex-1 relative mb-8">
              {/* Main video (partner) */}
              <div className="w-full h-64 md:h-96 bg-gradient-to-br from-secondary to-lavender rounded-3xl overflow-hidden shadow-dreamy relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Heart className="mx-auto mb-4 animate-heartbeat" size={48} fill="currentColor" />
                    <p className="text-lg font-medium">Connected with love 💕</p>
                  </div>
                </div>
              </div>

              {/* Picture-in-picture (self) */}
              <div className="absolute top-4 right-4 w-24 h-32 bg-gradient-to-br from-primary to-secondary rounded-2xl overflow-hidden shadow-romantic">
                <div className="w-full h-full flex items-center justify-center">
                  <Heart className="text-white" size={20} fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Call Controls */}
            <div className="card-romantic">
              <div className="flex items-center justify-center gap-6">
                <Button
                  variant={isMuted ? "destructive" : "outline"}
                  size="icon"
                  className="w-12 h-12 rounded-full"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                </Button>

                <Button
                  variant={isVideoOn ? "outline" : "destructive"}
                  size="icon"
                  className="w-12 h-12 rounded-full"
                  onClick={() => setIsVideoOn(!isVideoOn)}
                >
                  {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
                </Button>

                <Button
                  variant="destructive"
                  size="icon"
                  className="w-16 h-16 rounded-full"
                  onClick={handleEndCall}
                >
                  <PhoneOff size={24} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};