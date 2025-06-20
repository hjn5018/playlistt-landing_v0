"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Music,
  Heart,
  Share2,
  MoreHorizontal,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Clock,
  Plus,
  Download,
  MessageSquare,
  Send,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"

export default function PlaylistDetailPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)
  const [liked, setLiked] = useState(false)
  const [commentText, setCommentText] = useState("")

  // Mock playlist data
  const playlist = {
    id: params.id,
    title: "Summer Vibes 2024",
    description: "The perfect playlist for sunny days and warm nights. Featuring the hottest tracks of the season.",
    creator: {
      name: "Alex Johnson",
      username: "alexjmusic",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    coverImage: "/placeholder.svg?height=400&width=400",
    color: "from-orange-400 to-pink-500",
    tracks: 24,
    followers: 1287,
    duration: "1h 42m",
    createdAt: "April 15, 2024",
  }

  // Mock tracks data
  const tracks = [
    {
      id: 1,
      title: "Summer Breeze",
      artist: "Coastal Waves",
      album: "Beach Days",
      duration: "3:24",
      plays: 24563,
    },
    {
      id: 2,
      title: "Sunset Drive",
      artist: "Night Cruisers",
      album: "Evening Rides",
      duration: "4:12",
      plays: 18921,
    },
    {
      id: 3,
      title: "Ocean Waves",
      artist: "Sea Sounds",
      album: "Relaxation",
      duration: "3:56",
      plays: 32145,
    },
    {
      id: 4,
      title: "Tropical Paradise",
      artist: "Island Vibes",
      album: "Vacation Mode",
      duration: "3:18",
      plays: 15678,
    },
    {
      id: 5,
      title: "Beachside",
      artist: "Sandy Toes",
      album: "Coastal Living",
      duration: "4:05",
      plays: 21432,
    },
    {
      id: 6,
      title: "Summer Nights",
      artist: "Moonlight Band",
      album: "After Dark",
      duration: "3:47",
      plays: 19876,
    },
    {
      id: 7,
      title: "Poolside Chill",
      artist: "Aqua Lounge",
      album: "Dive In",
      duration: "3:32",
      plays: 17654,
    },
    {
      id: 8,
      title: "Festival Season",
      artist: "Crowd Pleasers",
      album: "Live Events",
      duration: "4:23",
      plays: 28765,
    },
  ]

  // Mock comments data
  const comments = [
    {
      id: 1,
      user: {
        name: "Jamie Smith",
        username: "jamiemusic",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      text: "This playlist is perfect for my summer road trip! Thanks for curating such great tracks.",
      timestamp: "2 days ago",
      likes: 12,
    },
    {
      id: 2,
      user: {
        name: "Taylor Reed",
        username: "musiclover",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      text: "I've been listening to this on repeat. 'Sunset Drive' is my favorite track!",
      timestamp: "1 week ago",
      likes: 8,
    },
    {
      id: 3,
      user: {
        name: "Jordan Lee",
        username: "jlee",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      text: "Added this to my collection. Great vibes for summer parties!",
      timestamp: "2 weeks ago",
      likes: 5,
    },
  ]

  // Mock related playlists
  const relatedPlaylists = [
    {
      id: "beach-vibes",
      title: "Beach Vibes",
      creator: "wavesurfer",
      tracks: 18,
      color: "from-blue-400 to-cyan-500",
    },
    {
      id: "pool-party",
      title: "Pool Party Hits",
      creator: "partymaker",
      tracks: 22,
      color: "from-purple-400 to-pink-500",
    },
    {
      id: "summer-nights",
      title: "Summer Nights",
      creator: "nightowl",
      tracks: 15,
      color: "from-yellow-400 to-orange-500",
    },
  ]

  const togglePlay = (trackId?: number) => {
    if (trackId !== undefined) {
      setCurrentTrack(trackId)
      setIsPlaying(true)
    } else {
      setIsPlaying(!isPlaying)
    }
  }

  const handleAddComment = () => {
    if (commentText.trim()) {
      // In a real app, you would add the comment to the database
      alert("Comment added: " + commentText)
      setCommentText("")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Music className="h-6 w-6 text-purple-500" />
              <span className="text-xl font-bold">playlistt</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="/discover" className="text-sm font-medium hover:underline underline-offset-4">
              Discover
            </Link>
            <Link href="/mypage" className="text-sm font-medium hover:underline underline-offset-4">
              My Page
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              Sign up
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Playlist Header */}
        <div className={`bg-gradient-to-b ${playlist.color} to-background py-8 md:py-12`}>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] items-center">
              <div className="relative aspect-square w-full max-w-[300px] mx-auto md:mx-0 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={playlist.coverImage || "/placeholder.svg"}
                  alt={playlist.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{playlist.title}</h1>
                  <p className="text-white/80 mt-2">{playlist.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarImage src={playlist.creator.avatar || "/placeholder.svg"} alt={playlist.creator.name} />
                    <AvatarFallback>{playlist.creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Link href={`/user/${playlist.creator.username}`} className="text-white hover:underline">
                    {playlist.creator.username}
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <div>{playlist.tracks} tracks</div>
                  <div>{playlist.duration}</div>
                  <div>{playlist.followers} followers</div>
                  <div>Created {playlist.createdAt}</div>
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
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
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/20"
                    onClick={() => setLiked(!liked)}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${liked ? "fill-white" : ""}`} />
                    {liked ? "Liked" : "Like"}
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/20">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="border-white text-white hover:bg-white/20">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Plus className="mr-2 h-4 w-4" />
                        Add to playlist
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Report playlist</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Playlist Content */}
        <div className="container px-4 py-8 md:px-6">
          <Tabs defaultValue="tracks" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="tracks">Tracks</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="related">Related</TabsTrigger>
            </TabsList>

            {/* Tracks Tab */}
            <TabsContent value="tracks" className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto_auto] items-center gap-4 p-4 text-sm font-medium text-muted-foreground border-b">
                  <span className="w-8 text-center">#</span>
                  <span>Title</span>
                  <span className="hidden md:block">Album</span>
                  <span className="hidden md:flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                  </span>
                  <span></span>
                </div>
                <div>
                  {tracks.map((track, index) => (
                    <div
                      key={track.id}
                      className={`grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto_auto] items-center gap-4 p-3 hover:bg-muted/50 ${
                        currentTrack === track.id ? "bg-muted" : ""
                      }`}
                    >
                      <span className="w-8 text-center text-muted-foreground">{index + 1}</span>
                      <div className="min-w-0 flex flex-col">
                        <span className="font-medium truncate">{track.title}</span>
                        <span className="text-sm text-muted-foreground truncate">{track.artist}</span>
                      </div>
                      <span className="hidden md:block text-sm text-muted-foreground truncate">{track.album}</span>
                      <span className="hidden md:block text-sm text-muted-foreground">{track.duration}</span>
                      <div>
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
            </TabsContent>

            {/* Comments Tab */}
            <TabsContent value="comments" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Comments ({comments.length})</h3>
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                    <AvatarFallback>YA</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="resize-none"
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleAddComment}>
                        <Send className="mr-2 h-4 w-4" />
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.user.name}</span>
                        <span className="text-sm text-muted-foreground">@{comment.user.username}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p>{comment.text}</p>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Heart className="mr-1 h-4 w-4" />
                          {comment.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <MessageSquare className="mr-1 h-4 w-4" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Related Tab */}
            <TabsContent value="related" className="space-y-6">
              <h3 className="text-lg font-medium">Related Playlists</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPlaylists.map((relatedPlaylist) => (
                  <Link
                    key={relatedPlaylist.id}
                    href={`/playlist/${relatedPlaylist.id}`}
                    className="group relative overflow-hidden rounded-xl border shadow-sm hover:shadow-md transition-all"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${relatedPlaylist.color} opacity-90`}></div>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative p-6 flex flex-col h-full justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{relatedPlaylist.title}</h3>
                        <p className="text-sm text-gray-200">by @{relatedPlaylist.creator}</p>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-white">{relatedPlaylist.tracks} tracks</div>
                        <Button className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-colors">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Music Player */}
      {currentTrack !== null && (
        <div className="sticky bottom-0 border-t bg-background p-4 shadow-lg">
          <div className="container mx-auto">
            <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 items-center">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                  <Music className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium truncate">{tracks[currentTrack - 1]?.title || "Unknown Track"}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {tracks[currentTrack - 1]?.artist || "Unknown Artist"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={() => togglePlay()}>
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
                <div className="w-full flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">1:24</span>
                  <Slider defaultValue={[33]} max={100} step={1} className="w-full" />
                  <span className="text-xs text-muted-foreground">{tracks[currentTrack - 1]?.duration || "0:00"}</span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Volume2 className="h-5 w-5 text-muted-foreground" />
                <Slider defaultValue={[70]} max={100} step={1} className="w-24" />
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-purple-500" />
            <p className="text-sm text-muted-foreground">© 2024 Playlistt. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
