"use client"

import { useState } from "react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play, Pause, Music, Clock } from "lucide-react"

interface Track {
  id: number
  title: string
  artist: string
  duration: string
}

interface PlaylistModalProps {
  isOpen: boolean
  onClose: () => void
  playlist: {
    id: string
    title: string
    creator: string
    tracks: number
    color: string
  } | null
}

export function PlaylistModal({ isOpen, onClose, playlist }: PlaylistModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)

  // Mock tracks data - in a real app, you would fetch this based on the playlist ID
  const tracks: Track[] = [
    { id: 1, title: "Summer Breeze", artist: "Coastal Waves", duration: "3:24" },
    { id: 2, title: "Sunset Drive", artist: "Night Cruisers", duration: "4:12" },
    { id: 3, title: "Ocean Waves", artist: "Sea Sounds", duration: "3:56" },
    { id: 4, title: "Tropical Paradise", artist: "Island Vibes", duration: "3:18" },
    { id: 5, title: "Beachside", artist: "Sandy Toes", duration: "4:05" },
    { id: 6, title: "Summer Nights", artist: "Moonlight Band", duration: "3:47" },
  ]

  const togglePlay = (trackId?: number) => {
    if (trackId !== undefined) {
      setCurrentTrack(trackId)
      setIsPlaying(true)
    } else {
      setIsPlaying(!isPlaying)
    }
  }

  if (!playlist) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] md:max-w-[600px] p-0 overflow-hidden">
        <div className={`bg-gradient-to-b ${playlist.color} to-background p-6`}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">{playlist.title}</DialogTitle>
            <p className="text-white/80">
              by{" "}
              <Link
                href={`/user/${playlist.creator}`}
                className="hover:underline font-medium"
                onClick={() => onClose()} // Close modal when navigating
              >
                @{playlist.creator}
              </Link>
            </p>
          </DialogHeader>
          <div className="flex items-center gap-4 mt-4">
            <Button className="bg-white text-purple-600 hover:bg-white/90" onClick={() => togglePlay()}>
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-4 w-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" /> Play All
                </>
              )}
            </Button>
            <span className="text-white/80 text-sm">{playlist.tracks} tracks</span>
          </div>
        </div>

        <div className="p-4 max-h-[400px] overflow-y-auto">
          <div className="rounded-md">
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-2 text-sm font-medium text-muted-foreground border-b">
              <span className="w-8 text-center">#</span>
              <span>Title</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
              </span>
            </div>
            <div>
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 p-3 hover:bg-muted/50 ${
                    currentTrack === track.id ? "bg-muted" : ""
                  }`}
                >
                  <span className="w-8 text-center text-muted-foreground">{index + 1}</span>
                  <div className="min-w-0 flex flex-col">
                    <span className="font-medium truncate">{track.title}</span>
                    <span className="text-sm text-muted-foreground truncate">{track.artist}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{track.duration}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => togglePlay(track.id)}>
                      {isPlaying && currentTrack === track.id ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {currentTrack !== null && (
          <div className="border-t bg-muted p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded bg-purple-100 flex items-center justify-center">
                <Music className="h-6 w-6 text-purple-600" />
              </div>
              <div className="min-w-0">
                <div className="font-medium truncate">{tracks[currentTrack - 1]?.title || "Unknown Track"}</div>
                <div className="text-sm text-muted-foreground truncate">
                  {tracks[currentTrack - 1]?.artist || "Unknown Artist"}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full ml-auto"
                onClick={() => togglePlay()}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
